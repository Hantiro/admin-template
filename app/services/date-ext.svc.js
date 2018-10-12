;(function () {
    'use strict';

    angular.module('service.dateExtSvc', []).factory('dateExtSvc', dateExtSvc);

    /* @ngInject */
    function dateExtSvc() {

        var model = {
            prepareMonthObj: prepareMonthObj,
            searchCurrentDayInMonth: searchCurrentDayInMonth,
            prevMonth: prevMonth,
            nextMonth: nextMonth
        };

        function nextMonth(monthObj, isSimple) {
            var params = {
                year: monthObj.jewish_year,
                month: monthObj.next_month
            };
            if (isSimple) {
                params.default = 1;
            }
            if (monthObj.next_month === 1) {
                params.year = monthObj.jewish_year + 1;
            }
            return params;
        }

        function prevMonth(monthObj, isSimple) {
            var params = {
                year: monthObj.jewish_year,
                month: monthObj.prev_month
            };
            if (monthObj.prev_month === 13 || (monthObj.prev_month === 12 && monthObj.jewish_month === 1)) {
                params.year = monthObj.jewish_year - 1;
            }
            if (isSimple) {
                params.default = 1;
            }
            return params;
        }

        function prepareMonthObj(monthObj) {
            if (!monthObj) return;
            var lastRedDay = {};
            var calendarModel = Object.assign({}, monthObj);
            calendarModel.jewish_day = +calendarModel.jewish_day;
            calendarModel.jewish_month = +calendarModel.jewish_month;
            calendarModel.jewish_year = +calendarModel.jewish_year;
            calendarModel.gregorian_day = +calendarModel.gregorian_day;
            calendarModel.gregorian_month = +calendarModel.gregorian_month;
            calendarModel.gregorian_year = +calendarModel.gregorian_year;
            calendarModel.next_month = +calendarModel.next_month;
            calendarModel.prev_month = +calendarModel.prev_month;
            calendarModel.jewish_current_day = +calendarModel.jewish_current_day;
            calendarModel.jewish_current_month = +calendarModel.jewish_current_month;
            calendarModel.jewish_month_name = calendarModel.jewish_month_name.toUpperCase();
            calendarModel.last_part_period = +calendarModel.last_part_period;
            if (calendarModel.weeks) {
                calendarModel.weeks = prepareCalendarWeeks(calendarModel.weeks, calendarModel, lastRedDay);
            }
            if (calendarModel.lastEvent) {
                calendarModel.lastEvent = prepareCalendarDay(calendarModel.lastEvent);
            }
            return calendarModel;
        }

        function prepareCalendarWeeks(weeks, calendarModel) {
            if (!weeks) return [];
            for (var i = 0; i < weeks.length; i++) {
                weeks[i] = prepareCalendarDaysInWeeks(weeks[i]);
            }
            if (weeks[5] && weeks[5][0] &&
                weeks[5][0].jewish_month !== calendarModel.jewish_month) {
                weeks.pop();
            }
            return weeks;
        }

        function prepareCalendarDay(day) {
            day.gregorian_day = +day.gregorian_day;
            day.gregorian_month = +day.gregorian_month;
            day.gregorian_year = +day.gregorian_year;
            day.jewish_day = +day.jewish_day;
            day.jewish_month = +day.jewish_month;
            day.jewish_year = +day.jewish_year;
            if (day.events) {
                day.events.top = +day.events.top;
                day.events.bottom = +day.events.bottom;
                if(day.events.prediction_type){
                    day.events.prediction_type = day.events.prediction_type.toUpperCase();
                }
            }
            day.mark.clean_day = !!day.mark.clean_day;
            day.mark.pill_day = !!day.mark.pill_day;
            return day;
        }

        function prepareCalendarDaysInWeeks(weekItem) {
            if (!weekItem) return [];
            var week = weekItem.reverse();
            for (var j = 0; j < week.length; j++) {
                week[j] = prepareCalendarDay(week[j]);
            }
            return week;
        }

        function searchCurrentDayInMonth(monthObj) {
            //simply check one of many params...
            if (monthObj.jewish_current_month) {
                for (var i = 0; i < monthObj.weeks.length; i++) {
                    var curWeek = monthObj.weeks[i];
                    for (var day = 0; day < curWeek.length; day++) {
                        if(curWeek[day].jewish_month === monthObj.jewish_current_month
                            && curWeek[day].jewish_year === monthObj.jewish_year
                            && curWeek[day].jewish_day === monthObj.jewish_current_day){
                            return curWeek[day];
                        }
                    }
                }
            }
        }

        return model;
    }
})
();
