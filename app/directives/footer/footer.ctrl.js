;(function () {
    'use strict';

    angular
        .module('app')
        .controller('FooterCtrl', FooterCtrl);

    /* @ngInject */
    function FooterCtrl($scope, authDataSvc, authExtSvc, $translate) {
        var vm = this;
        vm.isAuth = authDataSvc.isLogined;
        vm.signUp = authExtSvc.signUpProcess;
        vm.login = authExtSvc.loginProcess;
        vm.logout = authExtSvc.logoutAsk;
        vm.setLang = setLang;
        vm.currentLang =  $translate.use();
        vm.allLang = $translate.getAvailableLanguageKeys();

        function setLang(lang){
            vm.currentLang = lang;
            $translate.use(lang);
        }
    }
})();
