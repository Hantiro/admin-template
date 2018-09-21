;(function () {
    angular.module('directives.infoBlock', [])
        .directive('infoBlock', infoBlock);

    /* @ngInject */
    function infoBlock($document, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'directives/info-block/info-block.html',
            replace: true,
            scope: {
                ibType: '@', //'default' - only with text, 'pregnancy' - with pregnancy image and date
                ibText: '@',
                ibSubText:'@',
                ibDate: '@',
                ibIsEdit: '='
            },
            controller: 'InfoBlockCtrl',
            controllerAs: 'vm',
        };
    }
})();
