;(function () {
    angular.module('directives.calendarCustom', [])
        .directive('calendarCustom', calendarCustom);

    /* @ngInject */
    function calendarCustom($document, $timeout) {
        return {
            restrict: 'E',
            templateUrl: './directives/calendar-custom/calendar-custom.html',
            scope: {
                ccType: '@', //type of calendar 'simple' for only select date,
                ccSelected: '=', //selected date obj { selected: obj, month: obj}
                ccUpdatedModel: '=',//function call when load new month or reload month obj
                ccIsSelectTime: '=', //show or hide select time
                ccUpdateSelected: '=', //function call when updated select,
                ccIsUpdateAfterSelect: '=' //if true - calendar update after select data
            },
            controller: 'CalendarCustomCtrl',
            controllerAs: 'vm',
            link: function (scope, element, attrs) {

            }
        };
    }
})();
