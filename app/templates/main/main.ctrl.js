;(function () {
    angular
        .module('app')
        .controller('MainCtrl', MainCtrl);

    /* @ngInject */
    function MainCtrl($transitions, authSvc, userSvc, pagesSvc) {
        var vm = this;
        vm.currentPageName = pagesSvc.getCurrentName;

        init();
        function init() {

        }
    }
})();