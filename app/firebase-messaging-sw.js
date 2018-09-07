importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-messaging.js');

// uk
// firebase.initializeApp({
//     apiKey: "AIzaSyAoQSziGTmVrS7M9t9B8y1gDH1uIaI7CDo",
//     authDomain: "elft-4dc55.firebaseapp.com",
//     databaseURL: "https://elft-4dc55.firebaseio.com",
//     projectId: "elft-4dc55",
//     storageBucket: "elft-4dc55.appspot.com",
//     messagingSenderId: "33713645199"
// });

//com
// firebase.initializeApp({
//     apiKey: "AIzaSyBAh0Rt2ZkxOnLODLtkVkpJtfTxRPZWqhY",
//     authDomain: "improvewell-acfd0.firebaseapp.com",
//     databaseURL: "https://improvewell-acfd0.firebaseio.com",
//     projectId: "improvewell-acfd0",
//     storageBucket: "improvewell-acfd0.appspot.com",
//     messagingSenderId: "829567431337"
// });

self.addEventListener('notificationclick', function (event) {
    console.log('Handling background message +++++++++++++++++++++++++++++++++++++ ', event);
    event.notification.close();
    event.waitUntil(
        clients.matchAll({
            type: "window",
            includeUncontrolled: true
        }).then(function (clientList) {
            for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                // client.postMessage(event);
                // console.log('send event to main site tab:', event);
                if (client.url == '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('https://www.improvewell.uk/dashboard');
            }
        })
    );
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (event) {
    console.log('Handling background message +++++++++++++++++++++++++++++++++++++ ', event);
    var promiseChain = clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    }).then(function (windowClients) {
        for (var i = 0; i < windowClients.length; i += 1) {
            windowClients[i].postMessage(event);
        }
    }).then(function (event) {
        return self.registration.showNotification(event.data.title, event.data);
    });
    return promiseChain;
});

self.addEventListener('push', function(event) {
    if (event.data) {
        event.waitUntil(
            clients.matchAll({
                type: "window",
                includeUncontrolled: true
            }).then(function (clientList) {
                // var obj = JSON.parse(JSON.stringify());
                for (var i = 0; i < clientList.length; i++) {
                    clientList[i].postMessage(event.data.json());
                }
            })
        );
        console.log('This push event has data: ', event.data.json());
    } else {
        console.log('This push event has no data.');
    }
});