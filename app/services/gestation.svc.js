;(function () {
    'use strict';

    angular.module('service.gestationSvc', []).factory('gestationSvc', gestationSvc);

    /* @ngInject */
    function gestationSvc(http, url) {
        let model = {
            create: create,
            get: get
        };

        function get() {
            return http.get(url.gestation.get);
        }

        function create(data) {
            return http.post(url.gestation.create, data);
        }

        return model;
    }
})
();
