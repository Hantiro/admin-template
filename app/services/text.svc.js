;(function () {
    'use strict';

    angular.module('service.textSvc', []).service('textSvc', textSvc);

    /* @ngInject */
    function textSvc(url, http) {
        var model = {
            getShare: getShare,
            getPrivacy: getPrivacy,
            getAbout: getAbout,
            getTerms: getTerms,
            getStartPage: getStartPage,
            getAllQuestion: getAllQuestion,
            updateText: updateText,
            updateQuestion: updateQuestion
        };
        return model;

        function updateText(data) {
            return http.put(url.static.text, data)
        }

        function getAbout() {
            return http.get(url.static.about);
        }

        function getShare() {
            return http.get(url.static.share)
        }

        function getStartPage() {
            return http.get(url.static.start_page);
        }

        function getPrivacy() {
            return http.get(url.static.privacy);
        }

        function getTerms() {
            return http.get(url.static.terms);
        }

        function getAllQuestion() {
            return http.get(url.question);
        }

        function updateQuestion(quest) {
            var send = {
                name: quest.name
            };
            return http.put(url.question + '/' + quest.id, send)
        }

    }
})();