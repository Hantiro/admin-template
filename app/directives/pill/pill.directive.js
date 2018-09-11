;(function () {
    angular.module('directives.pill', [])
        .directive('pill', pill);

    pill.$inject = ['$document', '$timeout'];

    function pill($document, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'directives/pill/pill.html',
            replace: true,
            controller: 'PillCtrl',
            controllerAs: 'vm',
        };
    }
})();
