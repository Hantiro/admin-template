;(function () {
    angular
        .module('app')
        .controller('SetPhoneCtrl', SetPhoneCtrl);

    /* @ngInject */
    function SetPhoneCtrl($uibModalInstance, messagesSvc, authSvc, authDataSvc) {
        var vm = this;
        vm.addPhone = addPhone;

        function addPhone() {
            if (vm.addPhoneForm.$invalid) {
                messagesSvc.show('ERROR.VERIFY_DATA', 'error');
                return;
            }
            authDataSvc.setPhone(vm.phone);
            authSvc.sendPhone({phone: vm.phone})
                .then(function (res) {
                    if (res.status) {
                        messagesSvc.toastr.info(res.message);
                        $uibModalInstance.close(res);
                    } else {
                        messagesSvc.toastr.warning(res.message);
                    }
                });
        }

        vm.cancel = function(){
            $uibModalInstance.dismiss(false);
        };
    }
})();