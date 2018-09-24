;(function () {
    'use strict';

    angular.module('service.authExtSvc', []).service('authExtSvc', authExtSvc);

    /* @ngInject */
    function authExtSvc($rootScope, modalSvc, authSvc, authDataSvc, $state, userSvc) {
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
                } else {
                    $state.go('app.my-main');
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
            modalSvc.forgotPass().result.then(function () {

            });
        }

        function autoLogin() {
            if(authDataSvc.isLogined() && !authDataSvc.getUser()){
                return userSvc.getUser().then(function(res){
                    authDataSvc.setUser(res.entity || {});
                    return res;
                });
            } else if(authDataSvc.isLogined() && authDataSvc.getUser()) {
                return true;
            }
        }

        function checkLogin() {
            if (!authDataSvc.isLogined()) {
                $state.go('app.start-page');
            }
        }

        function logoutAsk(){
            modalSvc.logout().result.then(function(){
                logout();
            })
        }

        function logout() {
            authDataSvc.clearAuthData();
            $state.go('app.start-page', {}, {reload: true});
            window.location.reload(true);
        }
    }
})
();