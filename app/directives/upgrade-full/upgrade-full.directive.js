;(function () {
    angular.module('directives.upgradeFull', [])
        .directive('upgradeFull', upgradeFull);

    /* @ngInject */
    function upgradeFull($document, $timeout) {
        return {
            restrict: 'E',
            templateUrl: './directives/upgrade-full/upgrade-full.html',
            replace: true,
            controller: 'UpgradeFullCtrl',
            controllerAs: 'vm',
            scope: {}
        };
    }
})();
