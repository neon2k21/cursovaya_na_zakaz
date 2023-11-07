import { initializeApp } from "firebase/app"
import {getDatabase} from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyB-fJoL0TMvKvcvDsMDDkLQpd1pLt92XXI",
    authDomain: "vuzappcursovaya.firebaseapp.com",
    databaseURL: "https://vuzappcursovaya-default-rtdb.firebaseio.com",
    projectId: "vuzappcursovaya",
    storageBucket: "vuzappcursovaya.appspot.com",
    messagingSenderId: "222197056579",
    appId: "1:222197056579:web:cef02128c9dd60975d80f6"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
