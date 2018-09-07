;(function () {
    angular
        .module('app')
        .controller('AppCtrl', AppCtrl);

    /* @ngInject */
    function AppCtrl($state, authSvc) {
        var vm = this;
        vm.logout = authSvc.logout;
        vm.toggleMenu = toggleMenu;
        vm.menuOpen = true;

        function toggleMenu(){
            vm.menuOpen = !vm.menuOpen;
        }
    }
})();