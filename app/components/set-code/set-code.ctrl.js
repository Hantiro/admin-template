;(function () {
    angular
        .module('app')
        .controller('SetCodeCtrl', SetCodeCtrl);

    /* @ngInject */
    function SetCodeCtrl($uibModalInstance, messagesSvc, authSvc, authDataSvc) {
        var vm = this;
        vm.changePhone = changePhone;
        vm.recentCode = recentCode;
        vm.next = next;
        vm.phone = authDataSvc.getPhone();

        function changePhone() {
            $uibModalInstance.close('change-phone');
        }

        function next() {
            if (vm.addCodeForm.$invalid) {
                messagesSvc.show('ERROR.VERIFY_DATA', 'error');
                return;
            }
            authSvc.sendCode({
                phone: vm.phone,
                code: vm.code
            }).then(function (res) {
                if (res.success) {
                    authDataSvc.setCode(vm.code);
                    authDataSvc.setCred(res.data);
                    $uibModalInstance.close(res);
                } else if (!res.success && res.message) {
                    messagesSvc.toastr.error(res.message);
                }
            });
        }

        function recentCode() {
            authSvc.sendPhone(
                {
                    phone: vm.phone
                }
            ).then(function (res) {
                if (!res.status) {
                    messagesSvc.toastr.warn(res.message);
                } else if (res.status) {
                    messagesSvc.toastr.info(res.message);
                }
            });
        }

        vm.cancel = function () {
            $uibModalInstance.dismiss(false);
        };
    }
})();