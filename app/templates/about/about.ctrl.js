;(function () {
    angular
        .module('app')
        .controller('AboutCtrl', AboutCtrl);

    /* @ngInject */
    function AboutCtrl(authSvc, $state, toastr, userSvc) {
        var vm = this;
        vm.user = {
        };
    }
})();