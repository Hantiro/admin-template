;(function () {
    angular.module('directives.menuCustom', [])
        .directive('menuCustom', menuCustom);

    /* @ngInject */
    function menuCustom($document, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'directives/menu-custom/menu-custom.html',
            replace: true,
            controller: 'MenuCustomCtrl',
            controllerAs: 'vm',
            scope: {}
        }
    }
})();
