;(function () {
    'use strict';

    angular.module('service.booksSvc', []).factory('booksSvc', booksSvc);

    booksSvc.$inject = ['http', 'url'];

    function booksSvc(http, url) {
        var model = {
            get: get,
            create: create,
            remove: remove,
            update: update
        };

        return model;

        function create(data) {
            return http.post(url.books.creat, data);
        }

        function remove(data) {
            return http.post(url.books.delete, data);
        }

        function update(data) {
            return http.post(url.books.update, data);
        }

        function get() {
            return http.get(url.books.get).then(function (res) {
                return res.data || [];
            });
        }
    }
})();
