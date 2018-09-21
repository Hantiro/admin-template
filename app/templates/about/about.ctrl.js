;(function () {
    angular
        .module('app')
        .controller('AboutCtrl', AboutCtrl);

    /* @ngInject */
    function AboutCtrl(authSvc, userSvc) {
        var vm = this;
        init();

        function init() {

        }
    }
})();