;(function () {
    angular
        .module('app')
        .controller('RabbiCtrl', RabbiCtrl);

    /* @ngInject */
    function RabbiCtrl(terms) {
        var vm = this;
        vm.terms = terms;

        init();
        function init(){

        }
    }
})();