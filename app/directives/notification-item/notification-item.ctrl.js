;(function () {
    'use strict';

    angular
        .module('app')
        .controller('NotificationItemCtrl', NotificationItemCtrl);

    /* @ngInject */
    function NotificationItemCtrl($scope, constSvc, $translate, utilsSvc) {
        var vm = this;
        vm.getTitle = getTitle;
        vm.getBody = getBody;
        vm.setTime = setTime;
        vm.setTimeOK = setTimeOK;
        vm.setTimeCancel = setTimeCancel;
        vm.timeModel = null;
        vm.showSetTime = false;

        function setTime(item) {
            var date = new Date();
            var timeArr = $scope.niItemModel.time && $scope.niItemModel.time.length ? $scope.niItemModel.time.split(':'):['8','00'];
            date.setHours(+timeArr[0]);
            date.setMinutes(+timeArr[1]);
            vm.timeModel = date;
            vm.showSetTime = true;
        }

        function setTimeOK(){
            $scope.niItemModel.time = utilsSvc.getStringTime(vm.timeModel);
            setTimeCancel();
        }

        function setTimeCancel() {
            vm.showSetTime = false;
            vm.timeModel = null;
        }


        function getTitle(item) {
            return $scope.niModelExt[item.name].title;
        }

        function getBody(item) {
            return  $scope.niModelExt[item.name].descr;
        }
    }

})();
