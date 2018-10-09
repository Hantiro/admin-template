;(function () {
    angular
        .module('app')
        .controller('StartPageCtrl', StartPageCtrl);

    /* @ngInject */
    function StartPageCtrl(authExtSvc, $translate, books, modalSvc) {
        var vm = this;
        vm.getTitle = getTitle;
        vm.getDescription = getDescription;
        vm.getSubtitle = getSubtitle;
        vm.signUp = authExtSvc.signUpProcess;
        vm.books = books;
        vm.viewImg = modalSvc.viewImg;

        vm.imgs = [
            'content/img/6.jpg',
            'content/img/7.jpg',
            'content/img/8.jpg',
            'content/img/9.jpg',
            'content/img/10.jpg'
        ];

        init();

        function init() {

        }

        function getTitle(item) {
            return $translate.use() === 'heb' ? item.titleHeb : item.title;
        }

        function getDescription(item) {
            return $translate.use() === 'heb' ? item.descriptionHeb : item.description;
        }

        function getSubtitle(item) {
            return $translate.use() === 'heb' ? item.subtitleHeb : item.subtitle;
        }
    }
})();