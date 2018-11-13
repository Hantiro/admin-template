;(function () {
    angular
        .module('app')
        .controller('DayInfoCtrl', DayInfoCtrl);

    /* @ngInject */
    function DayInfoCtrl($uibModalInstance, dateSvc, constSvc, day) {
        var vm = this;
        vm.day = day;
        vm.partDayImg = constSvc.eventIconPath(day.events.bottom);
        vm.getTypeTrans = getTypeTrans;

        vm.ok = function () {
            $uibModalInstance.close(true);
        };
        vm.cancel = function () {
            $uibModalInstance.dismiss(false);
        };

        function getTypeTrans(item){
            return  'CONTENT.PREDICTION_' + item.prediction_type.toUpperCase() + ((item.skip > 0 && '_SKIP') || (item.skip < 0 && '_SKIP_BACKWARDS') || '');
        }
    }
})();