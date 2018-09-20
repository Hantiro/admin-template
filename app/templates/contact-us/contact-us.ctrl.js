;(function () {
    angular
        .module('app')
        .controller('ContactUsCtrl', ContactUsCtrl);

    /* @ngInject */
    function ContactUsCtrl(authSvc, $state, toastr, userSvc) {
        var vm = this;
        vm.user = {
        };
    }
})();