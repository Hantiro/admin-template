;(function () {
    'use strict';

    angular
        .module('app')
        .controller('ReligSettingCtrl', ReligSettingCtrl);

    /* @ngInject */
    function ReligSettingCtrl($scope, googleSvc, utilsSvc, userSvc) {
        var vm = this;
        vm.save = save;
        vm.search = googleSvc.searchAddress;
        vm.updatePassword = updatePassword;
        vm.data = {};
        vm.searchText = '';
        vm.emailRegExp = utilsSvc.EMAIL_REG;

        init();
        function init() {
            getUserData();
        }

        function getUserData() {
            userSvc.view()
                .then(function (res) {
                    vm.data = res.entity;
                    vm.searchText = vm.data.address;
                });
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
