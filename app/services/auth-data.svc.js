;(function () {
    'use strict';

    angular.module('service.authDataSvc', []).service('authDataSvc', authDataSvc);

    /* @ngInject */
    function authDataSvc($localStorage, $sessionStorage) {
        var model = {
            clearAuthData: clearAuthData,
            isLogined: isLogined,
            getCode: getCode,
            setCode: setCode,
            getToken: getToken,
            setToken: setToken,
            getPhone: getPhone,
            setPhone: setPhone,
            getCred: getCred,
            setCred: setCred,
            getUser: getUser,
            setUser: setUser
        };
        return model;


        function isLogined() {
            return !!getToken();
        }

        function getUser() {
            return $localStorage.user;
        }

        function setUser(userObj) {
            $localStorage.user = angular.copy(userObj);
        }

        function getToken() {
            return $localStorage.token || $sessionStorage.token;
        }

        function setToken(token, isRemember) {
            if (isRemember) {
                $localStorage.token = token;
            } else {
                $sessionStorage.token = token;
            }
        }

        function getCode() {
            return $sessionStorage.code;
        }

        function setCode(code) {
            $sessionStorage.code = code;
        }

        function getPhone() {
            return $sessionStorage.phone;
        }

        function setPhone(phone) {
            $sessionStorage.phone = phone;
        }

        function getCred() {
            return $sessionStorage.cred;
        }

        function setCred(cred) {
            $sessionStorage.cred = cred;
        }

        function clearAuthData() {
            delete $localStorage.user;
            delete $localStorage.cred;
            delete $localStorage.code;
            delete $localStorage.phone;
            delete $localStorage.token;
            delete $sessionStorage.token;
            localStorage.clear();
            sessionStorage.clear();
            $localStorage.$reset();
            $sessionStorage.$reset();
        }
    }
})
();