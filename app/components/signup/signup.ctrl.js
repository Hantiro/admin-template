;(function () {
    angular
        .module('app')
        .controller('SignupCtrl', SignupCtrl);

    /* @ngInject */
    function SignupCtrl($uibModalInstance, messagesSvc, googleSvc, authSvc, authDataSvc) {
        var vm = this;
        vm.search = googleSvc.searchAddress;
        vm.tmp_credentials = authDataSvc.getCred();
        vm.signUp = signUp;
        vm.data = {};
        vm.rsOptions = {};

        function signUp() {
            if (vm.signUpForm.$invalid) {
                messagesSvc.show('ERROR.VERIFY_DATA', 'error');
                return;
            }
            if (vm.tmp_address) {
                vm.data.address = vm.tmp_address.description;
            } else {
                vm.data.address = 'Temp address';
            }
            // vm.data.code = vm.tmp_credentials.code;
            // vm.data.phone = vm.tmp_credentials.phone;
            authSvc.signUp(vm.data)
                .then(function (res) {
                    if (res.success) {
                        authDataSvc.setUser(res.data.user);
                        authDataSvc.setToken(res.data.token);
                        $uibModalInstance.close(res);
                    } else if (res.message) {
                        messagesSvc.toastr.error(res.message);
                    }
                });
        }

        vm.cancel = function () {
            $uibModalInstance.dismiss(false);
        }
    }
})();