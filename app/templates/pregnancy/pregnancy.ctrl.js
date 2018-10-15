;(function () {
    angular
        .module('app')
        .controller('PregnancyCtrl', PregnancyCtrl);

    /* @ngInject */
    function PregnancyCtrl($scope, gestationSvc, dateSvc, constSvc) {
        var vm = this;
        vm.editStartDate = editStartDate;
        vm.remove = remove;
        vm.dateBirthday = '';
        vm.model = {};
        vm.text = {
            title: '',
            subtitle: ''
        };
        vm.date;

        $scope.$on(constSvc.CALENDAR_EVENT.SELECTED_CALENDAR, function (event, data) {
            vm.model = dateSvc.getSelectedDay();
            editStartDate();
        });

        $scope.$on(constSvc.CALENDAR_EVENT.UPDATED_MODEL, function (event, data) {
            vm.model = dateSvc.getSelectedDay();
        });

        init();

        function init() {
            vm.text = {
                title: '',
                subtitle: ''
            };
            getDate();
        }

        function remove() {
            gestationSvc.remove().then(function () {
                dateSvc.updateCalendar();
                init();
            })
        }

        function editStartDate() {
            gestationSvc.create({
                g_day: vm.model.gregorian_day,
                g_month: vm.model.gregorian_month,
                g_year: vm.model.gregorian_year,
            }).then(function () {
                dateSvc.updateCalendar();
                init();
            });
        }

        function getDate() {
            gestationSvc.get().then(function (res) {
                vm.dateBirthday = res;
                if(res.start_ext){
                    vm.date = res.start_ext.split('/');
                    vm.text.title = vm.date[0] + ' ' + vm.date[1];
                    vm.text.subtitle = vm.date[2];
                }
            })
        }

        $scope.$on('lang_changed',function (e,d) {
            init();
        });

    }
})();