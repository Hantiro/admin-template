;(function () {
    angular.module('directives.footer', [])
        .directive('footer', footer);

    /* @ngInject */
    function footer($document, $timeout) {
        return {
            restrict: 'E',
            templateUrl: './directives/footer/footer.html',
            replace: true,
            scope: {
                fLang: '@'
            },
            controller: 'FooterCtrl',
            controllerAs: 'vm',
        };
    }
})();
