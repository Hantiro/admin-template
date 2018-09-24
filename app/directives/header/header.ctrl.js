;(function () {
    'use strict';

    angular
        .module('app')
        .controller('HeaderCtrl', HeaderCtrl);

    /* @ngInject */
    function HeaderCtrl($scope, authSvc, authExtSvc, authDataSvc, $translate) {
        var vm = this;
        vm.isAuth = authDataSvc.isLogined;
        vm.signUp = authExtSvc.signUpProcess;
        vm.login = authExtSvc.loginProcess;
        vm.user = authDataSvc.getUser;
        vm.setLang = setLang;
        vm.currentLang = $translate.use();
        vm.allLang = $translate.getAvailableLanguageKeys();

        function setLang(lang) {
            vm.currentLang = lang;
            $translate.use(lang);
        }
    }
})();
