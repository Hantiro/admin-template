;(function () {
    angular.module('directives.history', [])
        .directive('history', history);

    /* @ngInject */
    function history($document, $timeout) {
        return {
            restrict: 'E',
            templateUrl: './directives/history/history.html',
            replace: true,
            controller: 'HistoryCtrl',
            controllerAs: 'vm',
            scope: {}
        };
    }
})();
