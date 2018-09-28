;(function () {
    'use strict';

    angular.module('service.notificationSvc', [])
        .service('notificationSvc', notificationSvc);

    /* @ngInject */
    function notificationSvc(url, http) {
        let model = {
            subscribe: subscribe,
            settingsView: settingsView,
            settingsUpdate: settingsUpdate
        };
        return model;

        function subscribe(credentials) {
            return http.post(url.notificationSettings.setToken, credentials);
        }

        function settingsView() {
            return http.get(url.notificationSettings.settings)
        }

        function settingsUpdate(data) {
            return http.post(url.notificationSettings.settings, data)
        }


    }

})();
