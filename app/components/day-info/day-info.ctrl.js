;(function () {
    angular
        .module('app')
        .controller('DayInfoCtrl', DayInfoCtrl);

    /* @ngInject */
    function DayInfoCtrl($uibModalInstance, dateSvc, day, constSvc) {
        var vm = this;
        vm.day = day;
        vm.EVENT_IMG = constSvc.EVENT_IMG;

        vm.ok = function () {
            $uibModalInstance.close(true);
        };
        vm.cancel = function () {
            $uibModalInstance.dismiss(false);
        };
    }
})();