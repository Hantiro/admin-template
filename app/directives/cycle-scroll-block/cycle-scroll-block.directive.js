;(function () {
    angular.module('directives.cycleScrollBlock', [])
        .directive('cycleScrollBlock', cycleScrollBlock);

    /* @ngInject */
    function cycleScrollBlock($document, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'directives/cycle-scroll-block/cycle-scroll-block.html',
            replace: true,
            controller: 'CycleScrollBlockCtrl',
            controllerAs: 'vm',
            scope: {
                csbModel: '@'
            },
            link: function (scope, elem, attrs) {
                var blockHeight;
                var blockWidth;
                var contHeight;
                var block;
                var content;
                var item;
                var itemHeight;
                scope.bWidth = 215;
                scope.bHeight = 315;

                scope.$watch(function () {
                    return scope.csbModel;
                }, function (newData, oldData) {
                    if(newData && String(newData).length) {
                        init();
                    }
                });

                function init() {
                    processBlock();
                    processContent();
                    processItem();
                    // checkContent();
                    addEvent();
                    startCycle();
                }

                function processContent() {
                    content = $("#cycleContent");
                    contHeight = content.outerHeight();
                }

                function processBlock() {
                    block = $("#cycleBlock");
                    blockHeight = block.outerHeight();
                    blockWidth = block.outerWidth();
                    scope.bWidth = blockWidth;
                    scope.bHeight = blockHeight;
                }

                function processItem() {
                    item = $("#cycleItem");
                    itemHeight = item.outerHeight();
                }

                function checkContent() {
                    if (itemHeight > blockHeight) {
                        return;
                    } else {
                        breedItem();
                    }
                }

                function breedItem() {
                    var i = 0; //for pervent infinite looop
                    while (contHeight < blockHeight && i < 50) {
                        content.append(item.clone());
                        content.resize();
                        processContent();
                        i++;
                    }
                }

                function startCycle() {
                    content.marquee();
                }

                function addEvent() {
                    content.marquee('pointer').mouseover(function () {
                        $(this).trigger('stop');
                    }).mouseout(function () {
                        $(this).trigger('start');
                    }).mousemove(function (event) {
                        if ($(this).data('drag')) {
                            this.scrollLeft = $(this).data('scrollX') + ($(this).data('x') - event.clientX);
                        }
                    }).mousedown(function (event) {
                        $(this).data('drag', true).data('x', event.clientX).data('scrollX', this.scrollLeft);
                    }).mouseup(function () {
                        $(this).data('drag', false);
                    });
                }

            }
        };
    }
})();
