;(function () {
        'use strict';

        angular
            .module('app')
            .controller('HistoryCtrl', HistoryCtrl);

        /* @ngInject */
        function HistoryCtrl($scope, dateSvc, $translate, messagesSvc) {
            var vm = this;
            vm.addDateTime = addDateTime;
            vm.currentLang = currentLang;
            vm.getDayNight = getDayNight;
            vm.isRegularText = isRegularText;
            vm.getItemDateByLang = getItemDateByLang;
            vm.isDay = isDay;
            vm.add = add;
            vm.STEPS = {
                SHOW_LIST: 1,
                ADD_DATE_TIME: 2,
            };
            vm.DAY = 2;
            vm.step = vm.STEPS.SHOW_LIST;
            vm.modelDays = {
                data: [],
                isRegular: false,
                predictionArray: []
            };
            vm.timeModel = (new Date());
            vm.dateModel;
            vm.dateText;

            $scope.$on(dateSvc.CALENDAR_EVENT.CREATED_EVENT, function () {
                init();
            });
            $scope.$on(dateSvc.CALENDAR_EVENT.DELETED_EVENT, function () {
                init();
            });

            $scope.$on(dateSvc.CALENDAR_EVENT.SELECTED_CALENDAR, function () {
                vm.dateModel = dateSvc.getSelectedDay();
                updateDateText();
            });

            init();

            function init() {
                dateSvc.getListEvents().then(function (res) {
                    vm.modelDays = res;
                    vm.step = vm.STEPS.SHOW_LIST;
                });
            }

            function updateDateText() {
                vm.dateText = vm.dateModel.gregorian_day + '/' + vm.dateModel.gregorian_month + '/' + vm.dateModel.gregorian_year;
            }

            function add() {
                if (!verify()) {
                    messagesSvc.show('ERROR.NEED_SELECT_DATE', 'error');
                    return;
                }
                dateSvc.createFirstDay({
                    g_day: dateSvc.getSelectedDay().gregorian_day,
                    g_month: dateSvc.getSelectedDay().gregorian_month,
                    g_year: dateSvc.getSelectedDay().gregorian_year,
                    minute: vm.timeModel.getMinutes(),
                    hour: vm.timeModel.getHours()
                }).then(function (res) {
                    if (res) {
                        init();
                        dateSvc.updateCalendar();
                    }
                });
            }

            function verify() {
                return dateSvc.getSelectedDay() && dateSvc.getSelectedDay().gregorian_day >= 0 &&
                    dateSvc.getSelectedDay().gregorian_month >= 0 &&
                    dateSvc.getSelectedDay().gregorian_year;
            }

            function addDateTime() {
                vm.step = vm.STEPS.ADD_DATE_TIME;
                dateSvc.setSelectedDay(null);
            }

            function currentLang() {
                return $translate.use();
            }

            function getDayNight(dayConst) {
                return isDay(dayConst) ? 'CONTENT.DAY' : 'CONTENT.NIGHT';
            }

            function isDay(dayPart) {
                return dayPart === vm.DAY;
            }

            function isRegularText() {
                return vm.modelDays.isRegular ? 'CONTENT.REGULAR' : 'CONTENT.IRREGULAR';
            }

            function getItemDateByLang(item) {
                return vm.currentLang() === 'eng' ? item.data2 : item.data1;
            }

        }
    }

)();
