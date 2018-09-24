;(function () {
    angular
        .module('app')
        .controller('MyMainCtrl', MyMainCtrl);

    /* @ngInject */
    function MyMainCtrl($transitions, authSvc, userSvc, pagesSvc) {
        var vm = this;
        vm.updateModel = updateModel;
        vm.updateSelected = updateSelected;
        vm.chActivTab = chActivTab;
        vm.isSelectTime = true;
        vm.calendarModel = {};
        vm.tabModel = {
            'activeA': 'pill', // 'calendar' or 'pill'
            'activeB': 'notification' // 'history' or 'notification'
        };

        init();
        function init(){
        }

        function chActivTab(type, active){
            vm.tabModel[type] = active;
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