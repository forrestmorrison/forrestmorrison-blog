// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEVURguH7PAQ26JapCshZHgmJSIfwnpfM",
  authDomain: "forrests-blog.firebaseapp.com",
  projectId: "forrests-blog",
  storageBucket: "forrests-blog.appspot.com",
  messagingSenderId: "858260145478",
  appId: "1:858260145478:web:8255abd3767adcbb981147"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)
export const db = getFirestore(app)
export const auth = getAuth(app)