;(function () {
    angular
        .module('app')
        .controller('PrivacyCtrl', PrivacyCtrl);

    /* @ngInject */
    function PrivacyCtrl(licence) {
        var vm = this;
        vm.privacy = licence;

        init();
        function init(){

        }
    }
})();