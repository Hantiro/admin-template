;(function () {
    angular
        .module('app')
        .controller('LawsCtrl', LawsCtrl);

    /* @ngInject */
    function LawsCtrl(modalSvc, userSvc, toastr, patients, amount_patient, $state) {
        var vm = this;
        var user_ids = [];
        vm.patients = patients;
        vm.amount_patient = amount_patient;
        vm.deleteUser = deleteUser;

        function deleteUser(user){
            user_ids.push(user.id);
            var user_id = {
                ids: user_ids
            };
            modalSvc.confirmDelete().result.then(function(){
                userSvc.removeUser(user_id).then(function (data) {
                    if(data.success){
                        toastr.success(data.message);
                        $state.reload();
                    } else {
                        toastr.error(data.message);
                    }
                })
            },function(){
                return
            });
        };
    }
})();