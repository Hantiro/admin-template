;(function () {
    angular
        .module('app')
        .controller('FaqCtrl', FaqCtrl);

    /* @ngInject */
    function FaqCtrl($scope, $state, authSvc, userSvc, $translate, faq) {
        var vm = this;
        vm.getText = getText;
        vm.faq = faq;
        init();

        function init() {

        }

        function getText(){
            return $translate.use() === 'heb'? vm.faq.descriptionHeb: vm.faq.description;
        }
    }
})();