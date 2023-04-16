import React, { useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../firebase/firebase.init";

const Login = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider(app);
  const githubProvider = new GithubAuthProvider ();




  const handleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  const handleGithubLogin = ()=>{
    signInWithPopup(auth,githubProvider)
    .then(result=>{
      const loggedInUser =result.user;
      console.log(loggedInUser)
      setUser(loggedInUser)

    }).catch(error=>{
      console.log(error)
    })


  }

  const handleToSignOut = () => {
    signOut(auth)
      .then((result) => {
        console.log(result);
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {user ? (
        <button onClick={handleToSignOut}>Sign Out</button>
      ) : (
        <div>
          <button onClick={handleLogin}>Google Login</button>
          <button onClick={handleGithubLogin}>Github Login</button>
        </div>
      )}

      {user && (
        <div>
          <h2>User : {user.displayName}</h2>
          <p>email : {user.email}</p>
          <img src={user.photoURL} alt="" />
        </div>
      )}
    </div>
  );
};

export default Login;
