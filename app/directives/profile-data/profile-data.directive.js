;(function () {
    angular.module('directives.profileData', [])
        .directive('profileData', profileData);

    /* @ngInject */
    function profileData($document, $timeout) {
        return {
            restrict: 'E',
            templateUrl: './directives/profile-data/profile-data.html',
            replace: true,
            scope: {
                pdMode: '@', //reg or update,
                pdOptions: '='
            },
            controller: 'ProfileDataCtrl',
            controllerAs: 'vm',
            link: function(scope) {
            }
        };
    }
})();
