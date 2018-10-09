;(function () {
    'use strict';

    angular
        .module('app')
        .controller('HeaderCtrl', HeaderCtrl);

    /* @ngInject */
    function HeaderCtrl($scope, $rootScope, authSvc, authExtSvc, authDataSvc, $translate, $state, textSvc) {
        var vm = this;
        vm.isAuth = authDataSvc.isLogined;
        vm.signUp = authExtSvc.signUpProcess;
        vm.login = authExtSvc.loginProcess;
        vm.user = authDataSvc.getUser;
        vm.setLang = setLang;
        vm.click = click;
        vm.currentLang = $translate.use().toUpperCase();
        vm.allLang = $translate.getAvailableLanguageKeys().map(function (el, index, arr) {
            return el.toUpperCase();
        });

        init();
        function init() {
            getMikvahsLink().then(function (res) {
                defaultMenu({
                    mikvahs_link: res.value
                });
            });
        }

        function getMikvahsLink() {
            return textSvc.getByNameArr(['link_mikvahs']).then(function (res) {
                    return res.data.link_mikvahs;
            });
        }

        function defaultMenu(conf) {
            var config = conf || {};
            vm.menu = {
                full: [
                    {
                        id: 0,
                        view: 'app.my-main',
                        title: 'my calendar',
                        trans: 'CONTENT.CALENDAR'
                    },
                    {
                        id: 1,
                        view: 'app.pregnancy',
                        title: 'pregnancy calculator',
                        trans: 'CONTENT.PREGNANCY_CALCULATOR'
                    },
                    {
                        id: 2,
                        title: 'mikvahs',
                        trans: 'CONTENT.MIKVAHS',
                        link: config.mikvahs_link || ''
                    },
                    {
                        id: 3,
                        view: 'app.main.tradition',
                        title: 'halacot',
                        trans: 'CONTENT.HALACOT'
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
                        title: 'mikvahs',
                        trans: 'CONTENT.MIKVAHS',
                        link: config.mikvahs_link || ''
                    },
                    {
                        id: 2,
                        view: 'app.main.tradition',
                        title: 'halacot',
                        trans: 'CONTENT.HALACOT'
                    }
                ]
            };
        }

        function setLang(lang) {
            // vm.currentLang = lang;
            $translate.use(lang);
        }

        function click(item) {
            if(item.view){
                $state.go(item.view);
            }
        }



        var eventTranslateEnd = $rootScope.$on('$translateChangeEnd',function(e,d){
            vm.currentLang =  $translate.use().toUpperCase();
        });

        $scope.$on('$destroy', function () {
            eventTranslateEnd();
        });
    }
})();
