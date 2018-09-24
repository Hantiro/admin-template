;(function () {
    'use strict';

    angular.module('service.userSvc', []).service('userSvc', userSvc);


    /* @ngInject */
    function userSvc(url, http) {
        var model = {
            getUser: getUser
        };
        return model;


        function getUser() {
            return http.get(url.user.view);
        }

    }
})();