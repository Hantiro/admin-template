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
        vm.timeModel = (new Date());
        vm.calendarModel = dateSvc.getCalendarModel();

        $scope.$on('calendar_model_updated', function (event, data) {
            vm.calendarData = data;
        });

        init();
        function init(){

        }
        
        function save() {

        }

        function changedTime(){

        }

    }
})();
