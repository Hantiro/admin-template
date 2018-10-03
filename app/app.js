;(function () {
    angular.module('app',
        ['app.core',
            'app.directives',
            'app.factory',
            'app.services',
            'app.filters'
        ]).run(runBlock);

    /* @ngInject */
    function runBlock($timeout, authDataSvc, $rootScope, $state, $transitions, pagesSvc, modalSvc) {

        // $state.go('app.start-page');
        // $timeout(function(){
        //     authSvc.processAutoLogin();
        // });
        //


        $transitions.onBefore({}, function(transition) {
            // check if the state should be auth
            if ( transition.to().data && transition.to().data.auth && !authDataSvc.isLogined()) {
                // redirect to the 'login' state
                return transition.router.stateService.target('app.start-page');
            }
        });

        $transitions.onFinish({}, function (transition) {
            pagesSvc.setCurrentName(
                transition.to().data && transition.to().data.trans_name ?  transition.to().data.trans_name : '');
        });
    }
})();