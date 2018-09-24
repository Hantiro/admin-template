;(function () {
    angular.module('directives.legend', [])
        .directive('legend', legend);

    /* @ngInject */
    function legend() {
        return {
            restrict: 'E',
            templateUrl: 'directives/legend/legend.html',
            controller: 'LegendCtrl',
            controllerAs: 'vm',
            scope: {}
        };
    }
})();
