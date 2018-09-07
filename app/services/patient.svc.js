;(function () {
    'use strict';

    angular.module('service.patientSvc', []).factory('patientSvc', patientSvc);

    /* @ngInject */
    function patientSvc(http, url) {
        var model = {
            getAllPatient: getAllPatient,
            getAmountPatient: getAmountPatient
        };
        return model;

        function getAllPatient() {
            return http.get(url.patients)
        }

        function getAmountPatient() {
            return http.get(url.amount.patients)
        }
    }
})();