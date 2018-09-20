;(function () {
    angular
        .module('app')
        .controller('TermsCtrl', TermsCtrl);

    /* @ngInject */
    function TermsCtrl(clinics, clinic_countries) {
        var vm = this;
        init();
    }
})();