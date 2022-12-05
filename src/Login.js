import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useContext } from "react";
import AuthContext from "./AuthContext";
import { app } from "./utils/firebaseConfig";
function Login() {
  const ctx = useContext(AuthContext);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  function buttonClick() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        ctx.loginHandler(user.uid);
        
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return <button onClick={buttonClick}>Login With Google</button>;
}

export default Login;
