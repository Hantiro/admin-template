;(function () {
    angular
        .module('app')
        .controller('ProfileCtrl', ProfileCtrl);

    /* @ngInject */
    function ProfileCtrl(authSvc, userSvc, messagesSvc, utilsSvc, googleSvc, profileData) {
        var vm = this;
        vm.save = save;
        vm.search = googleSvc.searchAddress;
        vm.updatePassword = updatePassword;
        vm.data = profileData;
        vm.searchText = vm.data.address;
        vm.emailRegExp = utilsSvc.EMAIL_REG;
        init();

        function init() {

        }

        function save() {
            if (vm.profileForm.$invalid) {
                messagesSvc.show('ERROR.FILL_FIELDS', 'error');
                return;
            }
            if (vm.selected_search_item) {
                vm.data.address = vm.selected_search_item.description;
            }
            userSvc.update(vm.data)
                .then(function (res) {
                    if (res.status) {
                        messagesSvc.show('SUCCESS.UPDATED', 'success')
                    }
                });
        }

        function updatePassword() {
            if (vm.changePasswordForm.$invalid) {
                messagesSvc.show('ERROR.PASS', 'error');
                return;
            }
            if (vm.data.password !== vm.repeat_password) {
                messagesSvc.show('ERROR.PASS_EQUAL', 'error');
                return;
            }
            userSvc.updatePassword(vm.data)
                .then(function (res) {
                    if (res.status) {
                        vm.repeat_password = '';
                        vm.data.password = '';
                        messagesSvc.show('SUCCESS.PASS_CHANGED', 'success');
                        vm.showNewPassword = false;
                    }
                });
        }
    }
})();