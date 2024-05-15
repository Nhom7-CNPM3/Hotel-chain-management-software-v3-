import { initializeApp } from "firebase/app";
import { getStorage  } from "firebase/storage";
import { getDatabase  } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCU0AHVdiJnMZ1N1OR2yA7Iqug-RZCi_hA",
  authDomain: "uploadfile-48dff.firebaseapp.com",
  projectId: "uploadfile-48dff",
  storageBucket: "uploadfile-48dff.appspot.com",
  messagingSenderId: "638567295646",
  appId: "1:638567295646:web:7d3c565988e936f7cb698f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);

export {storage, database};