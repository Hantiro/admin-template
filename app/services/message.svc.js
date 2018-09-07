;(function () {
    'use strict';

    angular
        .module('service.messagesSvc', [])
        .factory('messagesSvc', messagesSvc);

    messagesSvc.$inject = [];
    function messagesSvc() {

        return {
            notification: {
                test: 'Test'
            },
            error: {
                test: 'Test',
                invalidEmail: 'Please enter the correct email',
                emptyField: 'Please fill in all fields',
                invalidPeriod: 'Period can not be 0'
            },
            success: {
                sendPatientEmergency: 'A notification was sent to the patient'
            },
            warning: {
                checkCodePhone: 'Check the entered phone and code'
            }
        };

    }
})();