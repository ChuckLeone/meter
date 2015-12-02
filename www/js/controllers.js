angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope) {
    $scope.lastPhoto = [];
    $scope.lastMeterRead = {
        serviceAddress: '',
        serviceAddress2: '',
        readDate: ''
    }
})

.controller('ChatsCtrl', function ($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    }
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true,
        paperlessBilling: false
    };
    $scope.paperlessBillingToggle = function () {
        if ($scope.paperlessBilling == true) {
            alert("Paperless billing is active.");
        } else {
            alert("Paperless billing is inactive.");
        }
    };

    $scope.$on("$cordovaLocalNotification:added", function (id, state, json) {
        alert("Added a notification");
    });
})

.controller('AlertCtrl', function ($scope) {
    $scope.paymentSubmitted = function () {
        //alert("Thank you! Your payment has been submitted.");

    };

})

.controller("NotificationCtrl", function ($scope, $cordovaLocalNotification) {
    $scope.notificationSettings = {
        newBills: false
    };

    $scope.add = function () {
        var alarmTime = new Date();
        alarmTime.setMinutes(alarmTime.getMinutes() + 1);
        $cordovaLocalNotification.add({
            id: "1234",
            date: alarmTime,
            message: "A new bill is available",
            title: "Billing Notification",
            autoCancel: true,
            sound: null
        }).then(function () {
            console.log("The notification has been set");
        });
    };

    $scope.isScheduled = function () {
        $cordovaLocalNotification.isScheduled("1234").then(function (isScheduled) {
            alert("Notification 1234 Scheduled: " + isScheduled);
        });
    }

})

.controller('CameraCtrl', function ($scope, Camera) {

    $scope.getPhoto = function () {
        Camera.getPicture().then(function (imageURI) {
            console.log(imageURI);
            $scope.lastPhoto = imageURI;
            $scope.hasPhoto = true;

        }, function (err) {
            console.log(err);
        }, {
            quality: 75,
            targetWidth: 320,
            targetHeight: 320,
            saveToPhotoAlbum: true
        });
    };

    $scope.submitReading = function () {
        alert("Your meter reading has been submitted,");
        
    }
});
