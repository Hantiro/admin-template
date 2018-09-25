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
            forgotPass: forgotPass,
            confirm: confirm,
            logout: logout,
            getDate: getDate
        };
        return service;

        function setPhone() {
            return $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/set-phone/set-phone.html',
                controller: 'SetPhoneCtrl',
                controllerAs: 'vm',
                backdropClass: 'custom-backdrop',
                windowTopClass: 'set-phone-modal',
                size: 'md',
                resolve: {}
            });
        }

        /**
         *
         * @param config
         * @param config.title
         * @param config.content
         * @param config.ok
         * @param config.cancel
         * @returns { $uibModal }
         */
        function confirm(config) {
            return $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/confirm/confirm.html',
                controller: 'ConfirmModalCtrl',
                controllerAs: 'vm',
                backdropClass: 'custom-backdrop',
                windowTopClass: 'confirm',
                size: config.size || 'md',
                resolve: {
                    config: config || {}
                }
            });
        }

        function logout() {
            return confirm({
                title: 'CONTENT.LOGOUT',
                content: 'CONTENT.ASK_LOGOUT',
                ok: 'CONTENT.OK',
                cancel: 'CONTENT.CANCEL',
                size: 'sm'
            });
        }

        function getDate() {
            return $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/select-date-popup/select-date-popup.html',
                controller: 'SelectDatePopupCtrl',
                controllerAs: 'vm',
                backdropClass: 'custom-backdrop',
                windowTopClass: 'select-date-popup',
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
                backdropClass: 'custom-backdrop',
                windowTopClass: 'set-code-modal',
                size: 'md',
                resolve: {}
            });
        }

        function welcome(resolve) {
            return $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/welcome/welcome.html',
                controller: 'WelcomeCtrl',
                controllerAs: 'vm',
                backdropClass: 'custom-backdrop',
                windowTopClass: 'welcome-modal',
                size: 'sm',
                resolve: resolve || {}
            });
        }

        function signup() {
            return $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/signup/signup.html',
                controller: 'SignupCtrl',
                backdrop: 'static',
                controllerAs: 'vm',
                backdropClass: 'custom-backdrop',
                windowTopClass: 'signup-modal',
                size: 'lg',
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
                backdropClass: 'custom-backdrop',
                windowTopClass: 'new-pass-modal',
                size: 'sm',
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
                backdropClass: 'custom-backdrop',
                windowTopClass: 'login-modal',
                size: 'sm',
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
                backdropClass: 'custom-backdrop',
                windowTopClass: 'forgot-pass-modal',
                size: 'sm',
                resolve: {}
            });
        }

    }
})();
