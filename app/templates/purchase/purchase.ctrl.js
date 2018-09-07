;(function () {
    angular
        .module('app')
        .controller('PurchaseCtrl', PurchaseCtrl);

    /* @ngInject */
    function PurchaseCtrl(modalSvc, purchaseSvc, toastr, $state, purchases) {
        var vm = this;
        vm.purchases = purchases;
        vm.newPurchase = newPurchase;

        function newPurchase() {
            modalSvc.purchaseCreate().result.then(function(res){
                purchaseSvc.createPurchasePlan(res).then(function (data) {
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