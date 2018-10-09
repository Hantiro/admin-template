;(function () {
    angular
        .module('app')
        .controller('ViewImgCtrl', ViewImgCtrl);

    /* @ngInject */
    function ViewImgCtrl($uibModalInstance, imgSrc) {
        var vm = this;
        vm.imgSrc = imgSrc;

        vm.close = function (res) {
            $uibModalInstance.close('close');
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss(false);
        };
    }
})();