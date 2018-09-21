;(function () {
    'use strict';

    angular
        .module('app')
        .controller('FooterCtrl', FooterCtrl);

    /* @ngInject */
    function FooterCtrl($scope, authDataSvc, authExtSvc) {
        var vm = this;
        vm.isAuth = authDataSvc.isLogined;
        vm.signUp = authExtSvc.signUpProcess;
        vm.login = authExtSvc.loginProcess;
        vm.logout = authExtSvc.logoutAsk;
    }
})();
