;(function () {
    'use strict';

    angular.module('service.dateSvc', []).factory('dateSvc', dateSvc);

    /* @ngInject */
    function dateSvc(http, url,  $rootScope, utilsSvc, $q,  messagesSvc, dateExtSvc, constSvc, dateRequestSvc) {

        var currentSelectModel;
        var preloadSimpleCalendarModel;
        var currentCalendarModel;
        var currentMonthCalendarModel;
        var currentDay;
        var selectedDay;
        var selectedMonth;

        var model = {
            processSelectDay: processSelectDay,
            createRedDay: createRedDay,
            updateCalendar: updateCalendar,
            createFirstDay: createFirstDay,
            getPreloadedForSimple: getPreloadedForSimple,
            getCalendarModel: getCalendarModel,
            setCalendarModel: setCalendarModel,
            setCurrentMonth: setCurrentMonth,
            getCurrentMonth: getCurrentMonth,
            getDeleteText: getDeleteText,
            getCurrentDay: getCurrentDay,
            setCurrentDay: setCurrentDay,
            getSelectedDay: getSelectedDay,
            setSelectedDay: setSelectedDay,
            setSelectedMonth: setSelectedMonth,
            getSelectedMonth: getSelectedMonth,
        };


        function getPreloadedForSimple() {
            return preloadSimpleCalendarModel;
        }

        function preloadSimple() {
            if (preloadSimpleCalendarModel) {
                return $q.when(preloadSimpleCalendarModel);
            }
            return dateRequestSvc.loadMonth({default: 1}).then(function (res) {
                preloadSimpleCalendarModel = res;
                return res;
            })
        }

        function getCalendarModel() {
            return currentCalendarModel || {};
        }

        function setCalendarModel(model) {
            currentCalendarModel = model;
            setSelectedMonth(getCurrentMonth()); //reset to current
            setSelectedDay(getCurrentDay()); //reset to current
            $rootScope.$broadcast(constSvc.CALENDAR_EVENT.UPDATED_MODEL, model);
        }

        //current != selected when choise prev or next month, current means real current
        function getCurrentMonth() {
            return currentMonthCalendarModel || {};
        }

        //current != selected when choise prev or next month, current means real current
        function setCurrentMonth(model) {
            setCurrentDay(dateExtSvc.searchCurrentDayInMonth(model));
            currentMonthCalendarModel = angular.copy(model);
        }

        //current != selected when choise prev or next month, current means real current
        function setCurrentDay(dayModel) {
            currentDay = angular.copy(dayModel);
        }

        //current != selected when choise prev or next month, current means real current
        function getCurrentDay() {
            return currentDay || {};
        }

        function setSelectedDay(dayModel){
            selectedDay = angular.copy(dayModel);
        }

        function getSelectedDay(){
            return selectedDay || {};
        }

        function setSelectedMonth(monthObj){
            selectedMonth = angular.copy(monthObj);
        }

        function getSelectedMonth() {
            return selectedMonth || {};
        }

        function getDeleteText() {
            return getCalendarModel() && getCalendarModel().last_part_period === constSvc.PERIOD_CONST.END ?
                'CONTENT.DELETE_LAST_DAY' : 'CONTENT.DELETE_FIRST_DAY';
        }

        function clearPreloadSimple() {
            preloadSimpleCalendarModel = null;
        }

        function updateCalendar() {
            $rootScope.$broadcast(constSvc.CALENDAR_EVENT.UPDATE_CALENDAR, {});
        }

        //----------------------------------------------------------------
        function processSelectDay(monthObj, dayObj, scope) {
            // var selectedModel = {
            //     g_day: dayObj.gregorian_day,
            //     g_month: dayObj.gregorian_month,
            //     g_year: dayObj.gregorian_year
            // };
            setSelectedDay(dayObj);
            setSelectedMonth(monthObj);
            $rootScope.$broadcast(constSvc.CALENDAR_EVENT.SELECTED_CALENDAR,{
                day: dayObj,
                month: monthObj
            });
        }

        function selectTime(selectedDay, monthObj) {
            var time = {
                hour: 15,
                minute: 30
            };
            var selectedModel = Object.assign({}, selectedDay, time);
            selectDate(selectedModel, monthObj);
        }

        // function processDeviceTime(selectedModel, monthObj) {
        //     return utilsSvc.showDatePicker(new Date(), 'time', 3).then(function success(res) {
        //         selectedModel = Object.assign(selectedModel, {
        //             hour: res.getHours(),
        //             minute: res.getMinutes()
        //         });
        //         return selectDate(selectedModel, monthObj);
        //     });
        // }

        function selectDate(selectDayModel, monthObj) {
            currentSelectModel = {
                selected: selectDayModel,
                month: monthObj
            };
            return $q.when(angular.copy(currentSelectModel));
        }

        //---------------------------------------------------

        function createFirstDay(selectedModel) {
            var requestObj = selectedModel;
            requestObj.type_id = constSvc.TYPE_EVENT.PERIODS;
            requestObj.part_period = 1;
            return dateRequestSvc.createEventHistory(requestObj);
        }

        function createRedDay(selectedModel, monthObj) {
            selectedModel.type_id = constSvc.TYPE_EVENT.PERIODS;
            switch (monthObj.last_part_period) {
                case constSvc.PERIOD_CONST.EMPTY:
                    selectedModel.part_period = constSvc.PERIOD_CONST.START;
                    break;
                case constSvc.PERIOD_CONST.START:
                    selectedModel.part_period = constSvc.PERIOD_CONST.END;
                    break;
                case constSvc.PERIOD_CONST.END:
                    selectedModel.part_period = constSvc.PERIOD_CONST.START;
                    break;
            }
            return dateRequestSvc.createEvent(selectedModel);
        }

        return model;
    }
})
();
