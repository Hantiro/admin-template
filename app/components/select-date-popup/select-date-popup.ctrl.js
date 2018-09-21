;(function () {
    angular
        .module('app')
        .controller('SelectDatePopupCtrl', SelectDatePopupCtrl);

    /* @ngInject */
    function SelectDatePopupCtrl($uibModalInstance,messagesSvc) {
        var vm = this;

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