;(function () {
    angular.module('directives.deleteEvent', [])
        .directive('deleteEvent', deleteEvent);

    /* @ngInject */
    function deleteEvent($document, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'directives/delete-event/delete-event.html',
            replace: true,
            controller: 'DeleteEventCtrl',
            controllerAs: 'vm',
            scope: {}
        };
    }
})();
