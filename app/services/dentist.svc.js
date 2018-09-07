;(function () {
    'use strict';

    angular.module('service.dentistSvc', []).factory('dentistSvc', dentistSvc);

    /* @ngInject */
    function dentistSvc(http, url) {
        var model = {
            getAllDentist: getAllDentist,
            getAmountDentist: getAmountDentist
        };
        return model;

        function getAllDentist() {
            return http.get(url.dentists)
        }

        function getAmountDentist() {
            return http.get(url.amount.dentists)
        }
    }
})();