// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAwW-peQIHKRgc8kbgawamrBx1pih6vCFE",
  authDomain: "culturecare-24e56.firebaseapp.com",
  projectId: "culturecare-24e56",
  storageBucket: "culturecare-24e56.appspot.com",
  messagingSenderId: "84025890251",
  appId: "1:84025890251:web:1fcb7b60b9fff8a28ed24e",
  measurementId: "G-NZVG0YQKZ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// auth can be used to get the current authenticated user
export const auth = getAuth(app)

// gmail authentication
const provider = new GoogleAuthProvider()
// sign in google function
export const signInWithGoogle = async () => {
    console.log("signing in again ....")
    // triggers the pop up, then pass in the result
    const result = await signInWithPopup(auth, provider)
    try {
        const email = result.user.email;
        const name = result.user.email;
        return email;
    }
    catch (err){
        console.log(err);
        return "error"
    }

}