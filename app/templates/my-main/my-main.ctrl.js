;(function () {
    angular
        .module('app')
        .controller('MyMainCtrl', MyMainCtrl);

    /* @ngInject */
    function MyMainCtrl(authSvc, $state, toastr, userSvc) {
        var vm = this;
        vm.user = {
        };
    }
})();