angular.module('starter.services', [])

.factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Meter read: 009009',
        lastText: '4/5/2016',
        face: 'img/ionic.png'
    }, {
        id: 1,
         name: 'Meter read: 004288',
        lastText: '3/5/2016',
        face: 'img/ionic.png'
    }, {
        id: 2,
         name: 'Meter read: 001288',
        lastText: '1/5/2016',
        face: 'img/ionic.png'
    }, {
        id: 3,
        name: 'Meter read: 010001',
        lastText: '12/5/2015',
        face: 'img/ionic.png'
    }, {
        id: 4,
        name: 'Meter read: 000291',
        lastText: '11/5/2015',
        face: 'img/ionic.png'
    }];

    return {
        all: function () {
            return chats;
        },
        remove: function (chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function (chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
})

.factory('Alerts', function () {
    // android wear plugin
    AndroidWear.onConnect(function (e) {
        alert("Connection Successfully Established - handle: " + e.handle);

        AndroidWear.onDataReceived(e.handle, function (e) {
            alert("Data received - handle: " + e.handle + " data: " + e.data);
        });

        AndroidWear.sendData(e.handle, "Hello From Cordova!");
    });
    //


})

.factory('Camera', ['$q', function ($q) {

    return {
        getPicture: function (options) {
            var q = $q.defer();

            navigator.camera.getPicture(function (result) {
                q.resolve(result);
            }, function (err) {
                q.reject(err);
            }, options);

            return q.promise;
        }
    }
}]);