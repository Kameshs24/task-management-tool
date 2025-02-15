import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut
} from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyA402G3aozcnSQkhxehh9TJoFftmy-uMpI",
  authDomain: "task-management-tool-84bc6.firebaseapp.com",
  projectId: "task-management-tool-84bc6",
  storageBucket: "task-management-tool-84bc6.appspot.com",
  messagingSenderId: "796892440318",
  appId: "1:796892440318:web:1da213db00a785d81ba7af"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); 


export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user; 
  } catch (error: any) {
    console.error("Google Sign-In Error:", error);

    
    if (error.code === "auth/popup-blocked") {
      console.log("Popup blocked, trying redirect...");
      await signInWithRedirect(auth, provider);
    }

    throw error;
  }
};


export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Sign-Out Error:", error);
  }
};

export { auth, db }; 