;(function () {
    angular
        .module('app')
        .controller('PatientDetailCtrl', PatientDetailCtrl);

    /* @ngInject */
    function PatientDetailCtrl(patient_info) {
        var vm = this;
        vm.user = patient_info;
    }
})();