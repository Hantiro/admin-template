;(function () {
    angular
        .module('app')
        .controller('TermsCtrl', TermsCtrl);

    /* @ngInject */
    function TermsCtrl(clinics, clinic_countries) {
        var vm = this;
        vm.clinics = clinics;
        vm.clinic_countries = clinic_countries;
        vm.count_clinic = 0;
        init();

        function init() {
            if(vm.clinics && vm.clinics.length){
               vm.count_clinic = vm.clinics.length;
            }
        }
    }
})();