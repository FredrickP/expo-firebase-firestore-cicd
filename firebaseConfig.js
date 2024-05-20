import { initializeApp } from 'firebase/app';
import { getFirestore ,collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
// Get from Web Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCbgp8OV_j6_5CowkrKflyc_SCoiy43Eas",
    authDomain: "projectodp.firebaseapp.com",
    projectId: "projectodp",
    storageBucket: "projectodp.appspot.com",
    messagingSenderId: "1037965026614",
    appId: "1:1037965026614:web:cedebd46324a747b0f3f97",
    measurementId: "G-LGMZJ5SZ2P"
};

const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export { app, collection, addDoc, db, getDocs, deleteDoc, doc }