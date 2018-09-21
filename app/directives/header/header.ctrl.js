;(function () {
    'use strict';

    angular
        .module('app')
        .controller('HeaderCtrl', HeaderCtrl);

    /* @ngInject */
    function HeaderCtrl($scope, authSvc, authExtSvc) {
        var vm = this;
        vm.isAuth = authSvc.isLogined;
        vm.signUp = authExtSvc.signUpProcess;
        vm.login = authExtSvc.loginProcess;
    }
})();
