;(function () {
    'use strict';

    angular
        .module('app')
        .controller('NotificationCtrl', NotificationCtrl);

    /* @ngInject */
    function NotificationCtrl($scope, messagesSvc, notificationSvc) {
        var vm = this;
        vm.change = change;
        vm.pushSettings = [];
        vm.notification = [];
        vm.model = {
            "Pills": {
                title: 'CONTENT.PILLS',
                descr: 'CONTENT.STOP_NOTIFICATION',
                setting: [{
                    model: null,
                    type: "time",
                    name: 'CONTENT.TIME_FOR_ALARM'
                }]
            },
            "MenoPause": {
                title: 'CONTENT.MENOPAUSE',
                descr: 'CONTENT.THE_FIRST_SEVENTH_DAYS',
                setting: [
                    {
                        model: null,
                        type: 'time',
                        name: 'CONTENT.HOUR_MORNING'
                    },
                    {
                        type: 'sunset',
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

        function getMy() {
            notificationSvc.my().then(function (res) {
                vm.notificationMy = res.data;
                mergeDefaultWithMy();
            });
        }

        function prepareObj() {
            var request = {
                notification_ids: []
            };
            vm.notification.forEach(function (v, i) {
                var obj = {
                    id: v.id,
                    status: !!v.status
                };
                if(v.time){
                    obj.time = v.time;
                }
                request.notification_ids.push(obj);
            });
            return request;
        }


        function change() {
            notificationSvc.change(prepareObj()).then(function (res) {
                if(res.status){
                    messagesSvc.show('SUCCESS.UPDATED', 'success');
                }
            });
        }

        function mergeDefaultWithMy() {
            vm.notification.forEach(function (val, index) {
                vm.notificationMy.forEach(function (v, i) {
                    if(val.name === v.name){
                        vm.notification[index] = prepareNotification(vm.notificationMy[i]);
                    }
                });
            });
        }

        function prepareNotification(notificationItem) {
            if(notificationItem.time){
                var timeArr = notificationItem.time.split(':');
                if(timeArr.length > 2){
                    notificationItem.time = timeArr[0]+':'+timeArr[1];
                }
            }
            return notificationItem;
        }

        function getNotification() {
            notificationSvc.all().then(function (res) {
                vm.notification = res.data;
                getMy();
            });
        }

    }
})();
