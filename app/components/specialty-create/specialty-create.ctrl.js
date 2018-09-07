;(function () {
    angular
        .module('app')
        .controller('SpecCreateCtrl', SpecCreateCtrl);

    /* @ngInject */
    function SpecCreateCtrl($uibModalInstance,config,toastr,messagesSvc) {
        var vm = this;
        vm.config = config;
        vm.model = {
            name: ''
        };

        function validation() {
            if(vm.model.name === ''){
                toastr.error(messagesSvc.error.emptyField)
            } else{
                return true
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