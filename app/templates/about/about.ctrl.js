;(function () {
    angular
        .module('app')
        .controller('AboutCtrl', AboutCtrl);

    /* @ngInject */
    function AboutCtrl($scope, $state, about, textSvc, $translate) {
        var vm = this;
        vm.about = about;
        vm.getText = getText;
        init();

        function init() {
            textSvc.about()
                .then(function (res) {
                    vm.about =  res.entity || [];
                });
        }

        function getText(){
            return $translate.use() === 'heb'? vm.about.descriptionHeb: vm.about.description;
        }

        $scope.$on('lang_changed',function (e,d) {
            init();
        });
    }
})();