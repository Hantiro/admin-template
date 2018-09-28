;(function () {
    'use strict';

    angular
        .module('app')
        .controller('NotificationCtrl', NotificationCtrl);

    /* @ngInject */
    function NotificationCtrl($scope, messagesSvc, notificationSvc) {
        var vm = this;
        vm.save = save;
        vm.pushSettings = [];
        vm.TEXT_NOTIF = {
            1: {
                title: 'CONTENT.PILLS',
                descr: 'CONTENT.STOP_NOTIFICATION'
            },
            2: {
                title: 'CONTENT.MENOPAUSE',
                descr: 'CONTENT.THE_FIRST_SEVENTH_DAYS'
            },
            3: {
                title: 'CONTENT.STOP_THEARA',
                descr: 'CONTENT.DAY_NIGHT'
            },
            4: {
                title: 'CONTENT.RETIREMENT_NOTIFICATION',
                // descr: 'CONTENT.THE_FIRST_SEVENTH_DAYS'
            }
        };

        init();

        function init() {
            getSettings();
        }

        function getSettings() {
            notificationSvc.settingsView().then(function (res) {
                vm.pushSettings = angular.copy(res.entity || []);
            })
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
