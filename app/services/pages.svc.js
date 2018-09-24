;(function () {
        'use strict';

        angular.module('service.pagesSvc', []).service('pagesSvc', pagesSvc);

        /* @ngInject */
        function pagesSvc() {
            var pageName = '';
            var model = {
                getCurrentName: getCurrentName,
                setCurrentName: setCurrentName
            };

            function getCurrentName(){
                return pageName;
            }

            function setCurrentName(name) {
                pageName = name;
            }

            return model;
        }
    }

)();