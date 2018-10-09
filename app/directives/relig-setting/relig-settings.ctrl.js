;(function () {
    'use strict';

    angular
        .module('app')
        .controller('ReligSettingCtrl', ReligSettingCtrl);

    /* @ngInject */
    function ReligSettingCtrl($scope, googleSvc, utilsSvc, userSvc, settingsSvc, messagesSvc) {
        var vm = this;
        vm.saveSettings = saveSettings;
        vm.changeReligion = changeReligion;
        vm.checkSettings = checkSettings;
        vm.showSettings = false;
        vm.user_settings;
        vm.religious_settings;
        vm.tmp_settings = {};
        vm.MORDECAI = 'Mordecai';
        vm.SETTING_CONST = {
            MORDECAI: 2
        };
        vm.RELIG_SETTING = {
            'YOSEF': 'CONTENT.SEPHARDY_YOSEF',
            'MORDECAI': 'CONTENT.SEPHARDY_MORDECAI',
            'ASHKENAZI': 'CONTENT.SEPHARDY_AUTHORITIES'
        };

        init();

        function init() {
            $scope.rsOptions = {};
            $scope.rsOptions.save = saveSettings; //link to save for call outside from controller
            getUserSettings();
            getReligSettings();
        }

        function getUserSettings() {
            userSvc.getSettings()
                .then(function (res) {
                    vm.user_settings = res.entity || [];
                })
        }

        function getReligSettings() {
            settingsSvc.getReligiousSettings()
                .then(function (res) {
                    vm.religious_settings = res.data || [];
                    prepareRelig();
                })
        }

        function prepareRelig() {
            vm.religious_settings = vm.religious_settings.map(function (val,index) {
                var temp = val;
                temp.name = temp.name.toUpperCase();
                return temp;
            });
        }

        function saveSettings(config) {
            var conf = config || {};
            vm.tmp_settings.id = vm.user_settings.id;
            vm.tmp_settings.monthly_cycle = vm.user_settings.monthly_cycle;
            vm.tmp_settings.interval_cycle = vm.user_settings.interval_cycle;
            vm.tmp_settings.average_cycle = vm.user_settings.average_cycle;
            vm.tmp_settings.le_horma = vm.user_settings.le_horma;
            vm.tmp_settings.religion_settings_id = vm.user_settings.religion_settings_id.id;
            return userSvc.setSettings(vm.tmp_settings)
                .then(function (res) {
                    if (res) {
                        if (conf.isCreate) {

                        } else {
                            messagesSvc.show('SUCCESS.UPDATED', 'success');
                        }
                    }
                })
        }

        function checkSettings(id) {
            vm.tmp_settings.religion_settings_id = id;
            if(id === vm.SETTING_CONST.MORDECAI){
                vm.user_settings.le_horma = true;
            }
        }

        function changeReligion(item) {
            vm.user_settings.religion = item;
        }
    }
})();
