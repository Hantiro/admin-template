;(function () {
    'use strict';

    angular.module('service.constSvc', []).factory('constSvc', constSvc);

    /* @ngInject */
    function constSvc() {
        var ICON_PATH = 'content/img/icon/';

        var CALENDAR_TYPE = {
            DETAILED: 'detailed',
            SIMPLE: 'simple'
        };

        var EVENT_CONST = {
            'NIGHT': 1,
            'DAY': 2,
            'RED': 3,
            'END_RED': 4,
            'FORECAST': 5,
            'BREAK': 6,
            'WATER': 7,
            'CLEAN_DAY': 8,
            'PILLS': 9
        };

        var PREDICTION = {
            'MONTHLY': 1,
            'AVERAGE': 2,
            'INTERVAL': 3
        };

        var CALENDAR_EVENT = {
            DELETED_EVENT: '0',
            CREATED_EVENT: '1',
            UPDATED_MODEL: '2',
            UPDATE_CALENDAR: '3',
            SELECTED_CALENDAR: '4'
        };

        var EVENT_IMG = {};
        EVENT_IMG[EVENT_CONST.NIGHT] = 'moon.png';
        EVENT_IMG[EVENT_CONST.DAY] = 'sun.png';
        EVENT_IMG[EVENT_CONST.RED] = 'active_day.png';
        EVENT_IMG[EVENT_CONST.END_RED] = 'last_day.png';
        EVENT_IMG[EVENT_CONST.FORECAST] = 'star.png';
        EVENT_IMG[EVENT_CONST.BREAK] = 'circle.png';
        EVENT_IMG[EVENT_CONST.WATER] = 'sea_waves.png';
        EVENT_IMG[EVENT_CONST.PILLS] = 'pill-day.png';
        EVENT_IMG[EVENT_CONST.CLEAN_DAY] = 'clean-day.png';

        var PERIOD_CONST = {
            EMPTY: 0,
            START: 1,
            END: 2
        };

        var TYPE_EVENT = {
            PERIODS: 1,
            PILLS: 2,
            GESTATION: 3
        };

        var model = {
            CALENDAR_EVENT: CALENDAR_EVENT,
            EVENT_IMG: EVENT_IMG,
            EVENT_CONST: EVENT_CONST,
            PERIOD_CONST: PERIOD_CONST,
            TYPE_EVENT: TYPE_EVENT,
            CALENDAR_TYPE: CALENDAR_TYPE,
            PREDICTION: PREDICTION,
            ICON_PATH: ICON_PATH,
            eventIconPath:eventIconPath
        };

        function eventIconPath(event){
           return  ICON_PATH+EVENT_IMG[event];
        }

        return model;
    }
})
();
