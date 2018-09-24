;(function () {
    angular
        .module('app')
        .controller('FaqCtrl', FaqCtrl);

    /* @ngInject */
    function FaqCtrl(authSvc, userSvc) {
        var vm = this;
        init();

        function init() {

        }
    }
})();