;(function () {
    angular
        .module('app')
        .controller('TraditionCtrl', TraditionCtrl);

    /* @ngInject */
    function TraditionCtrl(traditions) {
        var vm = this;
        vm.traditions = traditions;

        init();
        function init(  ){

        }
    }
})();