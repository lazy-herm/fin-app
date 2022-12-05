// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkhv1PsgWpgevCqrRhRSlngB2CL1ZUKpQ",
  authDomain: "fin-app-609d2.firebaseapp.com",
  databaseURL:
    "https://fin-app-609d2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fin-app-609d2",
  storageBucket: "fin-app-609d2.appspot.com",
  messagingSenderId: "345545867963",
  appId: "1:345545867963:web:316dd58b06e05e44de1f9e",
  measurementId: "G-VZRLS7X3JJ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const getTrxFieldList = () => {
  const db = getDatabase(app);
  onValue(ref(db, 'fields/'), (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    return data;
  });
}
export default app;

