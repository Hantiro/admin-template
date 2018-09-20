;(function () {
    angular
        .module('app')
        .controller('MainCtrl', MainCtrl);

    /* @ngInject */
    function MainCtrl(authSvc, $state, toastr, userSvc) {
        var vm = this;
        vm.user = {
        };
    }
})();