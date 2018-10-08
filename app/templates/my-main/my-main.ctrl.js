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
            'activeA': null, // 'calendar' or 'pill'
            'activeB': 'history' // 'history' or 'notification'
        };

        init();
        function init(){
        }

        function chActivTab(type, active){
            vm.tabModel[type] = active;
            if(type === 'activeA'){
                vm.tabModel['activeB'] = null;
            } else {
                vm.tabModel['activeA'] = null;
            }
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