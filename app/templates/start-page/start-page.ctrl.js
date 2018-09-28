;(function () {
    angular
        .module('app')
        .controller('StartPageCtrl', StartPageCtrl);

    /* @ngInject */
    function StartPageCtrl(authExtSvc, userSvc) {
        var vm = this;
        vm.signUp = authExtSvc.signUpProcess;
        init();
        function init(){

        }
    }
})();