import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
firebase.initializeApp({
  apiKey: 'AIzaSyALmyveoiOmR5ZG87Mx9Imk3XgkCWi0sO4',
  authDomain: 'react-firebase-fdf84.firebaseapp.com',
  projectId: 'react-firebase-fdf84'
});
var db = firebase.firestore();
export default db;