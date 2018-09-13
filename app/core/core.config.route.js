;(function () {
    'use strict';
    angular
        .module('app')
        .config(mainConfig);

    /* @ngInject */
    function mainConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('start-page');

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm'
            })
            .state('start-page', {
                url: '/start-page',
                templateUrl: 'templates/start-page/start-page.html',
                controller: 'StartPageCtrl',
                controllerAs: 'vm'
            })
            // .state('app', {
            //     url: '/',
            //     templateUrl: 'templates/app/app.html',
            //     controller: 'AppCtrl',
            //     controllerAs: 'vm'
            // })
            // .state('app.users', {
            //     url: 'users',
            //     templateUrl: 'templates/users/users.html',
            //     controller: 'UsersCtrl',
            //     controllerAs: 'vm',
            //     resolve: {
            //         /* @ngInject */
            //         dentists: function (dentistSvc) {
            //             return dentistSvc.getAllDentist().then(function (res) {
            //                 return res;
            //             });
            //         },
            //         /* @ngInject */
            //         amount_dentist: function (dentistSvc) {
            //             return dentistSvc.getAmountDentist().then(function (res) {
            //                 return res;
            //             });
            //         }
            //     }
            // })
            // .state('app.dentist_detail', {
            //     url: 'dentist-detail/{id}',
            //     templateUrl: 'templates/dentist-detail/dentist-detail.html',
            //     controller: 'DentistDetailCtrl',
            //     params: {id: null},
            //     controllerAs: 'vm',
            //     resolve: {
            //         /* @ngInject */
            //         dentist_info: function ($stateParams, userSvc) {
            //             if ($stateParams.id) {
            //                 return userSvc.getUser($stateParams.id).then(function (res) {
            //                     return res.user
            //                 });
            //             } else {
            //                 return;
            //             }
            //         }
            //     }
            // })
            // .state('app.laws', {
            //     url: 'laws',
            //     templateUrl: 'templates/laws/laws.html',
            //     controller: 'LawsCtrl',
            //     controllerAs: 'vm',
            //     resolve: {
            //         /* @ngInject */
            //         patients: function (patientSvc) {
            //             return patientSvc.getAllPatient().then(function (res) {
            //                 return res;
            //             });
            //         },
            //         /* @ngInject */
            //         amount_patient: function (patientSvc) {
            //             return patientSvc.getAmountPatient().then(function (res) {
            //                 return res;
            //             });
            //         }
            //     }
            // })
            // .state('app.patient_detail', {
            //     url: 'patient-detail/{id}',
            //     templateUrl: 'templates/patient-detail/patient-detail.html',
            //     controller: 'PatientDetailCtrl',
            //     params: {id: null},
            //     controllerAs: 'vm',
            //     resolve: {
            //         /* @ngInject */
            //         patient_info: function ($stateParams, userSvc) {
            //             if ($stateParams.id) {
            //                 return userSvc.getUser($stateParams.id).then(function (res) {
            //                     return res.user
            //                 });
            //             }
            //         }
            //     }
            // })
            // .state('app.terms', {
            //     url: 'terms',
            //     templateUrl: 'templates/terms/terms.html',
            //     controller: 'TermsCtrl',
            //     controllerAs: 'vm',
            //     resolve: {
            //         /* @ngInject */
            //         clinics: function (clinicsSvc) {
            //             return clinicsSvc.getAllClinic().then(function (res) {
            //                 return res;
            //             });
            //         },
            //         /* @ngInject */
            //         clinic_countries: function (clinicsSvc) {
            //             return clinicsSvc.getAmountClinic().then(function (res) {
            //                 return res;
            //             });
            //         }
            //     }
            // })
            // .state('app.feedback-msg', {
            //     url: 'feedback-msg',
            //     templateUrl: 'templates/feedback-msg/feedback-msg.html',
            //     controller: 'FeedbackMsgCtrl',
            //     controllerAs: 'vm',
            //     resolve: {
            //         /* @ngInject */
            //         specialities: function (specSvc) {
            //             return specSvc.getAllSpec().then(function (res) {
            //                 return res;
            //             });
            //         }
            //     }
            // })
            // .state('app.clinic_detail', {
            //     url: 'clinic-detail/{id}',
            //     templateUrl: 'templates/clinic-detail/clinic-detail.html',
            //     controller: 'ClinicDetailCtrl',
            //     params: {id: null},
            //     controllerAs: 'vm',
            //     resolve: {
            //         /* @ngInject */
            //         clinic_info: function ($stateParams, clinicsSvc) {
            //             if ($stateParams.id) {
            //                 return clinicsSvc.getClinic($stateParams.id).then(function (res) {
            //                     return res
            //                 });
            //             } else {
            //                 return;
            //             }
            //         }
            //     }
            // })
            // .state('app.purchase', {
            //     url: 'purchase',
            //     templateUrl: 'templates/purchase/purchase.html',
            //     controller: 'PurchaseCtrl',
            //     controllerAs: 'vm',
            //     resolve: {
            //         /* @ngInject */
            //         purchases: function (purchaseSvc) {
            //             return purchaseSvc.getPurchase().then(function (res) {
            //                 return res;
            //             });
            //         }
            //     }
            // })
            // .state('app.text', {
            //     url: 'text',
            //     templateUrl: 'templates/text/text.html',
            //     controller: 'TextCtrl',
            //     controllerAs: 'vm'
            // })

    }
})();

