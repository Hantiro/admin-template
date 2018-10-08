;(function () {
    'use strict';

    angular
        .module('app')
        .controller('MenuCustomCtrl', MenuCustomCtrl);

    /* @ngInject */
    function MenuCustomCtrl($scope, $rootScope, authSvc, authExtSvc, authDataSvc, $translate) {
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
                    view: 'app.main.mikvahs',
                    title: 'mikvahs',
                    trans: 'CONTENT.MIKVAHS'
                },
                {
                    id: 2,
                    view: 'app.main.tradition',
                    title: 'halacot',
                    trans: 'CONTENT.HALACOT'
                }
            ]
        };
        $scope.status = {
            isopen: false
        };
        $scope.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };

        $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));

        function setLang(lang) {
            vm.currentLang = lang;
            $translate.use(lang);
        }

        var eventTranslateEnd = $rootScope.$on('$translateChangeEnd',function(e,d){
            vm.currentLang =  $translate.use();
        });

        $scope.$on('$destroy', function () {
            eventTranslateEnd();
        });
    }
})();
