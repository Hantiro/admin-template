;(function () {
    'use strict';

    angular.module('service.modalSvc', []).service('modalSvc', modalSvc);

    /* @ngInject */
    function modalSvc($uibModal) {
        var service = {
            setPhone: setPhone,
            setCode: setCode,
            signup: signup,
            welcome: welcome,
            newPass: newPass,
            login: login,
            forgotPass: forgotPass
        };
        return service;

        function setPhone() {
            return $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/set-phone/set-phone.html',
                controller: 'SetPhoneCtrl',
                controllerAs: 'vm',
                windowTopClass: 'set-phone-modal',
                size: 'md',
                resolve: {}
            });
        }

        function setCode() {
            return $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/set-code/set-code.html',
                controller: 'SetCodeCtrl',
                controllerAs: 'vm',
                windowTopClass: 'set-code-modal',
                size: 'md',
                resolve: {}
            });
        }

        function welcome() {
            return $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/welcome/welcome.html',
                controller: 'WelcomeCtrl',
                controllerAs: 'vm',
                windowTopClass: 'welcome-modal',
                size: 'md',
                resolve: {}
            });
        }

        function signup() {
            return $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/signup/signup.html',
                controller: 'SignupCtrl',
                controllerAs: 'vm',
                windowTopClass: 'signup-modal',
                size: 'md',
                resolve: {}
            });
        }

        function newPass() {
            return $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/new-pass/new-pass.html',
                controller: 'SignupCtrl',
                controllerAs: 'vm',
                windowTopClass: 'new-pass-modal',
                size: 'md',
                resolve: {}
            });
        }

        function login() {
            return $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/login/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm',
                windowTopClass: 'login-modal',
                size: 'md',
                resolve: {}
            });
        }

        function forgotPass() {
            return $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/forgot-pass/forgot-pass.html',
                controller: 'ForgotPassCtrl',
                controllerAs: 'vm',
                windowTopClass: 'forgot-pass-modal',
                size: 'md',
                resolve: {}
            });
        }

    }
})();
