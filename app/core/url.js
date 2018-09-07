;(function () {
    angular
        .module('factory.url', [])
        .factory('url', [
            function () {
                var baseUrl = 'http://denta.grassbusinesslabs.tk/api/';

                return {
                    push: {
                        test: baseUrl + 'test'
                    },
                    admin: {
                        login: baseUrl + 'admin/login'
                    },
                    static : {
                        share: baseUrl + 'static/sharing',
                        start_page: baseUrl + 'static/start',
                        privacy: baseUrl + 'static/privacy',
                        about: baseUrl + 'static/about',
                        terms: baseUrl + 'static/terms',
                        text: baseUrl + 'static/text/1'
                    },
                    question: baseUrl + 'question',
                    user: {
                        remove: baseUrl + 'user/remove',
                        id: baseUrl + 'user/'
                    },
                    amount: {
                        dentists: baseUrl + 'amount/dentists',
                        patients: baseUrl + 'amount/patients',
                        clinics: baseUrl + 'amount/terms'
                    },
                    purchase_plan: {
                        create: baseUrl + 'purchase-plan/create',
                        get: baseUrl + 'purchase-plan/get'
                    },
                    dentists: baseUrl + 'dentists',
                    patients: baseUrl + 'patients',
                    clinics: baseUrl + 'clinics',
                    clinic_id: baseUrl + 'clinic/',
                    specialities: baseUrl + 'specialties',
                    specialty: baseUrl + 'specialty'
                };
            }
        ]);
})();
