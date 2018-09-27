;(function () {
    'use strict';

    angular
        .module('app')
        .controller('DeleteEventCtrl', DeleteEventCtrl);

    /* @ngInject */
    function DeleteEventCtrl($scope, dateSvc) {
        var vm = this;
        vm.textDelete = dateSvc.getDeleteText();
        vm.calendarData = dateSvc.getCalendarModel();
        vm.deleteLastEvent = deleteLastEvent;

        $scope.$on('calendar_model_updated', function (event, data) {
            vm.calendarData = data;
            vm.textDelete = dateSvc.getDeleteText();
        });

        function deleteLastEvent() {
            dateSvc.deleteLastEvent().then(function () {
                dateSvc.updateCalendar();
            });
        }
    }
})();
