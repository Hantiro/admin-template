;(function () {
    'use strict';

    angular.module('service.modalSvc', []).service('modalSvc', modalSvc);

    /* @ngInject */
    function modalSvc($uibModal) {
        var service = {
            confirmDelete: confirmDelete,
            purchaseCreate: purchaseCreate,
            specCreateModal: specCreateModal
        };
        return service;

        function confirmDelete(){
            return  $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/confirm/confirm.html',
                controller: 'ConfirmCtrl',
                controllerAs: 'vm',
                windowTopClass: 'confirm-modal',
                size: 'sm',
                resolve: {
                    config: {
                        header_text: 'Confirm',
                        content_text: 'Delete this item?',
                        ok: 'Yes',
                        cancel: 'No'
                    },
                }
            });
        }
        
        function purchaseCreate() {
            return  $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/purchase_create/purchase_create.html',
                controller: 'PurchaseCreateCtrl',
                controllerAs: 'vm',
                windowTopClass: 'purchase-modal',
                size: 'sm',
                resolve: {
                    config: {
                        ok: 'Add',
                        cancel: 'Cancel'
                    }
                }
            });
        }
        function specCreateModal() {
            return  $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/specialty-create/specialty-create.html',
                controller: 'SpecCreateCtrl',
                controllerAs: 'vm',
                windowTopClass: 'spec-modal',
                size: 'sm',
                resolve: {
                    config: {
                        ok: 'Add',
                        cancel: 'Cancel'
                    }
                }
            });
        }
    }
})();
