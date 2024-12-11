import { initializeApp } from "firebase/app"

// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
}

const initializedFirebaseApp = initializeApp(firebaseConfig)
export default initializedFirebaseApp