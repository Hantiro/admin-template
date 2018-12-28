;(function () {
    'use strict';

    angular.module('service.paymentSvc', []).service('paymentSvc', paymentSvc);

    /* @ngInject */
    function paymentSvc(http, url) {
        var model = {
            getUrl: getUrl
        };

        function getUrl(){
            return http.get(url.payment.getUrl);
        }

        return model;
    }
})
();
