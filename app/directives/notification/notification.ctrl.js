;(function () {
    'use strict';

    angular
        .module('app')
        .controller('NotificationCtrl', NotificationCtrl);

    /* @ngInject */
    function NotificationCtrl($scope, messagesSvc, notificationSvc) {
        var vm = this;
        vm.change = change;
        vm.notification = [];
        vm.notificationMy = [];
        vm.model = {
            "Pills": {
                title: 'CONTENT.PILLS',
                descr: 'CONTENT.STOP_NOTIFICATION',
                setting: [{
                    model: null,
                    name: 'CONTENT.TIME_FOR_ALARM'
                }]
            },
            "MenoPause": {
                title: 'CONTENT.MENOPAUSE',
                descr: 'CONTENT.THE_FIRST_SEVENTH_DAYS',
                setting: [
                    {
                        model: null,
                        name: 'CONTENT.HOUR_MORNING'
                    },
                    {
                        model: null,
                        name: 'CONTENT.HOUR_SUNSET'
                    }
                ]
            },
            "Theara": {
                title: 'CONTENT.STOP_THEARA',
                descr: 'CONTENT.DAY_NIGHT'
            },
            "Retirement": {
                title: 'CONTENT.RETIREMENT_NOTIFICATION',
                // descr: 'CONTENT.THE_FIRST_SEVENTH_DAYS'
            }
        };

        init();

        function init() {
            getNotification();
        }


        function getNotification() {
            notificationSvc.my().then(function (res) {
                vm.notification = res.data;
                getMy();
            });
        }

        function getMy() {
            notificationSvc.my().then(function (res) {
                vm.notificationMy = res.data;
                mergeDefaultWithMy();
            });
        }

        function prepareObj() {

        }

        function change() {
            notificationSvc.change().then(function (res) {

            });
        }

        function mergeDefaultWithMy() {
            vm.notification.forEach(function (val, index) {
                vm.notificationMy.forEach(function (v, i) {
                    if(val.name === v.name){
                        angular.extend(vm.notification[index], vm.notificationMy[i]);
                    }
                });
            });
        }

        function save() {
            notificationSvc.settingsUpdate(vm.pushSettings).then(function (res) {
                if (res) {
                    messagesSvc.show('SUCCESS.UPDATED', 'success');
                }
            });
        }
    }
})();
