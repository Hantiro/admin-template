;(function () {
    angular.module('directives.notification', [])
        .directive('notification', notification);

    /* @ngInject */
    function notification($document, $timeout) {
        return {
            restrict: 'E',
            templateUrl: './directives/notification/notification.html',
            replace: true,
            controller: 'NotificationCtrl',
            controllerAs: 'vm',
            scope: {}
        };
    }
})();
