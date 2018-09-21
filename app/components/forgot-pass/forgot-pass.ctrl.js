;(function () {
    angular
        .module('app')
        .controller('ForgotPassCtrl', ForgotPassCtrl);

    /* @ngInject */
    function ForgotPassCtrl($uibModalInstance, messagesSvc, authSvc) {
        var vm = this;
        vm.email;

        vm.continueBtn = function () {
            if (vm.email) {
                authSvc.resetPassword({email: vm.email})
                    .then(function (res) {
                        messagesSvc.show('INFO.CHECK_EMAIL', 'info');
                        $uibModalInstance.close(res);
                    });
            } else {
                messagesSvc.show('ERROR.EMAIL', 'error');
            }
        };


        vm.cancel = function () {
            $uibModalInstance.dismiss(false);
        };
    }
})();