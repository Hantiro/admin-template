;(function () {
    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    /* @ngInject */
    function LoginCtrl(authSvc, $state, toastr, userSvc) {
        var vm = this;
        vm.user = {
            email: 'admin1234@admin.admin',
            password: 'Admin1234!'
            // email: '',
            // password: ''
        };
        vm.login = login;

        function login() {
            authSvc.login(vm.user).then(function (data) {
                if(data.success && data.token) {
                    $state.go('app.users');
                    userSvc.setToken(data.token);
                } else {
                    if(data.message) {
                        toastr.error(data.message);
                    }
                }
            });
        }

    }
})();