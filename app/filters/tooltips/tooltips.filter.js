;(function () {
    'use strict';
    angular.module('filters.tooltips', [])
        .filter("tooltips", ["toolTipTitle", function (toolTipTitle) {

            return function (categoryName) {
                var text = toolTipTitle.getLists();
                if (('' + categoryName).trim().length !== 0) {
                    var catName = categoryName.split('.');
                    if (catName.length > 1) {
                        var cat = catName[0].toLowerCase();
                        var param = catName[1].toLowerCase();
                        if (text[cat] && text[cat][param]) {
                            return text[cat][param];
                        }
                    }
                }
                return '';
            };
        }]);
})();