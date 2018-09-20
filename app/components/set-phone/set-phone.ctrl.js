;(function () {
    angular
        .module('app')
        .controller('SetPhoneCtrl', SetPhoneCtrl);

    /* @ngInject */
    function SetPhoneCtrl($uibModalInstance,config,messagesSvc) {
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