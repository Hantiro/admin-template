;(function () {
    angular
        .module('app')
        .controller('ConfirmModalCtrl', ConfirmModalCtrl);

    /* @ngInject */
    function ConfirmModalCtrl($uibModalInstance, config) {
        var vm = this;
        vm.config = config;

        vm.ok = function () {
            $uibModalInstance.close(true);
        };
        vm.cancel = function () {
            $uibModalInstance.dismiss(false);
        };
    }
})();