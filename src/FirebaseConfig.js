// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDsxWIy9o_-i9HKWwHq9VHSRkycEN9mB_Y",
  authDomain: "emailverification-3be24.firebaseapp.com",
  projectId: "emailverification-3be24",
  storageBucket: "emailverification-3be24.appspot.com",
  messagingSenderId: "115601504212",
  appId: "1:115601504212:web:ff182bcc0357148feec841",
  measurementId: "G-QK8XXYVG7R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//initialise auth and include the whole app in it
const auth=getAuth(app);
//export auth  so that it can be used elsewhere as well 
export{auth}