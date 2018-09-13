;(function () {
    'use strict';

    angular
        .module('app')
        .controller('NotificationCtrl', NotificationCtrl);

    NotificationCtrl.$inject = ['$scope'];

    function NotificationCtrl($scope) {
        var vm = this;
    }
})();
