;(function () {
    angular
        .module('app')
        .controller('PaymentCtrl', PaymentCtrl);

    /* @ngInject */
    function PaymentCtrl($uibModalInstance, authDataSvc, messagesSvc) {
        var vm = this;
        vm.user = authDataSvc.getUser();

        vm.cancel = function () {
            $uibModalInstance.dismiss(false);
        };
    }
})();