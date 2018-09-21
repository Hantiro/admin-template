;(function () {
    'use strict';

    angular
        .module('app')
        .controller('HeaderCtrl', HeaderCtrl);

    /* @ngInject */
    function HeaderCtrl($scope, authSvc, authExtSvc, authDataSvc) {
        var vm = this;
        vm.isAuth = authDataSvc.isLogined;
        vm.signUp = authExtSvc.signUpProcess;
        vm.login = authExtSvc.loginProcess;
        vm.user = authDataSvc.getUser;
    }
})();
