;(function () {
    angular
        .module('app')
        .controller('WelcomeCtrl', WelcomeCtrl);

    /* @ngInject */
    function WelcomeCtrl($uibModalInstance, authDataSvc, messagesSvc) {
        var vm = this;
        vm.buy = buy;
        vm.user = authDataSvc.getUser();

        function buy() {
            // $uibModalInstance.close(vm.model);
        }

        vm.test = function (res) {
            $uibModalInstance.close('test_date');
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss(false);
        };
    }
})();