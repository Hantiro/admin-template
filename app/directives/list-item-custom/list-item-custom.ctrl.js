;(function () {
    'use strict';

    angular
        .module('app')
        .controller('ListItemCustomCtrl', ListItemCustomCtrl);

    /* @ngInject */
    function ListItemCustomCtrl($scope, constSvc, dateRequestSvc, messagesSvc) {
        var vm = this;
        vm.dayIcon = dayIcon;
        vm.deleteEvent = deleteEvent;

        function dayIcon(licIsDay) {
            return constSvc.ICON_PATH + (licIsDay ?
                constSvc.EVENT_IMG[constSvc.EVENT_CONST.DAY] : constSvc.EVENT_IMG[constSvc.EVENT_CONST.NIGHT])
        }

        function deleteEvent(model) {
            if(model.id){
                dateRequestSvc.deleteEvent(model.id).then(function (res) {
                    if (res.success) {
                        if(angular.isFunction($scope.licUpdate)){
                            $scope.licUpdate();
                            messagesSvc.show('SUCCESS.DELETED', 'success');
                        }
                    }
                });
            }
        }
    }

})();
