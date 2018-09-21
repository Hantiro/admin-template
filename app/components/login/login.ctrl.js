;(function () {
    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    /* @ngInject */
    function LoginCtrl($uibModalInstance, messagesSvc, authSvc, authDataSvc) {
        var vm = this;
        vm.login = login;
        vm.resetPassword = resetPassword;
        vm.cancel = cancel;
        vm.remember_me = false;

        function login() {
            if (vm.loginForm.$invalid) {
                messagesSvc.show('ERROR.FILL_FIELDS', 'error');
                return;
            }
            authSvc.login(vm.data)
                .then(function (res) {
                    if (res.data && res.data.token && res.data.user) {
                        authDataSvc.setToken(res.data.token, vm.remember_me);
                        authDataSvc.setUser(res.data.user);
                        $uibModalInstance.close(res);
                    }
                });
        }

        function resetPassword() {
            $uibModalInstance.close('reset-pass');
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();