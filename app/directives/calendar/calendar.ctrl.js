;(function () {
    'use strict';

    angular
        .module('app')
        .controller('CalendarCtrl', CalendarCtrl);

    /* @ngInject */
    function CalendarCtrl($scope, dateSvc, constSvc) {
        var vm = this;
        vm.changedTime = changedTime;
        vm.save = save;
        vm.cancel = cancel;
        vm.timeModel = (new Date());
        vm.calendarModel = dateSvc.getCalendarModel();
        vm.showTime = false;
        vm.textHeader = 'CONTENT.THE_START_DATE';

        $scope.$on(constSvc.CALENDAR_EVENT.UPDATED_MODEL, function (event, data) {
            vm.calendarData = data;
        });

        $scope.$on(constSvc.CALENDAR_EVENT.SELECTED_CALENDAR, function (event, data) {
            vm.showTime = true;
        });

        init();

        function init() {
            vm.textHeader = isStart() ? 'CONTENT.THE_START_DATE' : 'CONTENT.THE_END_DATE';
        }

        function isStart() {
            return vm.calendarModel.last_part_period === constSvc.PERIOD_CONST.END
                || vm.calendarModel.last_part_period === constSvc.PERIOD_CONST.EMPTY;
        }

        function cancel() {
            vm.showTime = false;
        }

        function save() {
            if (!dateSvc.getSelectedDay()) {
                return;
            }
            var sendObj = {
                hour: vm.timeModel.getHours(),
                minute: vm.timeModel.getMinutes(),
                g_day: dateSvc.getSelectedDay().gregorian_day,
                g_month: dateSvc.getSelectedDay().gregorian_month,
                g_year: dateSvc.getSelectedDay().gregorian_year
            };
            dateSvc.createRedDay(sendObj, dateSvc.getSelectedMonth()).then(afterSave);
        }

        function afterSave() {
            dateSvc.updateCalendar();
            dateSvc.setSelectedMonth(dateSvc.getCurrentMonthModel());
            dateSvc.setSelectedDay(dateSvc.getCurrentDay());
            vm.showTime = false;
        }

        function changedTime() {
            
        }
    }
})();
