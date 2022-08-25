import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import {
    getFirestore, collection
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCcuru78XcYoop8tl-TYTExmF5Sd2GXIW4",
    authDomain: "hallsreservations.firebaseapp.com",
    projectId: "hallsreservations",
    storageBucket: "hallsreservations.appspot.com",
    messagingSenderId: "202956536149",
    appId: "1:202956536149:web:fc041446d83cc74ff217dc",
    measurementId: "G-6GKPMNYWET"
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
