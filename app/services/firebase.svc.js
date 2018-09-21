;(function () {
        'use strict';

        angular.module('service.firebaseSvc', []).service('firebaseSvc', firebaseSvc);

        /* @ngInject */
        function firebaseSvc($rootScope, url, http) {
            var model = {
                get: get
            };

            return model;


        }
    }

)();