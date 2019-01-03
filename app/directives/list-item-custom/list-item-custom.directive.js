;(function () {
    angular.module('directives.listItemCustom', [])
        .directive('listItemCustom', listItemCustom);

    listItemCustom.$inject = ['$document', '$timeout'];

    function listItemCustom($document, $timeout) {
        return {
            restrict: 'E',
            templateUrl: './directives/list-item-custom/list-item-custom.html',
            scope: {
                licModel: '=',
                licIsDay: '=',
                licDayPartText: '@',
                licDateText: '@',
                licTypePrediction: '@',
                licShowDel: '=',
                licUpdate: '='
            },
            controller: 'ListItemCustomCtrl',
            controllerAs: 'vm',
            link: function (scope, element, attrs) {

            }
        };
    }
})();
