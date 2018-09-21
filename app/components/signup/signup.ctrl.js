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

        function signUp() {
            if (vm.signUpForm.$invalid) {
                messagesSvc.show('ERROR.VERIFY_DATA', 'error');
                return;
            }
            if (vm.tmp_address) {
                vm.data.address = vm.tmp_address.description;
            }
            vm.data.code = vm.tmp_credentials.code;
            vm.data.phone = vm.tmp_credentials.phone;
            authSvc.signUp(vm.data)
                .then(function (res) {
                    $uibModalInstance.close(res);
                });
        }

        vm.cancel = function () {
            $uibModalInstance.dismiss(false);
        }
    }
})();