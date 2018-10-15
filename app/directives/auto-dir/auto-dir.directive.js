;(function () {
    angular.module('directives.autoDir', [])
        .directive('autoDir', autoDir);

    /* @ngInject */
    function autoDir($translate) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                var currentLang = $translate.use();
                setDirection();

                scope.on('lang_changed',function () {
                    setDirection();
                });
                
                function setDirection(){
                    var dir = currentLang === 'heb' ? 'rlt': 'ltr';
                    elem.css('direction',);
                }
            }
        }
    }
})();
