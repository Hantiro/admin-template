;(function () {
    angular
        .module('app')
        .controller('ClinicDetailCtrl', ClinicDetailCtrl);

    /* @ngInject */
    function ClinicDetailCtrl(clinic_info) {
        var vm = this;
        vm.clinic = clinic_info;
    }
})();