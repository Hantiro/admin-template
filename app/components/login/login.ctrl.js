;(function () {
    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    /* @ngInject */
    function LoginCtrl($uibModalInstance,config,messagesSvc) {
        var vm = this;
        vm.config = config;

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