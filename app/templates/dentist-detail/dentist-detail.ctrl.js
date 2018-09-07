;(function () {
    angular
        .module('app')
        .controller('DentistDetailCtrl', DentistDetailCtrl);

    /* @ngInject */
    function DentistDetailCtrl(modalSvc, dentist_info) {
        var vm = this;
        vm.user = dentist_info;
        // vm.testConfirmDelete = function(){
        //     modalSvc.confirmDelete().result.then(function(res){
        //         console.log(res);
        //     },function(res){
        //         console.log(res);
        //     });
        // };
    }
})();