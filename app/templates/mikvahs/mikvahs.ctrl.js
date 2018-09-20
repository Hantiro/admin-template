;(function () {
    angular
        .module('app')
        .controller('MikvahsCtrl', MikvahsCtrl);

    /* @ngInject */
    function MikvahsCtrl(authSvc, $state, toastr, userSvc) {
        var vm = this;
        vm.user = {
        };
    }
})();