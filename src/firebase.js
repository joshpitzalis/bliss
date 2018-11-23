import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAHbtm6My3WpeHDHZPy9GspJgZ3e3fhK7w',
  authDomain: 'bliss-f8d23.firebaseapp.com',
  databaseURL: 'https://bliss-f8d23.firebaseio.com',
  projectId: 'bliss-f8d23',
  storageBucket: 'bliss-f8d23.appspot.com',
  messagingSenderId: '838004932325'
};
firebase.initializeApp(config);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
