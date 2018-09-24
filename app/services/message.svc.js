;(function () {
    'use strict';

    angular
        .module('service.messagesSvc', [])
        .factory('messagesSvc', messagesSvc);

    /* @ngInject */
    function messagesSvc($translate, toastr, $q) {
        var model = {
            show: show,
            toastr: toastr
        };

        return model;

        /**
         * Show toastr with translate
         * @param {String} key - key in object translate for example 'CONTENT.MENU_HOME'
         * @param {String} type - type of toastr message for example 'error', 'success',
         * @param {Object} config - config for toastr
         */
        function show(key, type, config) {
            var defered = $q.defer();
            var cfg = config || {};
            if (key && type && (type === 'error' || type === 'success' || type === 'info' || type === 'warning')) {
                return $translate(key).then(function(translation)  {
                        toastr[type](translation, null, cfg);
                        defered.resolve(translation);
                    },
                    function(translationId) {
                        console.log(translationId);
                        defered.reject('Error with params');
                    });
            } else {
                defered.reject('Error with params');
            }
            return defered.promise;
        }

    }
})();