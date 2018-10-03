;(function () {
    angular
        .module('app')
        .controller('AboutCtrl', AboutCtrl);

    /* @ngInject */
    function AboutCtrl(about) {
        var vm = this;
        vm.about = about;
        init();

        function init() {

        }
    }
})();