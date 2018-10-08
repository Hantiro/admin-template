;(function () {
    angular
        .module('app')
        .controller('MikvahsCtrl', MikvahsCtrl);

    /* @ngInject */
    function MikvahsCtrl(authSvc, userSvc) {
        var vm = this;
        vm.test = '<h2>Test</h2>';
        init();
        function init(){

        }
    }
})();