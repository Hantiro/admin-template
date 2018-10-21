;(function () {
    'use strict';

    angular
        .module('app')
        .controller('PillCtrl', PillCtrl);

    /* @ngInject */
    function PillCtrl($scope, dateSvc, messagesSvc, pillsSvc, constSvc) {
        var vm = this;
        vm.save = save;
        vm.deletePills = deletePills;
        vm.isPills = dateSvc.getCalendarModel() && dateSvc.getCalendarModel().is_pills;
        vm.model = {
            count: 1
        };


        $scope.$on(constSvc.CALENDAR_EVENT.SELECTED_CALENDAR, function (event, data) {
            processDate();
        });

        $scope.$on(constSvc.CALENDAR_EVENT.UPDATED_MODEL, function (event, data) {
            init();
        });

        init();

        function init() {
            dateSvc.setSelectedDay(dateSvc.getCurrentDay());
            vm.isPills = dateSvc.getCalendarModel() && dateSvc.getCalendarModel().is_pills;
            vm.model = {
                count: 1
            };
            processDate();
        }

        function processDate() {
            vm.model.date = generateDateFormat(dateSvc.getSelectedDay())
        }

        function generateDateFormat(day) {
            return [day.gregorian_day, day.gregorian_month, day.gregorian_year].join('/');
        }

        function save() {
            if (!vm.model.date || vm.model.count < 0) {
                messagesSvc.show('ERROR.VERIFY_DATA', 'error');
                return;
            }
            pillsSvc.create({
                g_day: dateSvc.getSelectedDay().gregorian_day,
                g_month: dateSvc.getSelectedDay().gregorian_month,
                g_year: dateSvc.getSelectedDay().gregorian_year,
                dayCount: vm.model.count
            }).then(function (res) {
                if(res.success){
                    messagesSvc.show('SUCCESS.DONE_PILL', 'success');
                    dateSvc.updateCalendar();
                    init();
                } else if(res.messages){
                    messagesSvc.toastr.error(res.messages);
                }
            });
        }

        function deletePills() {
            pillsSvc.deleteLast().then(function () {
                dateSvc.updateCalendar();
            })
        }
    }
})();
