;(function () {
    'use strict';

    angular
        .module('app')
        .controller('DeleteEventCtrl', DeleteEventCtrl);

    /* @ngInject */
    function DeleteEventCtrl($scope, dateSvc) {
        var vm = this;
        vm.deleteLastEvent = deleteLastEvent;
        vm.textDelete = dateSvc.getDeleteText();
        vm.calendarData = dateSvc.getCalendarModel();

        $scope.$on(dateSvc.CALENDAR_EVENT.UPDATED_MODEL, function (event, data) {
            vm.calendarData = data;
            vm.textDelete = dateSvc.getDeleteText();
        });

        init();
        function init(){
        }

        function deleteLastEvent() {
            dateSvc.deleteLastEvent().then(function () {
                dateSvc.updateCalendar();
            });
        }
    }
})();
