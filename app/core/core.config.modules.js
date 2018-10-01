;(function () {
    angular
        .module('app')
        .config(['cfpLoadingBarProvider', '$httpProvider', 'toastrConfig', '$translateProvider',
            function (cfpLoadingBarProvider, $httpProvider, toastrConfig, $translateProvider) {
                angular.extend(toastrConfig, {
                    preventOpenDuplicates: true,
                });
                cfpLoadingBarProvider.includeSpinner = true;

                $translateProvider.useStaticFilesLoader({
                    prefix: 'lang/lang-',
                    suffix: '.json'
                });
                $translateProvider.registerAvailableLanguageKeys(['eng', 'heb']);
                $translateProvider.preferredLanguage('heb');
            }]);
})();

