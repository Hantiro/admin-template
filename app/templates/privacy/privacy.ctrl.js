;(function () {
    angular
        .module('app')
        .controller('PrivacyCtrl', PrivacyCtrl);

    /* @ngInject */
    function PrivacyCtrl($scope, textSvc,  licence, $translate) {
        var vm = this;
        vm.privacy = licence;
        vm.getText = getText;

        init();

        function init() {
            textSvc.licence()
                .then(function (res) {
                    vm.privacy = res.entity || [];
                });
        }

        function getText(){
            return $translate.use() === 'heb'? vm.privacy.descriptionHeb: vm.privacy.description;
        }

        $scope.$on('lang_changed', function (e, d) {
            init();
        });
    }
})();