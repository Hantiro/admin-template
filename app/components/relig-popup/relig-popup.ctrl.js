;(function () {
    angular
        .module('app')
        .controller('ReligPopupCtrl', ReligPopupCtrl);

    /* @ngInject */
    function ReligPopupCtrl($uibModalInstance, messagesSvc, googleSvc, authSvc, authDataSvc) {
        var vm = this;
        vm.rsOptions = {};
        // $uibModalInstance.close(res);

        vm.next = function next() {
            vm.rsOptions.save({
                isCreate: true
            }).then(function () {
                $uibModalInstance.close(true);
            });
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss();
        };
    }
})();