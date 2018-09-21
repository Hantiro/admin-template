;(function () {
    angular
        .module('app')
        .controller('AppCtrl', AppCtrl);

    /* @ngInject */
    function AppCtrl($state, authSvc) {
        var vm = this;
        init();
        function init(){

        }
    }
})();