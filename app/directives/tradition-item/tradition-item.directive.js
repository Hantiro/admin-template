;(function () {
    angular.module('directives.traditionItem', [])
        .directive('traditionItem', traditionItem);

    traditionItem.$inject = ['$document', '$timeout'];

    function traditionItem($document, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'directives/tradition-item/tradition-item.html',
            replace: true,
            scope: {
                tTitle: '@',
                tDesc: '@'
            },
            controller: 'TraditionItemCtrl',
            controllerAs: 'vm',
        };
    }
})();
