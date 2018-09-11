;(function () {
    angular.module('directives.header', [])
        .directive('header', header);

    header.$inject = ['$document', '$timeout'];

    function header($document, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'directives/header/header.html',
            replace: true,
            controller: 'HeaderCtrl',
            controllerAs: 'vm',
        };
    }
})();
