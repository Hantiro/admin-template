;(function () {
    angular.module('directives.notificationItem', [])
        .directive('notificationItem', notificationItem);

    notificationItem.$inject = ['$document', '$timeout'];

    function notificationItem($document, $timeout) {
        return {
            restrict: 'E',
            templateUrl: './directives/notification-item/notification-item.html',
            scope: {
                niItemModel: '=', //item from array with data from backend
                niModelExt: '=' //additional model with settings translation and notification translations
            },
            controller: 'NotificationItemCtrl',
            controllerAs: 'vm',
            link: function (scope, element, attrs) {
                scope.niModel = scope.niModel || {};
                scope.niModelExt = scope.niModelExt || {};
            }
        };
    }
})();
