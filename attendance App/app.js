import {getAuth,  createUserWithEmailAndPassword,  signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js"
import {getDatabase, ref, set, onValue} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js"

const auth = getAuth();
const database = getDatabase()

const signup = () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("s-email").value;
    const password = document.getElementById("s-password").value;
    const random4DigitNumber = Math.floor(Math.random() * 9000) + 1000;


    createUserWithEmailAndPassword(auth, email, password)
    .then((resolve) => {
        console.log("create");
        let uniqueId = auth.currentUser.uid
        let userReference = ref(database, "users/" + uniqueId)

        let detailObj = {
            name,
            email,
            password,
            key:false,
            rollNo: random4DigitNumber,
        }
        set(userReference, detailObj)
       setTimeout(function(){
        window.location.href = "./att.html"
       },2000)
    }).catch((error) => {
        console.log(error)
    })
}
const signupBtn = document.getElementById("submit-signup")
signupBtn && signupBtn.addEventListener("click", signup);

const login = () => {
    const email = document.getElementById("l-email").value;
    const password = document.getElementById("l-password").value;

    let uniqueId = auth.currentUser.uid
    let userReference = ref(database, "users/" + uniqueId)

    onValue(userReference, (snapshot) => {
        const check = snapshot.val().key
        console.log(check);
        if (check === true) {
            window.location.href = "./admin.html"
        }else {
            window.location.href = "./att.html"
        }
    })

    signInWithEmailAndPassword(auth, email, password)
    .then((resolve) => {
        console.log("login");
    }).catch((error) => {
        console.log(error);
    })
}
const loginBtn = document.getElementById("submit-login")
loginBtn && loginBtn.addEventListener("click", login)

