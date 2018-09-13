;(function () {
    angular
        .module('app')
        .controller('StartPageCtrl', StartPageCtrl);

    /* @ngInject */
    function StartPageCtrl(authSvc, $state, toastr, userSvc) {
        var vm = this;
        vm.user = {
        };
    }
})();