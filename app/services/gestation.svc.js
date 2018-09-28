;(function () {
    'use strict';

    angular.module('service.gestationSvc', []).factory('gestationSvc', gestationSvc);

    /* @ngInject */
    function gestationSvc(http, url) {
        let model = {
            create: create,
            get: get,
            remove: remove
        };

        function get() {
            return http.get(url.gestation.get);
        }

        function create(data) {
            return http.post(url.gestation.create, data);
        }

        function remove(){
            return http.delete(url.gestation.delete);
        }

        return model;
    }
})
();
