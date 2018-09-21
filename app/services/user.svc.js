;(function () {
    'use strict';

    angular.module('service.userSvc', []).service('userSvc', userSvc);


    /* @ngInject */
    function userSvc($localStorage, url, http) {
        var model = {
            resetData: resetData,
            getUser: getUser
        };
        return model;


        function getUser(user_id) {
            return http.get(url.user.id + user_id).then(function(res){
                return res;
            });
        }


        function resetData(){
            $localStorage.$reset();
            $sessionStorage.$reset();
        }

    }
})();