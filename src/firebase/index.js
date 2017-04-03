import firebase from 'firebase';
import { FIREBASE_CONFIG } from '../config';

// Create an instance for firebase
const FIREBASE = firebase.initializeApp(FIREBASE_CONFIG)

// export a reference to the database and to the storage
export const DB = FIREBASE.database();
export const STORAGE = FIREBASE.storage();

