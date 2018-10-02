;(function () {
    'use strict';

    angular
        .module('app')
        .controller('CalendarCtrl', CalendarCtrl);

    /* @ngInject */
    function CalendarCtrl($scope, dateSvc) {
        var vm = this;
        vm.changedTime = changedTime;
        vm.save = save;
        vm.cancel = cancel;
        vm.timeModel = (new Date());
        vm.calendarModel = dateSvc.getCalendarModel();
        vm.showTime = false;
        vm.textHeader = 'CONTENT.THE_START_DATE';

        $scope.$on(dateSvc.CALENDAR_EVENT.UPDATED_MODEL, function (event, data) {
            vm.calendarData = data;
            vm.textHeader = data.last_part_period === dateSvc.PERIOD_CONST.END ||
            data.last_part_period === dateSvc.PERIOD_CONST.EMPTY ?
                'CONTENT.THE_START_DATE' : 'CONTENT.THE_END_DATE';
        });

        $scope.$on(dateSvc.CALENDAR_EVENT.SELECTED_CALENDAR, function (event, data) {
            vm.showTime = true;
        });

        init();

        function init() {

        }

        function cancel() {
            vm.showTime = false;
        }

        function save() {
            if (dateSvc.getSelectedDay()) {
                var sendObj = {
                    hour: vm.timeModel.getHours(),
                    minute: vm.timeModel.getMinutes(),
                    g_day: dateSvc.getSelectedDay().gregorian_day,
                    g_month: dateSvc.getSelectedDay().gregorian_month,
                    g_year: dateSvc.getSelectedDay().gregorian_year
                };
                dateSvc.createRedDay(sendObj, dateSvc.getSelectedMonth()).then(
                    function (res) {
                        dateSvc.updateCalendar();
                        dateSvc.setSelectedMonth(null);
                        dateSvc.setSelectedDay(null);
                        vm.showTime = false;
                    }
                );
            }
        }

        function changedTime() {

        }

    }
})();
