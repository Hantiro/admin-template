;(function () {
    angular.module('directives.includeTemplate', [])
        .directive('includeTemplate', includeTemplate);

    /* @ngInject */
    function includeTemplate($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return scope.$eval(attrs.includeTemplate);
                }, function (value) {
                    element.html(value);
                    $compile(element.contents())(scope);
                });
            }
        };
    }
})();
