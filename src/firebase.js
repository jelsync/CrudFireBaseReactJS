import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAWN6bf8qS90fM-yd2_UzWq8Qd_y-ND-hg",
    authDomain: "fb-crud-react-a85a3.firebaseapp.com",
    projectId: "fb-crud-react-a85a3",
    storageBucket: "fb-crud-react-a85a3.appspot.com",
    messagingSenderId: "158791015095",
    appId: "1:158791015095:web:22994ee82cc67e193f0b32"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  export const db = fb.firestore();