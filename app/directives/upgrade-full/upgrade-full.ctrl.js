;(function () {
    'use strict';

    angular
        .module('app')
        .controller('UpgradeFullCtrl', UpgradeFullCtrl);

    /* @ngInject */
    function UpgradeFullCtrl($scope, paymentSvc, authDataSvc) {
        var vm = this;
        vm.link = '';
        vm.isShow = true;

        init();
        function init(){
            getLink();
            vm.isShow = Boolean( authDataSvc.getUser() && (!authDataSvc.getUser().last_payment || !authDataSvc.getUser().is_payed) );
        }

        function getLink(){
            paymentSvc.getUrl().then(function(res){
                vm.link =  res.data;
            });
        }

    }
})();
