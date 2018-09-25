;(function () {
    'use strict';
    angular
        .module('factory.request', [])
        .factory('http', http);

    /* @ngInject */
    function http($rootScope, $http, $q, $localStorage, toastr, $translate, authDataSvc) {
        var request = function (method, url, data) {
            $rootScope.loading = true;
            var config = {
                dataType: 'json',
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                withCredentials: true
            };
            if (method === 'POST' && data && data.responseType) {
                config.responseType = data.responseType;
            }

            if (method === 'GET') {
                config.params = data;
                if (data && data.responseType) {
                    config.responseType = data.responseType;
                }
            } else {
                config.data = data;
            }

            config.url = url;
            if (authDataSvc.getToken()) {
                config.headers.Authorization = 'Bearer ' + authDataSvc.getToken();
            }

            if ($translate.use()) {
                config.url += (config.url.indexOf('?') === -1 ? '?' : '&') + 'lang=' + $translate.use();
            }
            return $http(config).then(requestSuccess, requestError);
        };

        function requestSuccess(response) {
            $rootScope.loading = false;
            var defer = $q.defer();
            if (response.data.error) {
                toastr.error(response.data.error);
                defer.reject(response.data.error);
            }
            else {
                defer.resolve(response.data);
            }
            return defer.promise;
        }

        function requestError(response) {
            var defer = $q.defer();
            var text = '';
            if (response.status === 200) {
                text = 'Server Error: ' + response.data;
            }
            else if (response.status === -1) {
                text = 'Server unavailable';
            }
            else if (response.status === 500) {
                toastr.error(response.data.message, null, {
                    tapToDismiss: true,
                    timeout: 20000
                });
            }
            else if (response.status === 403) {
                text = 'Access denied';
            }
            else if (response.status === 401) {
                if (response.data.message || response.data.error) {
                    text = response.data.message || response.data.error;
                } else {
                    text = 'Unauthorized';
                }
            }
            text = response.data.message || response.data.error;
            toastr.error(text);
            defer.reject(response.data);
            return defer.promise;
        }

        var requestFile = function (url, data) {
            $rootScope.loading = true;
            console.log(data);
            var config = {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            };

            if ($localStorage.auth_key) {
                url = url + '?auth_key=' + $localStorage.auth_key;
            }

            return $http.post(url, data, config).then(
                function (response) {
                    $rootScope.loading = false;
                    var defer = $q.defer();

                    // console.info('response', url, response);
                    if (response.data.error) {
                        toastr.error(response.data.error);
                        defer.reject(response.data.error);
                    }
                    defer.resolve(response.data);
                    return defer.promise;
                },
                function (response) {
                    var defer = $q.defer();
                    // console.info('error', url, response);

                    if (response.status === 200) {
                        toastr.error('Server Error: ' + response.data);
                        defer.reject(response.data);
                    }
                    else if (response.status === -1) {
                        toastr.error('Server unavailable');
                        defer.reject(response.data);
                    }
                    else if (response.status === 500) {
                        toastr.error(response.data.message);
                        // toastr.error('Server Error: ' + response.status + ' ' + response.data.message);
                        defer.reject(response.data);
                    }
                    else if (response.status === 403) {
                        toastr.error('Access denied.');
                        defer.reject(response.data);
                    }
                    else {
                        toastr.error('Server Error: ' + response.status + ' ' + response.data.message);
                        defer.reject(response.data);
                    }
                    defer.reject(response.data);
                    return defer.promise;
                }
            );
        };

        return {
            get: function (url, data) {
                return request('GET', url, data);
            },
            post: function (url, data) {
                return request('POST', url, data);
            },
            delete: function (url, data) {
                return request('DELETE', url, data);
            },
            put: function (url, data) {
                return request('PUT', url, data);
            },
            file: function (url, data) {
                return requestFile(url, data);
            }
        };
    }

})();
