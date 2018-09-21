;(function () {
    angular
        .module('app')
        .controller('ForgotPassCtrl', ForgotPassCtrl);

    /* @ngInject */
    function ForgotPassCtrl($uibModalInstance,messagesSvc) {
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