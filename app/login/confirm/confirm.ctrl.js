;(function () {
    angular
        .module('app')
        .controller('ConfirmCtrl', ConfirmCtrl);

    /* @ngInject */
    function ConfirmCtrl($uibModalInstance,config) {
        var vm = this;
        vm.config = config;

        vm.ok = function(){
            $uibModalInstance.close(true);
        };
        vm.cancel = function(){
            $uibModalInstance.dismiss(false);
        };
    }
})();