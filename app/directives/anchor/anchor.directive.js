;(function () {
    angular.module('directives.anchor', [])
        .directive('anchor', anchor);

    /* @ngInject */
    function anchor($location, $anchorScroll) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                if (angular.isDefined(attrs.href) && attrs.href.length > 0) {
                    if (attrs.href.substring(0, 1) === '#') {
                        elem.on('click', function (e) {
                            // if current hash is different from requested hash
                            // then set new hash
                            // no need to call $anchorScroll()
                            // since scroll is auto if you've not used $anchorScroll.disableAutoScrolling()
                            e.preventDefault();
                            if ('#' + $location.hash() !== attrs.href) {
                                $location.hash(attrs.href.substr(1));
                                $anchorScroll();
                            }
                            // if hash is the same, force scroll
                            else {
                                $anchorScroll();
                            }

                        });
                    }
                }

            }
        };
    }
})();
