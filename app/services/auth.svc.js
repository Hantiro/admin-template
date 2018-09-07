;(function () {
        'use strict';

        angular.module('service.authSvc', []).service('authSvc', authSvc);


        function authSvc($rootScope, url, http, userSvc, $state) {
            var model = {
                processAutoLogin: processAutoLogin,
                isLogined: isLogined,
                logout: logout,
                login: login,
                checkLogin: checkLogin
            };

            $rootScope.$on('logout', function (event, data) {
                logout();
            });

            return model;

            function login(user) {
                return http.post(url.admin.login, user);
            }

            function processAutoLogin(callback) {
                if (isLogined()) {
                    $state.go('app.dentists');
                } else {
                    $state.go('login');
                }
                return callback && callback();
            }

            function checkLogin() {
                if (!isLogined()) {
                    $state.go('login');
                }
            }

            function isLogined() {
                if (userSvc.getToken()) {
                    return true;
                }
                return false;
            }

            function logout() {
                clearAuthData();
                userSvc.resetData();
                $state.go('login', {}, {reload: true});
                window.location.reload(true);
            }

            function clearAuthData() {
            }
        }
    }

)();