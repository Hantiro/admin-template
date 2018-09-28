;(function () {
    'use strict';

    angular.module('service.settingsSvc', []).factory('settingsSvc', settingsSvc);

    /* @ngInject */
    function settingsSvc($localStorage, http, url, $state) {
        var model = {
            contactUs: contactUs,
            comments: comments,
            terms: terms
        };
        return model;

        function contactUs(data) {
            return http.post(url.settings.contactUs, data);
        }

        function comments() {
            return http.get(url.settings.comments);
        }

        function terms() {
            return http.get(url.settings.terms)
        }

    }
})();
