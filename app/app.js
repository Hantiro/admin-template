;(function () {
    angular.module('app',
        ['app.core',
            'app.directives',
            'app.factory',
            'app.services',
            'app.filters'
        ]).run(runBlock);

    /* @ngInject */
    function runBlock($timeout, authSvc, $rootScope, $state) {

        $state.go('start-page');
        // $timeout(function(){
        //     authSvc.processAutoLogin();
        // });
        //
        // $rootScope.$on('$stateChangeStart', function (event, toState) {
        //     authSvc.checkLogin();
        // });
    }
})();