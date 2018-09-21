;(function () {
    'use strict';

    angular
        .module('app')
        .controller('CalendarCustomCtrl', CalendarCustomCtrl);

    /* @ngInject */
    function CalendarCustomCtrl($scope, utilsSvc, dateSvc, messagesSvc) {
        let vm = this;

        vm.nextMonth = nextMonth;
        vm.prevMonth = prevMonth;
        vm.selectDay = selectDay;
        vm.deleteLastEvent = deleteLastEvent;
        vm.isCurrentDay = isCurrentDay;
        vm.isDayInCurrentMonth = isDayInCurrentMonth;
        vm.isDaySelected = isDaySelected;
        vm.textDelete = textDelete;
        vm.dayEventImgSrc = dayEventImgSrc;

        vm.EVENT_CONST = dateSvc.EVENT_CONST;
        vm.IMG_CONST = dateSvc.EVENT_IMG;
        vm.PERIOD_CONST = dateSvc.PERIOD_CONST;
        vm.NUMB_HE = utilsSvc.NUMBER_HE;
        vm.days = utilsSvc.DAYS_ORDER;
        vm.calendarModel = {};
        vm.tempSelectedModel = {};
        vm.currentMonthModel = {};

        init();

        function init(params) {
            //check preload data (this used if this directive used as popup for select date, and not wait download new calendar before show);
            //if params is set we no need use cache
            if(dateSvc.getPreloadedForSimple() && isSimpleMode() && angular.isUndefined(params)){
                setModelData(dateSvc.getPreloadedForSimple());
            } else {
                let param = Object.assign({}, params);
                if (isSimpleMode()) {
                    param.default = 1;
                }
                dateSvc.loadMonth(param).then(function (res) {
                    setModelData(res);
                });
            }
        }

        function isSimpleMode(){
            return $scope.ccType && $scope.ccType === dateSvc.CALENDAR_TYPE.SIMPLE;
        }

        function setModelData(data){
            vm.calendarModel = data;
            if (angular.isFunction($scope.ccUpdatedModel)) {
                $scope.ccUpdatedModel(vm.calendarModel);
            }
        }

        $scope.$watch(function(){
            return $scope.mhDeletePills;
        }, function(newData, oldData){
            console.log(newData);
            });

        $scope.$on('update_calendar', function (event, data) {
            if ($scope.ccType && $scope.ccType === dateSvc.CALENDAR_TYPE.DETAILED) {
                if (vm.calendarModel.jewish_year && vm.calendarModel.jewish_month >= 0) {
                    return init({
                        year: vm.calendarModel.jewish_year,
                        month: vm.calendarModel.jewish_month
                    });
                }
                init();
            }
        });

        function dayEventImgSrc(event_const_number){
            return 'content/img/icon/'+vm.IMG_CONST[event_const_number];
        }


        function isDaySelected(day) {
            if ($scope.ccSelected && $scope.ccSelected.selected) {
                return $scope.ccSelected.selected.g_year === vm.calendarModel.gregorian_year &&
                    $scope.ccSelected.selected.g_month === day.gregorian_month &&
                    $scope.ccSelected.selected.g_day === day.gregorian_day;
            }
        }

        function textDelete() {
            return vm.calendarModel.last_part_period === vm.PERIOD_CONST.END ?
                'CONTENT.DELETE_LAST_DAY' : 'CONTENT.DELETE_FIRST_DAY';
        }

        function isCurrentDay(day) {
            return vm.calendarModel.jewish_current_day === day.jewish_day &&
                vm.calendarModel.jewish_current_month === day.jewish_month
        }

        function isDayInCurrentMonth(day) {
            return vm.calendarModel.jewish_month === day.jewish_month
        }

        function deleteLastEvent() {
            dateSvc.deleteLastEvent().then(function () {
                init({
                    year: vm.calendarModel.jewish_year,
                    month: vm.calendarModel.jewish_month
                })
            })
        }

        function isBeforeStartRedDay(sDay) {
            if (angular.isUndefined(vm.calendarModel.lastEvent)) return false;
            let lastEvent = vm.calendarModel.lastEvent;
            if (sDay.jewish_year < lastEvent.jewish_year) {
                return true;
            }
            //similar year
            if (sDay.jewish_year === lastEvent.jewish_year) {
                if (sDay.jewish_month < lastEvent.jewish_month) {
                    return true;
                }
                //similar month
                if (sDay.jewish_month === lastEvent.jewish_month) {
                    if (sDay.jewish_day < lastEvent.jewish_day) {
                        return true;
                    }
                }
            }
            //--------------
            return false;
        }

        function nextMonth() {
            init(dateSvc.nextMonth(vm.calendarModel, $scope.ccType === dateSvc.CALENDAR_TYPE.SIMPLE));
        }

        function prevMonth() {
            init(dateSvc.prevMonth(vm.calendarModel, $scope.ccType === dateSvc.CALENDAR_TYPE.SIMPLE));
        }

        function selectDay(calendarObj, day) {
            if(checkSelectedDay(calendarObj, day)){
                dateSvc.processSelectDay(calendarObj, day, $scope).then(afterSelectDay);
            }
        }

        function afterSelectDay(selectModel){
            if (angular.isFunction($scope.ccUpdateSelected)) {
                $scope.ccUpdateSelected(selectModel);
            }
            $scope.ccSelected = angular.copy(selectModel);
            if ($scope.ccType && $scope.ccType === dateSvc.CALENDAR_TYPE.DETAILED) {
                init({
                    year: vm.calendarModel.jewish_year,
                    month: vm.calendarModel.jewish_month
                });
            }
        }

        function checkSelectedDay(calendarObj, day){
            if (angular.isDefined(day.is_blocked) && day.is_blocked) {
                messagesSvc.show('ERROR.BLOCKED_DAY', 'error');
                return false;
            }
            if (day.jewish_month !== calendarObj.jewish_month) {
                messagesSvc.show('ERROR.NOT_CURRENT_MONTH', 'error');
                return false;
            }
            if($scope.ccType === dateSvc.CALENDAR_TYPE.DETAILED){
                if(vm.calendarModel.last_part_period === dateSvc.PERIOD_CONST.START){
                    if(isBeforeStartRedDay(day)){
                        messagesSvc.show('ERROR.BEFORE_START','error');
                        return false;
                    }
                }
            }
            return true;
        }
    }

})();
