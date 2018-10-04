;(function () {
    angular
        .module('app')
        .controller('StartPageCtrl', StartPageCtrl);

    /* @ngInject */
    function StartPageCtrl(authExtSvc, $translate, books) {
        var vm = this;
        vm.getTitle = getTitle;
        vm.getDescription = getDescription;
        vm.getSubtitle = getSubtitle;
        vm.signUp = authExtSvc.signUpProcess;
        vm.books = books;

        init();
        function init(){

        }

        function getTitle(item){
            return $translate.use() === 'heb' ? item.titleHeb: item.title;
        }

        function getDescription(item){
            return $translate.use() === 'heb' ? item.descriptionHeb: item.description;
        }

        function getSubtitle(item){
            return  $translate.use()  === 'heb' ? item.subtitleHeb: item.subtitle;
        }
    }
})();