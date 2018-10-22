;(function () {
    angular
        .module('factory.url', [])
        .factory('url', [
            function () {
                var baseUrl = 'http://mahsevon.grassbusinesslabs.tk/api/';

                return {
                    event: {
                        remove: baseUrl + 'event/'
                    },

                    add_info: {
                        getByName: baseUrl + 'addition-information/by-name',
                    },
                    text: {
                        terms: baseUrl + 'license-agreements/terms',
                        faq: baseUrl + 'license-agreements/faq',
                        about: baseUrl + 'license-agreements/about'
                    },

                    books: {
                        get: baseUrl + 'books',
                        update: baseUrl + 'books/update',
                        create: baseUrl + 'books/create',
                        delete: baseUrl + 'books/delete',
                    },

                    calendar: {
                        month: baseUrl + 'month',
                        create_event: baseUrl + 'event',
                        create_event_history: baseUrl + 'store-from-list',
                        delete_last_event: baseUrl + 'destroy',
                        getList: baseUrl + 'list'
                    },

                    pill: {
                        create: baseUrl + 'pills',
                        delete_last: baseUrl + 'destroy-pills'
                    },

                    gestation: {
                        create: baseUrl + 'gestation',
                        get: baseUrl + 'gestation-date',
                        delete: baseUrl + 'destroy-gestation'
                    },

                    auth: {
                        login: baseUrl + 'login',
                        sendPhone: baseUrl + 'send-phone',
                        sendCode: baseUrl + 'send-code',
                        signUp: baseUrl + 'new-user',
                        resetPassword: baseUrl + 'reset-password',
                    },

                    settings: {
                        contactUs: baseUrl + 'mail',
                        comments: baseUrl + 'laws',
                        terms: baseUrl + 'license-agreements',
                        getAllSettings: baseUrl + 'religion-settings'
                    },

                    notificationSettings: {
                        setToken: baseUrl + 'set-device',
                        settings: baseUrl + 'notification'

                    },

                    user: {
                        view: baseUrl + 'user',
                        update: baseUrl + 'user',
                        updatePassword: baseUrl + 'change-password',
                        userSettings: baseUrl + 'setting'
                    },

                    notification: {
                        my: baseUrl + 'notification/my',
                        all: baseUrl + 'notifications',
                    }
                }
            }]);
})();
