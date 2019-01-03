;(function () {
    angular
        .module('app')
        .controller('PaymentCtrl', PaymentCtrl);

    /* @ngInject */
    function PaymentCtrl($uibModalInstance, authDataSvc, messagesSvc, data) {
        var vm = this;
        vm.user = authDataSvc.getUser();
        vm.data = data || {};

        vm.cancel = function () {
            $uibModalInstance.dismiss(false);
        };
    }
})();