;(function () {
        'use strict';

        angular.module('service.traditionSvc', []).service('traditionSvc', traditionSvc);

        /* @ngInject */
        function traditionSvc($rootScope, url, http) {
            var model = {
                get: get
            };

            return model;


        }
    }

)();