;(function () {
    angular.module('directives.infoBlock', [])
        .directive('infoBlock', infoBlock);

        infoBlock.$inject = ['$document', '$timeout'];

    function infoBlock($document, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'directives/info-block/info-block.html',
            replace: true,
            scope: {
                ibType: '@' //'default' - only with text, 'pregnancy' - with pregnancy image and date
            },
            controller: 'InfoBlockCtrl',
            controllerAs: 'vm',
        };
    }
})();
