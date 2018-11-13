;(function () {
        'use strict';

        angular
            .module('app')
            .controller('HistoryCtrl', HistoryCtrl);

        /* @ngInject */
        function HistoryCtrl($scope, dateSvc, $translate, dateRequestSvc, messagesSvc, constSvc) {
            var vm = this;
            vm.addDateTime = addDateTime;
            vm.currentLang = currentLang;
            vm.getDayNight = getDayNight;
            vm.isRegularText = isRegularText;
            vm.getItemDateByLang = getItemDateByLang;
            vm.isDay = isDay;
            vm.add = add;
            vm.cancel = cancel;
            vm.getTypeTrans = getTypeTrans;
            vm.updateFunc = updateFunc;

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
            vm.dateModel = dateSvc.getSelectedDay();
            vm.dateText = generateDateFormat(vm.dateModel);


            $scope.$on(constSvc.CALENDAR_EVENT.CREATED_EVENT, function () {
                init();
            });
            $scope.$on(constSvc.CALENDAR_EVENT.DELETED_EVENT, function () {
                init();
            });

            $scope.$on(constSvc.CALENDAR_EVENT.UPDATED_MODEL, function (event, data) {
                if (vm.step !== vm.STEPS.ADD_DATE_TIME) {
                    init();
                }
            });

            $scope.$on(constSvc.CALENDAR_EVENT.SELECTED_CALENDAR, function () {
                updateModel();
            });

            init();

            function init() {
                dateSvc.setSelectedDay(dateSvc.getCurrentDay());
                updateModel();
                dateRequestSvc.getListEvents().then(function (res) {
                    vm.modelDays = res;
                    vm.step = vm.STEPS.SHOW_LIST;
                });
            }

            function updateFunc() {
                dateSvc.updateCalendar();
                init();
            }

            function updateModel() {
                vm.dateModel = dateSvc.getSelectedDay();
                vm.dateText = generateDateFormat(vm.dateModel);
            }

            function generateDateFormat(day) {
                return [day.gregorian_day, day.gregorian_month, day.gregorian_year].join('/');
            }

            function cancel() {
                vm.step = vm.STEPS.SHOW_LIST;
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
                //by default set current day as selected day
                dateSvc.setSelectedDay(dateSvc.getCurrentDay());
                updateModel();
                vm.step = vm.STEPS.ADD_DATE_TIME;
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
                if( !vm.modelDays.isRegular){
                   return  'CONTENT.IRREGULAR';
                }  else if(vm.modelDays.predictionArray[0] && vm.modelDays.predictionArray[0].type) {
                   return  'CONTENT.PREDICTION_ADDITIONAL_' + vm.modelDays.predictionArray[0].type.toUpperCase();
                }
            }

            function getItemDateByLang(item) {
                return vm.currentLang() === 'eng' ? item.data2 : item.data1;
            }

            function getTypeTrans(item){
               return  'CONTENT.PREDICTION_' + item.type.toUpperCase() + ((item.skip > 0 &&'_SKIP') || (item.skip < 0 && '_SKIP_BACKWARDS') || '');
            }

        }
    }

)();
