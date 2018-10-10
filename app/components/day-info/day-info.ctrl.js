;(function () {
    angular
        .module('app')
        .controller('DayInfoCtrl', DayInfoCtrl);

    /* @ngInject */
    function DayInfoCtrl($uibModalInstance, config) {
        var vm = this;
        vm.config = config;

        vm.ok = function () {
            $uibModalInstance.close(true);
        };
        vm.cancel = function () {
            $uibModalInstance.dismiss(false);
        };
    }
})();