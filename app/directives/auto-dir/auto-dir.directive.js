;(function () {
    angular.module('directives.autoDir', [])
        .directive('autoDir', autoDir);

    /* @ngInject */
    function autoDir($translate) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                setDirection();

                scope.$on('lang_changed',function () {
                    setDirection();
                });
                
                function setDirection(){
                    var dir = $translate.use() === 'heb' ? 'rtl': 'ltr';
                    elem.css('direction',dir);
                }
            }
        }
    }
})();
