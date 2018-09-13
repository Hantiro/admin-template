;(function () {
    'use strict';

    angular
        .module('app')
        .controller('PillCtrl', PillCtrl);

    PillCtrl.$inject = ['$scope'];

    function PillCtrl($scope) {
        var vm = this;
    }
})();
