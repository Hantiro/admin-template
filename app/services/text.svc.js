;(function () {
    'use strict';

    angular.module('service.textSvc', []).service('textSvc', textSvc);

    /* @ngInject */
    function textSvc(url, http) {
        var model = {
            getPrivacy: getPrivacy,
            getAbout: getAbout,
            getTerms: getTerms,
        };
        return model;

        function getAbout() {
            return http.get(url.static.about);
        }


        function getPrivacy() {
            return http.get(url.static.privacy);
        }

        function getTerms() {
            return http.get(url.settings.terms)
        }

    }
})();