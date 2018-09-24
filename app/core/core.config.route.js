;(function () {
    'use strict';
    angular
        .module('app')
        .config(mainConfig);

    /* @ngInject */
    function mainConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/start-page');

        $stateProvider
            .state('app', {
                url: '/',
                abstract: true,
                templateUrl: 'templates/app/app.html',
                controller: 'AppCtrl',
                controllerAs: 'vm',
                resolve: {
                    translateReady: ['$translate', function ($translate) {
                        return $translate.onReady();
                    }]
                }
            })
            .state('app.start-page', {
                url: 'start-page',
                templateUrl: 'templates/start-page/start-page.html',
                controller: 'StartPageCtrl',
                controllerAs: 'vm'
            })
            .state('app.main', {
                url: 'main',
                templateUrl: 'templates/main/main.html',
                controller: 'MainCtrl',
                controllerAs: 'vm'
            })
            .state('app.my-main', {
                url: 'my-main',
                data: {
                  auth: true
                },
                templateUrl: 'templates/my-main/my-main.html',
                controller: 'MyMainCtrl',
                controllerAs: 'vm'
            })
            .state('app.main.about', {
                url: '/about',
                data: {
                  trans_name: 'CONTENT.ABOUT'
                },
                templateUrl: 'templates/about/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'vm'
            })
            .state('app.main.contact-us', {
                url: '/contact-us',
                data: {
                    trans_name: 'CONTENT.CONTACT_US'
                },
                templateUrl: 'templates/contact-us/contact-us.html',
                controller: 'ContactUsCtrl',
                controllerAs: 'vm'
            })
            .state('app.main.mikvahs', {
                url: '/mikvahs',
                data: {
                    trans_name: 'CONTENT.MIKVAHS'
                },
                templateUrl: 'templates/mikvahs/mikvahs.html',
                controller: 'MikvahsCtrl',
                controllerAs: 'vm'
            })
            .state('app.main.faq', {
                url: '/faq',
                data: {
                    trans_name: 'CONTENT.FAQ'
                },
                templateUrl: 'templates/faq/faq.html',
                controller: 'FaqCtrl',
                controllerAs: 'vm'
            })
            .state('app.main.rabbi', {
                url: '/rabbi',
                data: {
                    trans_name: 'CONTENT.ASK_RABBI'
                },
                templateUrl: 'templates/rabbi/rabbi.html',
                controller: 'RabbiCtrl',
                controllerAs: 'vm'
            })
            .state('app.main.profile', {
                url: '/profile',
                templateUrl: 'templates/profile/profile.html',
                controller: 'ProfileCtrl',
                controllerAs: 'vm'
            })
            .state('app.main.terms', {
                url: '/terms',
                data: {
                    trans_name: 'CONTENT.TERMS_CONDITIONS'
                },
                templateUrl: 'templates/terms/terms.html',
                controller: 'TermsCtrl',
                controllerAs: 'vm',
                resolve: {
                    /* @ngInject */
                    terms: function (textSvc) {
                        return textSvc.getTerms()
                            .then(function (res) {
                                return res.entity || [];
                            })
                    }
                }
            })
            .state('app.main.tradition', {
                url: '/tradition',
                data: {
                    trans_name: 'CONTENT.TRADITION'
                },
                templateUrl: 'templates/tradition/tradition.html',
                controller: 'TraditionCtrl',
                controllerAs: 'vm',
                resolve: {
                    /* @ngInject */
                    traditions: function (traditionSvc) {
                        return traditionSvc.get()
                            .then(function (res) {
                                return res.entity || [];
                            })
                    }
                }
            })
    }
})();

