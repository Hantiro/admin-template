;(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProfileDataCtrl', ProfileDataCtrl);

    /* @ngInject */
    function ProfileDataCtrl($scope, googleSvc, utilsSvc, userSvc, messagesSvc) {
        var vm = this;
        vm.save = save;
        vm.search = googleSvc.searchAddress;
        vm.updatePassword = updatePassword;
        vm.data = {};
        vm.resetPass = {};
        vm.searchText = '';
        vm.emailRegExp = utilsSvc.EMAIL_REG;

        init();
        function init() {
            $scope.pdOptions = {};
            $scope.pdOptions.save = save; //link to save for call outside from controller
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
            if (vm.resetPass.password !== vm.resetPass.password_confirmation) {
                messagesSvc.show('ERROR.PASS_EQUAL', 'error');
                return;
            }
            userSvc.updatePassword(vm.resetPass)
                .then(function (res) {
                    if (res.status) {
                        vm.resetPass.password_confirmation = '';
                        vm.resetPass.password = '';
                        messagesSvc.show('SUCCESS.PASS_CHANGES', 'success');
                        vm.showNewPassword = false;
                    }
                });
        }
    }
})();
