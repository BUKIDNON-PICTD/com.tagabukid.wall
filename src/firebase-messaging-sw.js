importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js');
 
firebase.initializeApp({
    apiKey: "AIzaSyAZ37BNpGgQdZ7OxPO84dUaBMaBzlc1_3M",
    authDomain: "panganud-3a512.firebaseapp.com",
    databaseURL: "https://panganud-3a512.firebaseio.com",
    projectId: "panganud-3a512",
    storageBucket: "panganud-3a512.appspot.com",
    messagingSenderId: "804070504344",
    appId: "1:804070504344:web:12b59e6d24316a679f5ded"
});
 
const messaging = firebase.messaging();