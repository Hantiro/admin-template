;(function () {
    'use strict';

    angular.module('service.dateRequestSvc', []).factory('dateRequestSvc', dateRequestSvc);

    /* @ngInject */
    function dateRequestSvc(http, url,  $rootScope, $q, dateExtSvc, constSvc) {
        var model = {
            loadMonth: loadMonth,
            createEvent: createEvent,
            deleteLastEvent: deleteLastEvent,
            deleteEvent: deleteEvent,
            getListEvents: getListEvents,
            createEventHistory: createEventHistory,
        };


        function deleteEvent(id) {
            return http.delete(url.event.remove + id);
        }

        function createEventHistory(data) {
            return http.post(url.calendar.create_event_history, data);
        }

        function getListEvents() {
            return http.get(url.calendar.getList);
        }

        function deleteLastEvent() {
            return http.delete(url.calendar.delete_last_event).then(function (res) {
                $rootScope.$broadcast(constSvc.CALENDAR_EVENT.DELETED_EVENT,{});
                return res;
            });
        }

        //without params - loading current month
        function loadMonth(params) {
            return http.get(url.calendar.month, params).then(function (res) {
                return dateExtSvc.prepareMonthObj(res);
            });
        }

        function createEvent(data) {
            return http.post(url.calendar.create_event, data).then(function (res) {
                $rootScope.$broadcast(constSvc.CALENDAR_EVENT.CREATED_EVENT,{});
            });
        }

        return model;
    }
})
();
