;(function () {
    angular
        .module('app')
        .controller('StartPageCtrl', StartPageCtrl);

    /* @ngInject */
    function StartPageCtrl(authSvc, userSvc) {
        var vm = this;
        init();
        function init(){

        }
    }
})();