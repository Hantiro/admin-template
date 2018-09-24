;(function () {
    angular
        .module('app')
        .controller('ProfileCtrl', ProfileCtrl);

    /* @ngInject */
    function ProfileCtrl(authSvc, userSvc) {
        var vm = this;
        init();
        function init(){

        }
    }
})();