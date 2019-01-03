;(function () {
    angular.module('directives.traditionItem', [])
        .directive('traditionItem', traditionItem);

    /* @ngInject */
    function traditionItem($document, $timeout) {
        return {
            restrict: 'E',
            templateUrl: './directives/tradition-item/tradition-item.html',
            replace: true,
            scope: {
                tiTitle: '@',
                tiDesc: '@',
                tiSubtitle: '@'
            },
            controller: 'TraditionItemCtrl',
            controllerAs: 'vm',
        };
    }
})();
