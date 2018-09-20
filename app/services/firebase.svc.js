;(function () {
        'use strict';

        angular.module('service.firebaseSvc', []).service('firebaseSvc', firebaseSvc);


        function firebaseSvc($rootScope, url, http) {
            var model = {
                get: get
            };

            return model;


        }
    }

)();