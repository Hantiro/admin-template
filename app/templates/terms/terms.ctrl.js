;(function () {
    angular
        .module('app')
        .controller('TermsCtrl', TermsCtrl);

    /* @ngInject */
    function TermsCtrl($scope, $state, terms, textSvc, $translate) {
        var vm = this;
        vm.terms = terms;
        vm.getText = getText;

        init();
        function init(){
            textSvc.terms()
                .then(function (res) {
                    vm.terms = res.entity || [];
                });
        }

        function getText(){
            return $translate.use() === 'heb'? vm.terms.descriptionHeb: vm.terms.description;
        }

        $scope.$on('lang_changed',function (e,d) {
            init();
        });
    }
})();