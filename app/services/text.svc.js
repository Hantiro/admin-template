;(function () {
    'use strict';

    angular.module('service.textSvc', []).service('textSvc', textSvc);

    /* @ngInject */
    function textSvc(url, http) {
        var model = {
            terms: terms,
            licence: licence,
            about: about,
            contactUs: contactUs
        };
        return model;

        function terms() {
            return http.get(url.text.terms);
        }

        function licence() {
            return http.get(url.text.licence);
        }

        function about() {
            return http.get(url.text.about);
        }

        function contactUs(data) {
            return http.post(url.settings.contactUs, data);
        }
    }
})();