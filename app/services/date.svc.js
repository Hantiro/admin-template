;(function () {
    'use strict';

    angular.module('service.dateSvc', []).factory('dateSvc', dateSvc);

    /* @ngInject */
    function dateSvc(http, url,  $rootScope, utilsSvc, $q,  messagesSvc, dateExtSvc) {
        var CALENDAR_TYPE = {
            DETAILED: "detailed",
            SIMPLE: "simple"
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

        var currentSelectModel;
        var popupInstance;
        var preloadSimpleCalendarModel;
        var currentCalendarModel;
        var currentMonthCalendarModel;
        var currentDay;
        var selectedDay;

        var model = {
            getDate: getDate,
            loadMonth: loadMonth,
            createEvent: createEvent,
            deleteLastEvent: deleteLastEvent,
            processSelectDay: processSelectDay,
            getListEvents: getListEvents,
            createRedDay: createRedDay,
            updateCalendar: updateCalendar,
            createFirstDay: createFirstDay,
            createEventHistory: createEventHistory,
            getPreloadedForSimple: getPreloadedForSimple,
            getCalendarModel: getCalendarModel,
            setCalendarModel: setCalendarModel,
            setCurrentMonthModel: setCurrentMonthModel,
            getCurrentMonthModel: getCurrentMonthModel,
            getDeleteText: getDeleteText,
            getCurrentDay: getCurrentDay,
            setCurrentDay: setCurrentDay,
            getSelectedDay: getSelectedDay,
            setSelectedDay: setSelectedDay,
            EVENT_IMG: EVENT_IMG,
            EVENT_CONST: EVENT_CONST,
            PERIOD_CONST: PERIOD_CONST,
            TYPE_EVENT: TYPE_EVENT,
            CALENDAR_TYPE: CALENDAR_TYPE,
        };

        //requests -------------------------------

        function createEventHistory(data) {
            return http.post(url.calendar.create_event_history, data);
        }

        function getListEvents() {
            return http.get(url.calendar.getList);
        }

        function deleteLastEvent() {
            return http.delete(url.calendar.delete_last_event);
        }

        //without params - loading current month
        function loadMonth(params) {
            return http.get(url.calendar.month, params).then(function (res) {
                return dateExtSvc.prepareMonthObj(res);
            });
        }

        function createEvent(data) {
            return http.post(url.calendar.create_event, data);
        }

        //-----------------------------------------
        function getPreloadedForSimple() {
            return preloadSimpleCalendarModel;
        }

        function preloadSimple() {
            if (preloadSimpleCalendarModel) {
                return $q.when(preloadSimpleCalendarModel);
            }
            return loadMonth({default: 1}).then(function (res) {
                preloadSimpleCalendarModel = res;
                return res;
            })
        }

        function getCalendarModel() {
            return currentCalendarModel || {};
        }

        function setCalendarModel(model) {
            currentCalendarModel = model;
            $rootScope.$broadcast('calendar_model_updated', model);
        }

        //current != selected when choise prev or next month, current means real current
        function getCurrentMonthModel() {
            return currentMonthCalendarModel || {};
        }

        //current != selected when choise prev or next month, current means real current
        function setCurrentMonthModel(model) {
            currentDay = dateExtSvc.searchCurrentDayInMonth(model);
            currentMonthCalendarModel = model;
        }

        //current != selected when choise prev or next month, current means real current
        function setCurrentDay(dayModel) {
            currentDay = dayModel;
        }

        //current != selected when choise prev or next month, current means real current
        function getCurrentDay() {
            return currentDay || {};
        }

        function setSelectedDay(dayModel){
            selectedDay = dayModel;
        }

        function getSelectedDay(){
            return selectedDay || {};
        }


        function getDeleteText() {
            return getCalendarModel() && getCalendarModel().last_part_period === PERIOD_CONST.END ?
                'CONTENT.DELETE_LAST_DAY' : 'CONTENT.DELETE_FIRST_DAY';
        }

        function clearPreloadSimple() {
            preloadSimpleCalendarModel = null;
        }

        function updateCalendar() {
            $rootScope.$broadcast('update_calendar', {});
        }

        //----------------------------------------------------------------
        function processSelectDay(monthObj, dayObj, scope) {
            // var selectedModel = {
            //     g_day: dayObj.gregorian_day,
            //     g_month: dayObj.gregorian_month,
            //     g_year: dayObj.gregorian_year
            // };
            setSelectedDay(dayObj);
        }

        function selectTime(selectedDay, monthObj) {
            var time = {
                hour: 15,
                minute: 30
            };
            var selectedModel = Object.assign({}, selectedDay, time);
            return !window.ionic.Platform.isWebView() ?
                selectDate(selectedModel, monthObj) : processDeviceTime(selectedModel, monthObj); //web or real device
        }

        function processDeviceTime(selectedModel, monthObj) {
            return utilsSvc.showDatePicker(new Date(), 'time', 3).then(function success(res) {
                selectedModel = Object.assign(selectedModel, {
                    hour: res.getHours(),
                    minute: res.getMinutes()
                });
                return selectDate(selectedModel, monthObj);
            });
        }

        function selectDate(selectDayModel, monthObj) {
            currentSelectModel = {
                selected: selectDayModel,
                month: monthObj
            };
            return $q.when(angular.copy(currentSelectModel));
        }

        //---------------------------------------------------

        function createFirstDay(selectedModel) {
            var requestObj = selectedModel.selected;
            requestObj.type_id = TYPE_EVENT.PERIODS;
            requestObj.part_period = 1;
            return createEventHistory(requestObj);
        }

        function createRedDay(selectedModel, monthObj) {
            selectedModel.type_id = TYPE_EVENT.PERIODS;
            switch (monthObj.last_part_period) {
                case PERIOD_CONST.EMPTY:
                    selectedModel.part_period = PERIOD_CONST.START;
                    break;
                case PERIOD_CONST.START:
                    selectedModel.part_period = PERIOD_CONST.END;
                    break;
                case PERIOD_CONST.END:
                    selectedModel.part_period = PERIOD_CONST.START;
                    break;
            }
            return createEvent(selectedModel);
        }


        function getDate(params, selectCallback) {
            return preloadSimple().then(function () {
                var scope = $rootScope.$new(true);
                scope.isSelectTime = params.isSelectTime || false;
                scope.updatedModel = selectCallback || angular.noop;
            });
        }

        function processOk(e) {
            if (!currentSelectModel) {
                messagesSvc.show('ERROR.NEED_SELECT_DATE', 'error');
                e.preventDefault();
            }
            var selected = angular.copy(currentSelectModel);
            currentSelectModel = null;
            popupInstance.close(selected);
        }

        return model;
    }
})
();
