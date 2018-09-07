;(function () {
    angular
        .module('app')
        .controller('PurchaseCreateCtrl', PurchaseCreateCtrl);

    /* @ngInject */
    function PurchaseCreateCtrl($uibModalInstance,config,toastr,messagesSvc) {
        var vm = this;
        vm.config = config;
        vm.model = {
            productId: '',
            period: '',
            price: ''
        };

        function validation() {
            if(vm.model.productId === '' || vm.model.period === ''){
                toastr.error(messagesSvc.error.emptyField)
            } else if(vm.model.period === 0){
                toastr.error(messagesSvc.error.invalidPeriod)
            }else{
                return true;
            }
        }

        vm.ok = function(){
            if(validation()){
                $uibModalInstance.close(vm.model);
            }
        };
        vm.cancel = function(){
            $uibModalInstance.dismiss(false);
        };
    }
})();