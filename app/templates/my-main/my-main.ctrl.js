;(function () {
    angular
        .module('app')
        .controller('MyMainCtrl', MyMainCtrl);

    /* @ngInject */
    function MyMainCtrl(authSvc,  userSvc) {
        var vm = this;
        init();
        function init(){

        }
    }
})();