;(function () {
    'use strict';

    angular
        .module('app')
        .controller('HeaderCtrl', HeaderCtrl);

    HeaderCtrl.$inject = ['$scope'];

    function HeaderCtrl($scope) {
        let vm = this;
    }
})();
