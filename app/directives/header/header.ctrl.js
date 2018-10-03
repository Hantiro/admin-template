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
        vm.menu = {
            full: [
                {
                    id: 0,
                    view: 'app.my-main',
                    title: 'my calendar'
                },
                {
                    id: 1,
                    view: 'app.pregnancy',
                    title: 'pregnancy calculator'
                },
                {
                    id: 2,
                    view: 'app.main.mikvahs',
                    title: 'mikvahs',
                    trans: 'CONTENT.MIKVAHS'
                },
                {
                    id: 3,
                    view: 'app.main.tradition',
                    title: 'tradition',
                    trans: 'CONTENT.TRADITION'
                },
                {
                    id: 4,
                    view: 'app.main.rabbi',
                    title: 'ask the rabbi',
                    trans: 'CONTENT.ASK_RABBI'
                }
            ],
            simple: [
                {
                    id: 0,
                    view: 'app.main.contact-us',
                    title: 'contact us',
                    trans: 'CONTENT.CONTACT_US'
                },
                {
                    id: 1,
                    view: 'app.main.mikvahs',
                    title: 'mikvahs',
                    trans: 'CONTENT.MIKVAHS'
                },
                {
                    id: 2,
                    view: 'app.main.tradition',
                    title: 'tradition',
                    trans: 'CONTENT.TRADITION'
                }
            ]
        };

        function setLang(lang) {
            vm.currentLang = lang;
            $translate.use(lang);
        }
    }
})();
