;(function () {
    angular.module('directives.legend', [])
        .directive('legend', legend);

    /* @ngInject */
    function legend($document, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'directives/legend/legend.html',
            replace: true,
            controller: 'LegendCtrl',
            controllerAs: 'vm',
        };
    }
})();
