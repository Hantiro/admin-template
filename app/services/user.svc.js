;(function () {
    'use strict';

    angular.module('service.userSvc', []).service('userSvc', userSvc);


    /* @ngInject */
    function userSvc(url, http) {
        var model = {
            view: view,
            update: update,
            updatePassword: updatePassword,
            getSettings: getSettings,
            setSettings: setSettings,
            getUser: view
        };
        return model;

        function view() {
            return http.get(url.user.view);

        }
        function update(data) {
            return http.put(url.user.update + '/' + data.id, data);
        }
        function updatePassword(data) {
            return http.post(url.user.updatePassword, data);
        }
        function getSettings() {
            return http.get(url.user.userSettings);
        }
        function setSettings(data) {
            return http.post(url.user.userSettings, data);
        }

    }
})();