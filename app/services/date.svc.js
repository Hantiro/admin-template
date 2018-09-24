;(function () {
    'use strict';

    angular.module('service.dateSvc', []).factory('dateSvc', dateSvc);

    /* @ngInject */
    function dateSvc(http, url, $state,  $rootScope, utilsSvc, $q, $translate, messagesSvc) {
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

        var model = {
            getDate: getDate,
            loadMonth: loadMonth,
            createEvent: createEvent,
            deleteLastEvent: deleteLastEvent,
            prepareMonthObj: prepareMonthObj,
            nextMonth: nextMonth,
            prevMonth: prevMonth,
            processSelectDay: processSelectDay,
            getListEvents: getListEvents,
            createRedDay: createRedDay,
            updateCalendar: updateCalendar,
            createFirstDay: createFirstDay,
            createEventHistory: createEventHistory,
            getPreloadedForSimple: getPreloadedForSimple,
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
                return prepareMonthObj(res);
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
            if(preloadSimpleCalendarModel){
                return $q.when(preloadSimpleCalendarModel);
            }
            return loadMonth({default: 1}).then(function (res) {
                preloadSimpleCalendarModel = res;
                return res;
            })
        }

        function clearPreloadSimple(){
            preloadSimpleCalendarModel = null;
        }

        function updateCalendar() {
            $rootScope.$broadcast('update_calendar', {});
        }

        function prepareMonthObj(monthObj) {
            if (!monthObj) return;
            var lastRedDay = {};
            var calendarModel = Object.assign({}, monthObj);
            calendarModel.jewish_day = +calendarModel.jewish_day;
            calendarModel.jewish_month = +calendarModel.jewish_month;
            calendarModel.jewish_year = +calendarModel.jewish_year;
            calendarModel.gregorian_day = +calendarModel.gregorian_day;
            calendarModel.gregorian_month = +calendarModel.gregorian_month;
            calendarModel.gregorian_year = +calendarModel.gregorian_year;
            calendarModel.next_month = +calendarModel.next_month;
            calendarModel.prev_month = +calendarModel.prev_month;
            calendarModel.jewish_current_day = +calendarModel.jewish_current_day;
            calendarModel.jewish_current_month = +calendarModel.jewish_current_month;
            calendarModel.jewish_month_name = calendarModel.jewish_month_name.toUpperCase();
            calendarModel.last_part_period = +calendarModel.last_part_period;
            if (calendarModel.weeks) {
                calendarModel.weeks = prepareCalendarWeeks(calendarModel.weeks, calendarModel, lastRedDay);
            }
            if (calendarModel.lastEvent) {
                calendarModel.lastEvent = prepareCalendarDay(calendarModel.lastEvent);
            }
            return calendarModel;
        }

        function prepareCalendarWeeks(weeks, calendarModel) {
            if (!weeks) return [];
            for (var i = 0; i < weeks.length; i++) {
                weeks[i] = prepareCalendarDaysInWeeks(weeks[i]);
            }
            if (weeks[5] && weeks[5][0] &&
                weeks[5][0].jewish_month !== calendarModel.jewish_month) {
                weeks.pop();
            }
            return weeks;
        }

        function prepareCalendarDay(day) {
            day.gregorian_day = +day.gregorian_day;
            day.gregorian_month = +day.gregorian_month;
            day.gregorian_year = +day.gregorian_year;
            day.jewish_day = +day.jewish_day;
            day.jewish_month = +day.jewish_month;
            day.jewish_year = +day.jewish_year;
            if (day.events) {
                day.events.top = +day.events.top;
                day.events.bottom = +day.events.bottom;
            }
            day.mark.clean_day = !!day.mark.clean_day;
            day.mark.pill_day = !!day.mark.pill_day;
            return day;
        }

        function prepareCalendarDaysInWeeks(weekItem) {
            if (!weekItem) return [];
            var week = weekItem.reverse();
            for (var j = 0; j < week.length; j++) {
                week[j] = prepareCalendarDay(week[j]);
            }
            return week;
        }

        function nextMonth(monthObj, isSimple) {
            var params = {
                year: monthObj.jewish_year,
                month: monthObj.next_month
            };
            if (isSimple) {
                params.default = 1;
            }
            if (monthObj.next_month === 1) {
                params.year = monthObj.jewish_year + 1;
            }
            return params;
        }

        function prevMonth(monthObj, isSimple) {
            var params = {
                year: monthObj.jewish_year,
                month: monthObj.prev_month
            };
            if (monthObj.prev_month === 13 || (monthObj.prev_month === 12 && monthObj.jewish_month === 1)) {
                params.year = monthObj.jewish_year - 1;
            }
            if (isSimple) {
                params.default = 1;
            }
            return params;
        }

        //----------------------------------------------------------------
        function processSelectDay(monthObj, dayObj, scope) {
            var selectedModel = {
                g_day: dayObj.gregorian_day,
                g_month: dayObj.gregorian_month,
                g_year: dayObj.gregorian_year
            };
            return scope.ccIsSelectTime ? selectTime(selectedModel, monthObj) : selectDate(selectedModel, monthObj);
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
            return preloadSimple().then(function(){
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
