;(function () {
    angular.module('directives.header', [])
        .directive('header', header);

    /* @ngInject */
    function header($document, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'directives/header/header.html',
            replace: true,
            scope: {
                hLang: '@',
                hUser: '@'
            },
            controller: 'HeaderCtrl',
            controllerAs: 'vm',
        };
    }
})();
