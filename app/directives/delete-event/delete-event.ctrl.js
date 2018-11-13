;(function () {
    'use strict';

    angular
        .module('app')
        .controller('DeleteEventCtrl', DeleteEventCtrl);

    /* @ngInject */
    function DeleteEventCtrl($scope, dateSvc, dateExtSvc, dateRequestSvc, constSvc, messagesSvc) {
        var vm = this;
        vm.deleteLastEvent = deleteLastEvent;
        vm.textDelete = dateSvc.getDeleteText();
        vm.calendarData = dateSvc.getCalendarModel();
        vm.isShowDelete = isShowDelete;

        $scope.$on(constSvc.CALENDAR_EVENT.UPDATED_MODEL, function (event, data) {
            vm.calendarData = data;
            vm.textDelete = dateSvc.getDeleteText();
        });

        init();
        function init(){
            vm.calendarData = dateSvc.getCalendarModel();
        }

        function checkLastEventInCurrentMonth() {
            return vm.calendarData && vm.calendarData.lastEvent && dateExtSvc.isDayInCurrentMonth(vm.calendarData.lastEvent, vm.calendarData);
        }

        function isShowDelete(){
            return vm.calendarData && vm.calendarData.last_part_period && checkLastEventInCurrentMonth();
        }

        function deleteLastEvent() {
            dateRequestSvc.deleteLastEvent().then(function (res) {
                if(res){
                    messagesSvc.show('SUCCESS.DELETED', 'success');
                }
                dateSvc.updateCalendar();
            });
        }
    }
})();
