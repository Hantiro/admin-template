;(function () {
    'use strict';

    angular
        .module('app')
        .controller('CalendarCtrl', CalendarCtrl);

    CalendarCtrl.$inject = ['$scope'];

    function CalendarCtrl($scope) {
        var vm = this;
    }
})();
