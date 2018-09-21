;(function () {
    angular
        .module('app')
        .controller('NewPassCtrl', NewPassCtrl);

    /* @ngInject */
    function NewPassCtrl($uibModalInstance,messagesSvc) {
        var vm = this;

        vm.ok = function(){
            if(validation()){
                $uibModalInstance.close(vm.model);
            }
        };
        vm.cancel = function(){
            $uibModalInstance.dismiss(false);
        };
    }
})();