// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjBlEWkHuElPp0jKMzoThE5Tyxa2nb1GY",
  authDomain: "forrestmorrison-blog.firebaseapp.com",
  projectId: "forrestmorrison-blog",
  storageBucket: "forrestmorrison-blog.appspot.com",
  messagingSenderId: "158992550830",
  appId: "1:158992550830:web:58be64748c4909044a563f",
  measurementId: "G-S220E3W5P5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();