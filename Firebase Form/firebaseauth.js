import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC1JJ46OAK7hFFrDx5hNMJPJ63MDL6TNBw",
    authDomain: "project1-adb85.firebaseapp.com",
    projectId: "project1-adb85",
    storageBucket: "project1-adb85.firebaseapp.com",
    messagingSenderId: "197010598309",
    appId: "1:197010598309:web:91796b68662151b9c3604c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Show message utility
function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// Sign Up Functionality
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userData = {
            email: email,
            firstName: firstName,
            lastName: lastName,
        };

        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef, userData);

        showMessage("Account Created Successfully", "signUpMessage");
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error during registration:", error);
        if (error.code === "auth/email-already-in-use") {
            showMessage("Email Address Already Exists !!!", "signUpMessage");
        } else {
            showMessage("Unable to create user. Please try again later.", "signUpMessage");
        }
    }
});

// Sign In Functionality
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        showMessage("Login is successful", "signInMessage");
        localStorage.setItem("loggedInUserId", user.uid);
        window.location.href = "/quiz types/quiztypes.html";
    } catch (error) {
        console.error("Error during login:", error);
        if (error.code === "auth/wrong-password") {
            showMessage("Incorrect Email or Password", "signInMessage");
        } else if (error.code === "auth/user-not-found") {
            showMessage("Account does not exist", "signInMessage");
        } else {
            showMessage("Unable to sign in. Please try again later.", "signInMessage");
        }
    }
});
