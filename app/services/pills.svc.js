;(function () {
    'use strict';

    angular.module('service.pillsSvc', []).factory('pillsSvc', pillsSvc);

    /* @ngInject */
    function pillsSvc(http, url, $rootScope, dateSvc, messagesSvc, $q) {
        let model = {
            create: create,
            processCreate: processCreate,
            deleteLast: deleteLast
        };

        let sendModel = {};

        function processCreate() {
            sendModel = {};
        }

        function deleteLast() {
            return http.delete(url.pill.delete_last);
        }

        function create(data) {
            return http.post(url.pill.create, data);
        }

        function closeDay(numberDay) {
            sendModel.dayCount = numberDay;
            create(sendModel).then(function () {
                messagesSvc.show('SUCCESS.DONE_PILL', 'success');
                dateSvc.updateCalendar();
                sendModel = {};
            });
        }

        return model;
    }
})
();
