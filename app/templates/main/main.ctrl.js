;(function () {
    angular
        .module('app')
        .controller('MainCtrl', MainCtrl);

    /* @ngInject */
    function MainCtrl(authSvc, userSvc) {
        var vm = this;
        init();
        function init(){

        }
    }
})();