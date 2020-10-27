const firebase = require("firebase");
require("firebase/functions");
require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyBNS6Z3E2qiuu2X2uui_DUJ2rCljZMXH7c",
  projectId: "fir-emulator-suite-4b627",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const functions = firebase.functions();
auth.useEmulator("http://localhost:9099");
functions.useEmulator("localhost", 5001);

const mockUser = {
  email: "foo@bar.com",
  password: "123456",
};

(async () => {
  await auth.signInWithEmailAndPassword(mockUser.email, mockUser.password);
  const authContext = await functions.httpsCallable("demo")();
  console.log(authContext);
})();
