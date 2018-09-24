;(function () {
    'use strict';

    angular.module('service.googleSvc', []).factory('googleSvc', googleSvc);

    googleSvc.$inject = ['http', 'url','$rootScope', 'messagesSvc', '$q'];

    function googleSvc(http, url, $rootScope, messagesSvc, $q) {
        var gmap;
        var model = {
            searchAddress: searchAddress,
            init: init
        };

        init();

        function init() {
            if (!gmap && checkGoogle()) {
                gmap = new window.google.maps.places.AutocompleteService();
            }
        }

        function checkGoogle() {
            if (!window.google || !window.google.maps || !window.google.maps.places) {
                messagesSvc.show('ERROR.GOOGLE', 'error');
                return false;
            }
            return true;
        }

        function searchAddress(address) {
            init();
            var deferred = $q.defer();
            try {
                gmap.getPlacePredictions({
                    input: address,
                    types: ['(cities)'],
                    componentRestrictions: {country: 'il'}
                }, function (predictions) {
                    deferred.resolve(predictions && predictions.length ? angular.copy(predictions) : []);
                });
            } catch (e) {
                deferred.reject([]);
            }
            return deferred.promise;
        }

        return model;
    }
})
();
