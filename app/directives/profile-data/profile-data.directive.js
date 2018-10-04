;(function () {
    angular.module('directives.profileData', [])
        .directive('profileData', profileData);

    /* @ngInject */
    function profileData($document, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'directives/profile-data/profile-data.html',
            replace: true,
            scope: {
                mode: '@' //reg or update
            },
            controller: 'ProfileDataCtrl',
            controllerAs: 'vm',
        };
    }
})();
