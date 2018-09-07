;(function () {
    'use strict';

    angular.module('service.utilsSvc', []).service('utilsSvc', utilsSvc);

    /* @ngInject */
    function utilsSvc(user) {

        // servise which work with client and send request on server
        var service = {
            isNumber: isNumber,
            isMSIE: isMSIE,
            getUnicalData: getUnicalData,
            createObjByArrayIds: createObjByArrayIds,
            findWithAttr: findWithAttr,
            checkUserParam: checkUserParam,
            spArrObjByParam: spArrObjByParam,
            updArrObjByParam: updArrObjByParam,
            getArrByParam: getArrByParam,
            objectToArrayWithKey: objectToArrayWithKey
        };
        return service;

        //return new array of parameter by object param
        function getArrByParam(arrayObj, param) {
            var tempArr = [];
            if (Array.isArray(arrayObj)) {
                arrayObj.forEach(function (val) {
                    if (val[param] !== undefined) {
                        tempArr.push(val[param]);
                    }
                });
            }
            return tempArr;
        }

        /**
         * @description Function create array from object, and adding key value to array object item.
         * @param object - object for create array
         * @return {Array} - array of object, each object contain selft field, and additional filed - key,
         */
        function objectToArrayWithKey(object){
            if (angular.isUndefined(object)){
                return [];
            }
            var array = [];
            angular.forEach(object, function(val,key){
                val.key = key;
                array.push(val);
            });
            return array;
        }

        function checkUserParam(paramName) {
            if (angular.isUndefined(paramName)) return false;
            switch (paramName) {
                case 'teams':
                    return (user.getUser().teams && user.getUser().teams.length);
                case 'profile':
                    return (user.getUser().grade && user.getUser().speciality && user.getUser().directorate);
                case 'manager teams':
                    return (user.getUser().manager_in_teams && user.getUser().manager_in_teams.length);
                default:
                    return false;
            }
        }

        /**
         * @description  delete object in array by param
         * @param {Array} array
         * @param {string} param - param for search value in array object
         * @param val - value of param for search
         * @return {Array} - spliced array
         */
        function spArrObjByParam(array, param, val) {
            if (angular.isUndefined(array) ||
                angular.isUndefined(param) ||
                angular.isUndefined(val))  return [];
            if (Array.isArray(array)) {
                for (var i = array.length - 1; i >= 0; i--) {
                    if (array[i][param] === val) {
                        array.splice(i, 1);
                        return array;
                    }
                }
            }
            return [];
        }

        //update object in array by parameter
        function updArrObjByParam(array, param, compareVal, newObjVal) {
            if (angular.isUndefined(array) ||
                angular.isUndefined(param) ||
                angular.isUndefined(compareVal) ||
                angular.isUndefined(newObjVal)
            )  return [];
            if (Array.isArray(array)) {
                for (var i = array.length - 1; i >= 0; i--) {
                    if (array[i][param] === compareVal) {
                        array[i] = newObjVal;
                        return array;
                    }
                }
            }
            return [];
        }

        function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        function isMSIE() {
            var ua = navigator.userAgent.toLowerCase();
            return (ua.indexOf("msie") >= 0) || document.documentMode > 0;
        }

        // search in array any object/value
        function findWithAttr(array, attr, value) {
            var length = array.length;
            for (var i = 0; i < length; i += 1) {
                if (array[i][attr] === value) {
                    return i;
                }
            }
            return -1;
        }

        //data - array with id and other data,
        //filterData - object contain field id.
        //create new array with data not contain in filterData obj;
        function getUnicalData(data, filterData) {
            if (angular.isUndefined(data) || angular.isUndefined(filterData)) return [];
            var unical = [];
            if (Array.isArray(data) && typeof(filterData) === 'object') {
                data.forEach(function (item) {
                    if (!filterData[item.id]) {
                        unical.push(item);
                    }
                });
            }
            return unical;
        }

        //data_arr - array, must have id
        //creating obj with fields by id from data arr
        function createObjByArrayIds(data_arr) {
            if (angular.isUndefined(data_arr)) return {};
            var tempData = {};
            if (Array.isArray(data_arr)) {
                data_arr.forEach(function (item) {
                    if (item.id) {
                        tempData[item.id] = item;
                    }
                });
            }
            return tempData;
        }
    }
})();
