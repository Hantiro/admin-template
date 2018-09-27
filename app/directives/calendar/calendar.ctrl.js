;(function () {
    'use strict';

    angular
        .module('app')
        .controller('CalendarCtrl', CalendarCtrl);

    /* @ngInject */
    function CalendarCtrl($scope, dateSvc) {
        var vm = this;
        vm.calendarModel = dateSvc.getCalendarModel();

        $scope.$on('calendar_model_updated', function (event, data) {
            vm.calendarData = data;
        });

    }
})();
