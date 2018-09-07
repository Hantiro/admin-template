;(function () {
    'use strict';

    angular.module('service.clinicsSvc', []).factory('clinicsSvc', clinicsSvc);

    /* @ngInject */
    function clinicsSvc(http, url) {
        var model = {
            getAllClinic: getAllClinic,
            getAmountClinic: getAmountClinic,
            getClinic: getClinic
        };
        return model;

        function getAllClinic() {
            return http.get(url.clinics)
        }

        function getClinic(clinic_id) {
            return http.get(url.clinic_id + clinic_id).then(function(res){
                return res;
            });
        }

        function getAmountClinic() {
            return http.get(url.amount.clinics)
        }
    }
})();