;(function () {
    angular
        .module('app')
        .controller('MyMainCtrl', MyMainCtrl);

    /* @ngInject */
    function MyMainCtrl(authSvc,  userSvc) {
        var vm = this;
        vm.updateModel = updateModel;
        vm.updateSelected = updateSelected;
        vm.isSelectTime = true;
        vm.calendarModel = {};

        init();
        function init(){

        }

        function updateModel(res) {
            if (res) {
                vm.calendarModel = res;
            }
        }

        function updateSelected(res) {
            if (res.selected && res.month) {
                dateSvc.createRedDay(res.selected, res.month).then(function (res) {
                    dateSvc.updateCalendar();
                });
            }
        }

    }
})();