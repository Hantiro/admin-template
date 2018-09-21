;(function () {
        'use strict';

        angular.module('service.traditionSvc', []).service('traditionSvc', traditionSvc);

        /* @ngInject */
        function traditionSvc($rootScope, url, http) {
            var model = {
                get: get
            };

            function get(){
                return http.get(url.settings.comments);
            }

            return model;


        }
    }

)();