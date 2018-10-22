;(function () {
    'use strict';

    angular
        .module('app')
        .controller('NotificationItemCtrl', NotificationItemCtrl);

    /* @ngInject */
    function NotificationItemCtrl($scope, constSvc, $translate) {
        var vm = this;
        vm.getTitle = getTitle;
        vm.getBody = getBody;

        function getTitle(item) {
            return  $translate.use() === 'heb'? item.title_heb : item.title_eng;
        }

        function getBody(item) {
            return  $translate.use() === 'heb'? item.body_heb : item.body_eng;
        }
    }

})();
