;(function () {
    angular
        .module('app')
        .controller('PregnancyCtrl', PregnancyCtrl);

    /* @ngInject */
    function PregnancyCtrl($scope,gestationSvc,dateSvc) {
        var vm = this;
        vm.editStartDate = editStartDate;
        vm.dateBirthday = '';
        vm.model = {};


        $scope.$on(dateSvc.CALENDAR_EVENT.SELECTED_CALENDAR,function(event,data){
            vm.model = data.day;
            editStartDate();
        });

        init();

        function init() {
            getDate();
        }

        function editStartDate() {
            gestationSvc.create({
                g_day: vm.model.gregorian_day,
                g_month: vm.model.gregorian_month,
                g_year: vm.model.gregorian_year,
            }).then(function(){
                dateSvc.updateCalendar();
                init();
            });
        }

        function getDate() {
            gestationSvc.get().then(function (res) {
                vm.dateBirthday = res;
            })
        }
    }
})();