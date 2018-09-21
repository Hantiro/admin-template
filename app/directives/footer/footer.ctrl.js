;(function () {
    'use strict';

    angular
        .module('app')
        .controller('FooterCtrl', FooterCtrl);

    /* @ngInject */
    function FooterCtrl($scope, authSvc) {
        var vm = this;
        vm.isAuth = authSvc.isLogined;
    }
})();
