;(function () {
    angular
        .module('app')
        .controller('DayInfoCtrl', DayInfoCtrl);

    /* @ngInject */
    function DayInfoCtrl($uibModalInstance, dateSvc, constSvc, day) {
        var vm = this;
        vm.day = day;
        vm.partDayImg = constSvc.eventIconPath(day.events.bottom);

        vm.ok = function () {
            $uibModalInstance.close(true);
        };
        vm.cancel = function () {
            $uibModalInstance.dismiss(false);
        };
    }
})();