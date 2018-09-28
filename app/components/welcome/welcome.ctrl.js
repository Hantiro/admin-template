;(function () {
    angular
        .module('app')
        .controller('WelcomeCtrl', WelcomeCtrl);

    /* @ngInject */
    function WelcomeCtrl($uibModalInstance,messagesSvc) {
        var vm = this;
        vm.buy = buy;

        function buy(){
            $uibModalInstance.close(vm.model);
        }

        vm.cancel = function(){
            $uibModalInstance.dismiss(false);
        }
    }
})();