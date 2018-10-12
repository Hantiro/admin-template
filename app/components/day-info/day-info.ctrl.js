;(function () {
    angular
        .module('app')
        .controller('DayInfoCtrl', DayInfoCtrl);

    /* @ngInject */
    function DayInfoCtrl($uibModalInstance, dateSvc, day) {
        var vm = this;
        vm.day = day;
        vm.EVENT_IMG = dateSvc.EVENT_IMG;

        vm.ok = function () {
            $uibModalInstance.close(true);
        };
        vm.cancel = function () {
            $uibModalInstance.dismiss(false);
        };
    }
})();