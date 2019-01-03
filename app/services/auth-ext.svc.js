;(function () {
    'use strict';

    angular.module('service.authExtSvc', []).service('authExtSvc', authExtSvc);

    /* @ngInject */
    function authExtSvc($rootScope, modalSvc, authSvc, authDataSvc, $state, userSvc, $timeout, paymentSvc) {
        var model = {
            signUpProcess: signUpProcess,
            loginProcess: loginProcess,
            checkLogin: checkLogin,
            logout: logout,
            autoLogin: autoLogin,
            logoutAsk: logoutAsk
        };

        $rootScope.$on('logout', function (event, data) {
            logout();
        });

        return model;

        function signUpProcess() {
            // if (authDataSvc.getCode() && authDataSvc.getPhone()) { //FIXME temporary for quick work
            //             //     createUser();
            //             //     return;
            //             // }
            //             // modalSvc.setPhone().result.then(function (res) {
            //             //     processCode();
            //             // }).catch(function () {
            //             //     authDataSvc.clearAuthData();
            //             // });
            createUser();
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
                religSettings();
            }).catch(function () {
                authDataSvc.clearAuthData();
            });

        }

        function religSettings() {
            modalSvc.religPopup().result.then(function (res) {
                prepareBuy({
                    isTrial: true
                });
            }).catch(function (res) {
                authDataSvc.clearAuthData();
            });
        }


        function loginProcess() {
            authDataSvc.clearAuthData();
            modalSvc.login().result.then(function (res) {
                if (res && res === 'reset-pass') {
                    resetPassProcess();
                } else if (res && res.data && res.data.user) {
                    checkPayment(res.data.user);
                }
            });
        }

        function checkPayment(user) {
            if (user.is_payed) {
                authDataSvc.setUser(user);
                $state.go('app.my-main');
            } else {
                prepareBuy({
                    isTrial: false
                });
            }
        }

        function prepareBuy(param) {
            paymentSvc.getUrl().then(
                function (res) {
                    if (res && res.data) {
                        return welcomeProcess({
                            payLink: res.data,
                            isTrial: param.isTrial || false
                        });
                    }
                },
                function () {
                    authDataSvc.clearAuthData();
                }
            )
        }

        function welcomeProcess(param) {
            return modalSvc.welcome({
                data: param || {}
            }).result.then(function (res) {
                if (res === 'test_date') {
                    $state.go('app.my-main');
                } else {
                    return modalSvc.payment(param).result.then(
                        function () {
                        }
                    ).catch(function () {
                        authDataSvc.clearAuthData();
                    });
                }
            }).catch(function () {
                logout({
                    needReload: true
                });
            });
        }

        function resetPassProcess() {
            modalSvc.forgotPass().result.then(function () {
            });
        }

        function autoLogin() {
            if (authDataSvc.isLogined()) {
                return userSvc.getUser().then(function (res) {
                    checkPayment(res.entity);
                });
            }
        }

        function checkLogin() {
            if (!authDataSvc.isLogined()) {
                $state.go('app.start-page');
            }
        }

        function logoutAsk() {
            modalSvc.logout().result.then(function () {
                logout({
                    needReload: true
                });
            });
        }

        function logout(conf) {
            var config = conf || {};
            authDataSvc.clearAuthData();
            $timeout(function () {
                $state.go('app.start-page').then(function () {
                    config.needReload && window.location.reload(true);
                });
            }, 1000);
        }
    }
})
();