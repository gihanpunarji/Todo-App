var firebaseConfig = {
    apiKey: "AIzaSyDoEPKGKEZd5g4NbUr_VId-SJPtps6LMRM",
    authDomain: "to-do-list-1c5c0.firebaseapp.com",
    projectId: "to-do-list-1c5c0",
    storageBucket: "to-do-list-1c5c0.appspot.com",
    messagingSenderId: "1068059515294",
    appId: "1:1068059515294:web:da89bf4e6f90916ab25e8f",
    measurementId: "G-G1VVGK9GTD"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var db = firebase.firestore();