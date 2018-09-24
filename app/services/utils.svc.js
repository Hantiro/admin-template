;(function () {
    'use strict';

    angular.module('service.utilsSvc', []).service('utilsSvc', utilsSvc);

    /* @ngInject */
    function utilsSvc() {
        var NUMBER_HE = {
            1: 'א',
            2: 'ב',
            3: 'ג',
            4: 'ד',
            5: 'ה',
            6: 'ו',
            7: 'ז',
            8: 'ח',
            9: 'ט',
            10: 'י',
            11: 'יא',
            12: 'יב',
            13: 'יג',
            14: 'יד',
            15: 'טו',
            16: 'טז',
            17: 'יז',
            18: 'יח',
            19: 'יט',
            20: 'כ',
            21: 'כא',
            22: 'כב',
            23: 'כג',
            24: 'כד',
            25: 'כה',
            26: 'כו',
            27: 'כז',
            28: 'כח',
            29: 'כט',
            30: 'ל'
        };

        var DAYS_ORDER = [
            "SUN",
            "MON",
            "TUE",
            "WED",
            "THU",
            "FRI",
            "SAT"
        ];

        const EMAIL_REG = /^((([a-zA-Z\-0-9_.])+[a-zA-Z0-9_.]{2,})|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // servise which work with client and send request on server
        var service = {
            isNumber: isNumber,
            isMSIE: isMSIE,
            showDatePicker: showDatePicker,
            NUMBER_HE: NUMBER_HE,
            DAYS_ORDER: DAYS_ORDER,
            EMAIL_REG: EMAIL_REG,
        };
        return service;

        // fixme temporary for compability
        function showDatePicker(){
            return $q.reject();
        }

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
