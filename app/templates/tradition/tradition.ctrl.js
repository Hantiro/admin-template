;(function () {
    angular
        .module('app')
        .controller('TraditionCtrl', TraditionCtrl);

    /* @ngInject */
    function TraditionCtrl(clinics, clinic_countries) {
        var vm = this;
        vm.user = {
        };
    }
})();