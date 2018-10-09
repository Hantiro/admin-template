;(function () {
    'use strict';

    angular.module('service.textSvc', []).service('textSvc', textSvc);

    /* @ngInject */
    function textSvc(url, http) {
        var model = {
            terms: terms,
            faq: faq,
            about: about,
            contactUs: contactUs,
            getByNameArr: getByNameArr
        };
        return model;

        function getByNameArr(namesArr) {
            return http.post(url.add_info.getByName, { names: namesArr});
        }

        function terms() {
            return http.get(url.text.terms);
        }

        function faq() {
            return http.get(url.text.faq);
        }

        function about() {
            return http.get(url.text.about);
        }

        function contactUs(data) {
            return http.post(url.settings.contactUs, data);
        }
    }
})();