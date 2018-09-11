;(function () {
    angular.module('directives.footer', [])
        .directive('footer', footer);

    footer.$inject = ['$document', '$timeout'];

    function footer($document, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'directives/footer/footer.html',
            replace: true,
            controller: 'FooterCtrl',
            controllerAs: 'vm',
        };
    }
})();
