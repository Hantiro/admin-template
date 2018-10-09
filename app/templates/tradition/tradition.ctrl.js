;(function () {
    angular
        .module('app')
        .controller('TraditionCtrl', TraditionCtrl);

    /* @ngInject */
    function TraditionCtrl($scope, traditions, traditionSvc) {
        var vm = this;
        vm.traditions = traditions;

        init();
        function init(  ){
            traditionSvc.get()
                .then(function (res) {
                    vm.traditions =  res.entity || [];
                });
        }

       $scope.$on('lang_changed',function (e,d) {
            init();
       });
    }
})();