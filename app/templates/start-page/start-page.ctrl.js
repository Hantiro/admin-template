;(function () {
    angular
        .module('app')
        .controller('StartPageCtrl', StartPageCtrl);

    /* @ngInject */
    function StartPageCtrl($rootScope, authExtSvc, $translate, books, modalSvc, textSvc, $timeout) {
        var vm = this;
        vm.getTitle = getTitle;
        vm.getDescription = getDescription;
        vm.getSubtitle = getSubtitle;
        vm.signUp = authExtSvc.signUpProcess;
        vm.books = books;
        vm.viewImg = modalSvc.viewImg;
        vm.promoModel;
        vm.showScrollBlock = true;

        vm.imgs = [
            'content/img/6.jpg',
            'content/img/7.jpg',
            'content/img/8.jpg',
            'content/img/9.jpg',
            'content/img/10.jpg'
        ];

        init();

        function init() {
            var sufix = '';
            if($translate.use() === 'heb'){
                sufix = '_heb';
            }
            vm.showScrollBlock = false;
            textSvc.getByNameArr(['promo'+sufix]).then(function (res) {
                $timeout(function(){
                    vm.promoModel = res.data && res.data['promo'+sufix] &&  res.data['promo'+sufix].value;
                    vm.showScrollBlock = true;
                }, 1000);
            });
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

        $rootScope.$on('lang_changed', function(data){
            init();
        });
    }
})();