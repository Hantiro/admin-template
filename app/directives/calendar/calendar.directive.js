;(function () {
    angular.module('directives.calendar', [])
        .directive('calendar', calendar);

    calendar.$inject = ['$document', '$timeout'];

    function calendar($document, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'directives/calendar/calendar.html',
            replace: true,
            controller: 'CalendarCtrl',
            controllerAs: 'vm',
        };
    }
})();
