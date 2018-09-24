;(function () {
        'use strict';

        angular.module('service.authSvc', []).service('authSvc', authSvc);

        /* @ngInject */
        function authSvc($rootScope, url, http, userSvc, $state, $sessionStorage, $localStorage) {
            var model = {
                login: login,
                sendPhone: sendPhone,
                sendCode: sendCode,
                signUp: signUp,
                changePassword: changePassword,
                setDevice: setDevice,
                resetPassword: resetPassword,
            };

            return model;

            //auth request
            function login(user) {
                return http.post(url.auth.login, user);
            }

            function sendPhone(data) {
                return http.post(url.auth.sendPhone, data);
            }

            function sendCode(data) {
                return http.post(url.auth.sendCode, data);
            }

            function signUp(data) {
                return http.post(url.auth.signUp, data);
            }

            function changePassword(data) {
                return http.post(url.auth.changePassword, data);
            }

            function resetPassword(data) {
                return http.post(url.auth.resetPassword, data);
            }

            function setDevice(data) {
                return http.post(url.auth.setToken, data);
            }
            //------------------------------
        }
    }

)();