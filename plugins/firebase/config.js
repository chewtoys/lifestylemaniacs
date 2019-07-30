import { app, apps, initializeApp } from 'firebase';

const firebaseApp = !apps.length
  ? initializeApp({
      apiKey: 'AIzaSyCSj92xWaqJmY48KKf1gWCJGhuuO7Jr8Y0',
      authDomain: 'lifestylemaniacs.firebaseapp.com',
      databaseURL: 'https://lifestylemaniacs.firebaseio.com',
      projectId: 'lifestylemaniacs',
      storageBucket: '',
      messagingSenderId: '71396210302',
      appId: '1:71396210302:web:527fbce8e7e2ad94'
    })
  : app();

const firebaseAuth = firebaseApp.auth();
const firebaseFirestore = firebaseApp.firestore();

export { firebaseApp, firebaseAuth, firebaseFirestore };
