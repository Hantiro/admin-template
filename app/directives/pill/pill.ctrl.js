;(function () {
    'use strict';

    angular
        .module('app')
        .controller('PillCtrl', PillCtrl);

    /* @ngInject */
    function PillCtrl($scope, dateSvc, messagesSvc, pillsSvc) {
        var vm = this;
        vm.save = save;
        vm.deletePills = deletePills;
        vm.isPills = dateSvc.getCalendarModel() && dateSvc.getCalendarModel().is_pills;
        vm.model = {
            count: 1
        };

        $scope.$on(dateSvc.CALENDAR_EVENT.SELECTED_CALENDAR, function (event, data) {
            processDate();
        });

        $scope.$on(dateSvc.CALENDAR_EVENT.UPDATED_MODEL, function (event, data) {
            init();
        });

        init();

        function init() {
            vm.model = {
                count: 1
            };
            vm.isPills = dateSvc.getCalendarModel() && dateSvc.getCalendarModel().is_pills;
        }

        function processDate() {
            var month = dateSvc.getSelectedDay();
            vm.model.date = '' + month.gregorian_day + '/' + month.gregorian_month + '/' + month.gregorian_year;
        }

        function save(){
            if(!vm.model.date || vm.model.count < 0){
                messagesSvc.show('ERROR.VERIFY_DATA','error');
                return;
            }
            pillsSvc.create({
                g_day: dateSvc.getSelectedDay().gregorian_day,
                g_month: dateSvc.getSelectedDay().gregorian_month,
                g_year: dateSvc.getSelectedDay().gregorian_year,
                dayCount: vm.model.count
            }).then(function () {
                messagesSvc.show('SUCCESS.DONE_PILL', 'success');
                dateSvc.updateCalendar();
                init();
            });
        }

        function deletePills() {
            pillsSvc.deleteLast().then(function () {
                dateSvc.updateCalendar();
            })
        }
    }
})();
