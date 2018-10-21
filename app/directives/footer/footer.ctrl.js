;(function () {
    'use strict';

    angular
        .module('app')
        .controller('FooterCtrl', FooterCtrl);

    /* @ngInject */
    function FooterCtrl($scope, $rootScope, authDataSvc, authExtSvc, $translate, textSvc) {
        var vm = this;
        vm.isAuth = authDataSvc.isLogined;
        vm.signUp = authExtSvc.signUpProcess;
        vm.login = authExtSvc.loginProcess;
        vm.logout = authExtSvc.logoutAsk;
        vm.setLang = setLang;
        vm.currentLang = $translate.use().toUpperCase();
        vm.allLang = $translate.getAvailableLanguageKeys().map(function (el, index, arr) {
            return el.toUpperCase();
        });
        vm.links = {};

        init();
        function init() {
            getLinks();
        }

        function getLinks() {
            textSvc.getByNameArr(['facebook_link','google_link','twitter_link', 'instagram_link']).then(function (res) {
                angular.forEach(res.data, function (value, key) {
                    vm.links[key] = value.value;
                });
            });
        }

        function setLang(lang) {
            vm.currentLang = lang;
            $translate.use(lang);
        }

        var eventTranslateEnd = $rootScope.$on('$translateChangeEnd', function (e, d) {
            vm.currentLang = $translate.use().toUpperCase();
        });

        $scope.$on('$destroy', function () {
            eventTranslateEnd();
        });
    }
})();
