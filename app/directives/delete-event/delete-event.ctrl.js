;(function () {
    'use strict';

    angular
        .module('app')
        .controller('DeleteEventCtrl', DeleteEventCtrl);

    /* @ngInject */
    function DeleteEventCtrl($scope, dateSvc, dateRequestSvc, constSvc, messagesSvc) {
        var vm = this;
        vm.deleteLastEvent = deleteLastEvent;
        vm.textDelete = dateSvc.getDeleteText();
        vm.calendarData = dateSvc.getCalendarModel();

        $scope.$on(constSvc.CALENDAR_EVENT.UPDATED_MODEL, function (event, data) {
            vm.calendarData = data;
            vm.textDelete = dateSvc.getDeleteText();
        });

        init();
        function init(){
        }

        function deleteLastEvent() {
            dateRequestSvc.deleteLastEvent().then(function (res) {
                if(res){
                    messagesSvc.show('SUCCESS.DELETED', 'success');
                }
                dateSvc.updateCalendar();
            });
        }
    }
})();
