;(function () {
    angular.module('directives.cycleScrollBlock', [])
        .directive('cycleScrollBlock', cycleScrollBlock);

    /* @ngInject */
    function cycleScrollBlock($document, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'directives/cycle-scroll-block/cycle-scroll-block.html',
            replace: true,
            controller: 'CycleScrollBlockCtrl',
            controllerAs: 'vm',
            scope: {}
        };
    }
})();
