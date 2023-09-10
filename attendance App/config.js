// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {getDatabase} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDjBGzJHosBJFvpzT7EwSdU4Lhixjhj22A",
    authDomain: "authetication-c9163.firebaseapp.com",
    databaseURL: "https://authetication-c9163-default-rtdb.firebaseio.com",
    projectId: "authetication-c9163",
    storageBucket: "authetication-c9163.appspot.com",
    messagingSenderId: "619929167743",
    appId: "1:619929167743:web:2c4971b92b1995960e1c4a",
    measurementId: "G-K0RLXWJG6W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

export {db}