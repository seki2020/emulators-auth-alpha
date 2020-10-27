const firebase = require("firebase");
require("firebase/functions");
require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyBNS6Z3E2qiuu2X2uui_DUJ2rCljZMXH7c",
  authDomain: "fir-emulator-suite-4b627.firebaseapp.com",
  databaseURL: "https://fir-emulator-suite-4b627.firebaseio.com",
  projectId: "fir-emulator-suite-4b627",
  storageBucket: "fir-emulator-suite-4b627.appspot.com",
  messagingSenderId: "376616737928",
  appId: "1:376616737928:web:545475c2bb03660dc2d33d",
  measurementId: "G-4YNTLMDJCV",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const functions = firebase.functions();
auth.useEmulator("http://localhost:9099");
functions.useEmulator("localhost", 5001);

let onUserLoggedin;

auth.onAuthStateChanged(function (user) {
  if (user) {
    console.log("login by user", user.email);
    // User is signed in.
    onUserLoggedin();
  } else {
    // User is signed out.
    console.log("logout");
  }
});

const mockUser = {
  email: "foo@bar.com",
  password: "123456",
};

auth.signInWithEmailAndPassword(mockUser.email, mockUser.password);

onUserLoggedin = async () => {
  const authContext = await functions.httpsCallable("getAuthContext")();
  console.log(authContext);
};
