import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import {
    getFirestore, collection
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB3Udd2c1mf35Y-QzWndauABnNbAa1ygMw",
    authDomain: "hallreservation-afd94.firebaseapp.com",
    projectId: "hallreservation-afd94",
    storageBucket: "hallreservation-afd94.appspot.com",
    messagingSenderId: "755307334016",
    appId: "1:755307334016:web:79be47b6dbc2c6f15e9965",
    measurementId: "G-Z3XWZZ66Q9"
  };
  

  //initialize firebase app
  const app = initializeApp(firebaseConfig);

  //get Authentication 
  export const auth = getAuth(app);

  //storage for image 
  export const storage = getStorage(app);

  //to Store data in db
  export const firestore = getFirestore(app);

  //collection ref
  export const colRef = collection(firestore, `Student/`);

  export const colRefHall = collection(firestore, `Hall/`);

  export const colRefLib = collection(firestore, `Library/`); 

  export const colRefReserve = collection(firestore, `Reservation/`);