;(function () {
    'use strict';

    angular.module('service.authExtSvc', []).service('authExtSvc', authExtSvc);

    /* @ngInject */
    function authExtSvc($rootScope, modalSvc, authSvc, authDataSvc) {
        var model = {
            signUpProcess: signUpProcess,
            loginProcess: loginProcess,
            checkLogin: checkLogin,
            logout: logout,
            autoLogin: autoLogin
        };

        $rootScope.$on('logout', function (event, data) {
            logout();
        });

        return model;

        function signUpProcess() {
            if (authDataSvc.getCode() && authDataSvc.getPhone()) { //FIXME temporary for quick work
                createUser();
                return;
            }
            modalSvc.setPhone().result.then(function (res) {
                processCode();
            }).catch(function () {
                authDataSvc.clearAuthData();
            });
        }

        function processCode() {
            modalSvc.setCode().result.then(function (res) {
                if (res && res === 'change-phone') {
                    signUpProcess();
                } else {
                    createUser();
                }
            }).catch(function () {
                authDataSvc.clearAuthData();
            });
        }

        function createUser() {
            modalSvc.signup().result.then(function (res) {
                welcomeProcess(res);
            }).catch(function () {
                authDataSvc.clearAuthData();
            });
        }

        function loginProcess() {
            authDataSvc.clearAuthData();
            modalSvc.login().result.then(function (res) {
                if (res && res === 'reset-pass') {
                    resetPassProcess();
                }
            });
        }

        function welcomeProcess(userData) {
            modalSvc.welcome().result.then(function (res) {
                loginProcess();
            }).catch(function () {
                // logout();
            })
        }

        function resetPassProcess() {
            modalSvc.resetPassword().result.then(function () {

            })
        }

        function autoLogin(callback) {
            return callback && callback();
        }

        function checkLogin() {
            if (!authDataSvc.isLogined()) {
                $state.go('app.start-page');
            }
        }

        function logout() {
            authDataSvc.clearAuthData();
            $state.go('app.start-page', {}, {reload: true});
            window.location.reload(true);
        }
    }
})
();