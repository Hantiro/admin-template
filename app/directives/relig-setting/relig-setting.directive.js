;(function () {
    angular.module('directives.religSetting', [])
        .directive('religSetting', religSetting);

    /* @ngInject */
    function religSetting($document, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'directives/relig-setting/relig-setting.html',
            replace: true,
            scope: {
                mode: '@' //reg or update
            },
            controller: 'ReligSettingCtrl',
            controllerAs: 'vm',
        };
    }
})();
