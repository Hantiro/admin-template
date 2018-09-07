;(function () {
    angular
        .module('app')
        .controller('FeedbackMsgCtrl', FeedbackMsgCtrl);

    /* @ngInject */
    function FeedbackMsgCtrl(specSvc, modalSvc, toastr, $state, specialities) {
        var vm = this;
        vm.specialities = specialities;
        vm.newSpecialty = newSpecialty;
        vm.update = update;

        function update(spec) {
            specSvc.updateSpecialty(spec).then(function (data) {
                if(data.success){
                    $state.reload();
                    toastr.success(data.message);
                } else {
                    toastr.error(data.message);
                }
            })
        }

        function newSpecialty() {
            modalSvc.specCreateModal().result.then(function(res){
                specSvc.createSpec(res).then(function (data) {
                    if(data.success){
                        $state.reload();
                        toastr.success(data.message);
                    } else {
                        toastr.error(data.message);
                    }
                })
            },function(){
                return
            });
        }
    }
})();