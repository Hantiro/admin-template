;(function () {
    'use strict';

    angular
        .module('app')
        .controller('ListItemCustomCtrl', ListItemCustomCtrl);

    /* @ngInject */
    function ListItemCustomCtrl($scope, constSvc) {
        var vm = this;
        vm.dayIcon = dayIcon;

        function dayIcon(licIsDay) {
            return constSvc.ICON_PATH + ( licIsDay ?
                constSvc.EVENT_IMG[constSvc.EVENT_CONST.DAY]: constSvc.EVENT_IMG[constSvc.EVENT_CONST.NIGHT] )
        }
    }

})();
