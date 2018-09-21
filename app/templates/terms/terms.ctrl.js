;(function () {
    angular
        .module('app')
        .controller('TermsCtrl', TermsCtrl);

    /* @ngInject */
    function TermsCtrl(terms) {
        var vm = this;
        vm.terms = terms;

        init();
        function init(){

        }
    }
})();