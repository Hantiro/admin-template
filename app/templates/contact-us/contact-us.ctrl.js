;(function () {
    angular
        .module('app')
        .controller('ContactUsCtrl', ContactUsCtrl);

    /* @ngInject */
    function ContactUsCtrl(authSvc, userSvc) {
        var vm = this;
        init();
        function init(){

        }
    }
})();