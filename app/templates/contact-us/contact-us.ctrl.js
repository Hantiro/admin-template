;(function () {
    angular
        .module('app')
        .controller('ContactUsCtrl', ContactUsCtrl);

    /* @ngInject */
    function ContactUsCtrl(authSvc, userSvc, messagesSvc, textSvc, utilsSvc) {
        var vm = this;
        vm.sendMail = sendMail;
        vm.EMAIL_REG = utilsSvc.EMAIL_REG;
        vm.model = {};


        init();

        function init() {
        }

        function sendMail() {
            if (vm.contactUsForm.$invalid) {
                messagesSvc.show('ERROR.FILL_FIELDS', 'error');
                return;
            }
            textSvc.contactUs(vm.model)
                .then(function (res) {
                    if (res.success) {
                        messagesSvc.show('SUCCESS.SEND', 'success');
                        vm.data = {};
                    }
                })
        }
    }
})();