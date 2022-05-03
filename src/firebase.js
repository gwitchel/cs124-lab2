import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnLHzrDzijh4KmeJWRU5zSIiW2cPsZRHU",
  authDomain: "cs124-lab3-3028f.firebaseapp.com",
  projectId: "cs124-lab3-3028f",
  storageBucket: "cs124-lab3-3028f.appspot.com",
  messagingSenderId: "426502461839",
  appId: "1:426502461839:web:56b4c42f33c8a6187353fa"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export {
  app,
  db,
  auth,
};