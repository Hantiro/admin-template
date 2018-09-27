;(function () {
    'use strict';

    angular
        .module('app')
        .controller('HistoryCtrl', HistoryCtrl);

    /* @ngInject */
    function HistoryCtrl($scope, dateSvc, $translate) {
        var vm = this;
        vm.openCalendar = addDate;
        vm.currentLang = currentLang;
        vm.modelDays = {
            data: [],
            isRegular: false,
            predictionArray: []
        };

        init();

        function init() {
            dateSvc.getListEvents().then(function (res) {
                vm.modelDays = res;
            });
        }

            function addDate() {
        //         dateSvc.getDate({isSelectTime: true}, function select() {
        //     }, function ok(res) {
        //         dateSvc.createFirstDay(res).then(function () {
        //             init();
        //         });
        //     }, function cancel(res) {
        //
        //     });
        }

        function currentLang() {
            return $translate.use();
        }

    }
})();
