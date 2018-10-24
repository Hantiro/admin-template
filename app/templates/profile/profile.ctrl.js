;(function () {
    angular
        .module('app')
        .controller('ProfileCtrl', ProfileCtrl);

    /* @ngInject */
    function ProfileCtrl(authSvc, userSvc, messagesSvc, utilsSvc, googleSvc, profileData) {
        var vm = this;
        vm.update = update;
        vm.pdOptions = {};
        vm.rsOptions = {};

        init();
        function init() {
        }

        function update(){
            vm.pdOptions.save();
            vm.rsOptions.save();
        }

    }
})();