;(function () {
    'use strict';

    angular
        .module('app')
        .controller('CalendarCustomCtrl', CalendarCustomCtrl);

    /* @ngInject */
    function CalendarCustomCtrl($scope, utilsSvc, dateSvc, dateExtSvc, messagesSvc, modalSvc, constSvc) {
        var vm = this;

        vm.nextMonth = nextMonth;
        vm.prevMonth = prevMonth;
        vm.selectDay = selectDay;
        vm.isCurrentDay = isCurrentDay;
        vm.isDayInCurrentMonth = isDayInCurrentMonth;
        vm.isDaySelected = isDaySelected;
        vm.dayEventImgSrc = constSvc.eventIconPath;

        vm.EVENT_CONST = constSvc.EVENT_CONST;
        vm.IMG_CONST = constSvc.EVENT_IMG;
        vm.PERIOD_CONST = constSvc.PERIOD_CONST;
        vm.NUMB_HE = utilsSvc.NUMBER_HE;
        vm.days = utilsSvc.DAYS_ORDER;
        vm.calendarModel = {};

        $scope.$on(constSvc.CALENDAR_EVENT.UPDATE_CALENDAR, function (event, data) {
            if (!isSimpleMode()) {
                if (vm.calendarModel.jewish_year && vm.calendarModel.jewish_month >= 0) {
                    return init({
                        year: vm.calendarModel.jewish_year,
                        month: vm.calendarModel.jewish_month
                    });
                }
                init();
            }
        });

        init();

        function init(params) {
            //check preload data (this used if this directive used as popup for select date, and not wait download new calendar before show);
            //if params is set we no need use cache
            if (dateSvc.getPreloadedForSimple() && isSimpleMode() && angular.isUndefined(params)) {
                setModelData(dateSvc.getPreloadedForSimple());
            } else if (params) {
                var param = Object.assign({}, params);
                if (isSimpleMode()) {
                    param.default = 1;
                }
                processLoadingMonth(param);
            } else {
                processLoadingMonth();
            }
        }

        function processLoadingMonth(param) {
            dateSvc.loadMonth(param).then(function (res) {
                setModelData(res);
                //without params = current month in current year (not selected)
                if (!isSimpleMode() && angular.isUndefined(param)) {
                    dateSvc.setCurrentMonth(res);
                    //set selected month - current month
                    dateSvc.setSelectedMonth(res);
                    //set selected day - current day in current month
                    dateSvc.setSelectedDay(dateSvc.getCurrentDay());
                }
            });
        }

        function isSimpleMode() {
            return $scope.ccType && $scope.ccType === constSvc.CALENDAR_TYPE.SIMPLE;
        }

        function setModelData(data) {
            vm.calendarModel = data;
            dateSvc.setCalendarModel(data);
            if (angular.isFunction($scope.ccUpdatedModel)) {
                $scope.ccUpdatedModel(vm.calendarModel);
            }
        }

        function isDaySelected(day) {
            if ($scope.ccSelected && $scope.ccSelected.selected) {
                return $scope.ccSelected.selected.g_year === vm.calendarModel.gregorian_year &&
                    $scope.ccSelected.selected.g_month === day.gregorian_month &&
                    $scope.ccSelected.selected.g_day === day.gregorian_day;
            }
        }

        function isCurrentDay(day) {
            return dateExtSvc.isCurrentDay(vm.calendarModel, day);
        }

        function isDayInCurrentMonth(day) {
            return vm.calendarModel.jewish_month === day.jewish_month
        }

        function nextMonth() {
            init(dateExtSvc.nextMonth(vm.calendarModel, isSimpleMode()));
        }

        function prevMonth() {
            init(dateExtSvc.prevMonth(vm.calendarModel, isSimpleMode()));
        }

        function selectDay(calendarObj, day) {
            if (checkSelectedDay(calendarObj, day)) {
                if (dateExtSvc.isFutureDay(day, dateSvc.getCurrentDay()) && dateExtSvc.isDayPrediction(day)) {
                    modalSvc.dayInfo(day);
                } else {
                    dateSvc.processSelectDay(calendarObj, day, $scope);
                }
            }
        }

        function afterSelectDay(selectModel) {
            if (angular.isFunction($scope.ccUpdateSelected)) {
                $scope.ccUpdateSelected(selectModel);
            }
            $scope.ccSelected = angular.copy(selectModel);
            if (!isSimpleMode()) {
                init({
                    year: vm.calendarModel.jewish_year,
                    month: vm.calendarModel.jewish_month
                });
            }
        }

        function checkSelectedDay(calendarObj, day) {
            if (angular.isDefined(day.is_blocked) && day.is_blocked) {
                messagesSvc.show('ERROR.BLOCKED_DAY', 'error');
                return false;
            }
            if (day.jewish_month !== calendarObj.jewish_month) {
                messagesSvc.show('ERROR.NOT_CURRENT_MONTH', 'error');
                return false;
            }
            if (!isSimpleMode()) {
                if (vm.calendarModel.last_part_period === constSvc.PERIOD_CONST.START) {
                    if (dateExtSvc.isBeforeStartRedDay(vm.calendarModel, day)) {
                        messagesSvc.show('ERROR.BEFORE_START', 'error');
                        return false;
                    }
                }
            }
            return true;
        }
    }

})();
