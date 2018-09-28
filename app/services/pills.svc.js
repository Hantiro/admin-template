;(function () {
    'use strict';

    angular.module('service.pillsSvc', []).factory('pillsSvc', pillsSvc);

    /* @ngInject */
    function pillsSvc(http, url, $rootScope, dateSvc, messagesSvc, $q) {
        var model = {
            create: create,
            deleteLast: deleteLast
        };

        function deleteLast() {
            return http.delete(url.pill.delete_last);
        }

        function create(data) {
            return http.post(url.pill.create, data);
        }

        return model;
    }
})
();
