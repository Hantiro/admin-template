;(function () {
    'use strict';

    angular.module('service.notificationSvc', [])
        .service('notificationSvc', notificationSvc);

    /* @ngInject */
    function notificationSvc(url, http) {
        var model = {
            subscribe: subscribe,
            settingsView: settingsView,
            settingsUpdate: settingsUpdate,
            all: all,
            my: my,
            change: change
        };
        return model;

        function my() {
            return http.get(url.notification.my);
        }

        function all() {
            return http.get(url.notification.all);
        }

        function change(data) {
            return http.post(url.notification.change, data);
        }

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