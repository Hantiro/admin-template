;(function () {
    'use strict';
    angular.module('filters.trusted', [])
        .filter('trusted', trusted);

    /* @ngInject */
    function trusted($sce) {
        return function (html) {
            return $sce.trustAsHtml(html)
        }
    }

})();