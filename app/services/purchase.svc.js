;(function () {
    'use strict';

    angular.module('service.purchaseSvc', []).factory('purchaseSvc', purchaseSvc);

    /* @ngInject */
    function purchaseSvc(http, url) {
        var model = {
            createPurchasePlan: createPurchasePlan,
            getPurchase: getPurchase
        };
        return model;

        function createPurchasePlan(data) {
            return http.post(url.purchase_plan.create, data);
        }

        function getPurchase() {
            return http.get(url.purchase_plan.get)
        }

    }
})();