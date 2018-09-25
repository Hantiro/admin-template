;(function () {
    angular
        .module('app')
        .controller('PrivacyCtrl', PrivacyCtrl);

    /* @ngInject */
    function PrivacyCtrl(terms) {
        var vm = this;
        vm.terms = terms;

        init();
        function init(){

        }
    }
})();