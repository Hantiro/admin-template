;(function () {
    angular
        .module('app')
        .controller('UsersCtrl', UsersCtrl);

    /* @ngInject */
    function UsersCtrl(modalSvc, dentistSvc, userSvc, toastr, dentists, amount_dentist, $state) {
        var vm = this;
        var user_ids = [];
        vm.deleteUser = deleteUser;
        vm.dentists = dentists;
        vm.amount_dentist = amount_dentist;

        function deleteUser(user){
            user_ids.push(user.id);
            var user_id = {
                ids: user_ids
            };
            modalSvc.confirmDelete().result.then(function(){
                userSvc.removeUser(user_id).then(function (data) {
                    if(data.success){
                        $state.reload();
                        toastr.success(data.message);
                    } else {
                        toastr.error(data.message);
                    }
                })
            },function(){
            });
        }
    }
})();