import React, { useRef } from "react";
import "./ModalAuth.css";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/Authentication/authenticationSlice";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import firebaseApp from "../firebase";
const ModalAuth = ({ isSignIn, setSignCallback }) => {
  //redux
  const dispatch = useDispatch();
  //firebase auth
  const auth = getAuth(firebaseApp);
  const email = useRef(null);
  const password1 = useRef(null);
  const password2 = useRef(null);
  return (
    <div className="signUpForm">
      <form className=" container fade-in" style={{ border: "1px solid #ccc" }}>
        <h1>{isSignIn ? "Sign In" : "Sign Up"}</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />

        <label for="email">
          <b>Email</b>
        </label>
        <input
          ref={email}
          className="signup__input"
          type="text"
          placeholder="Enter Email"
          name="email"
          required
        />

        <label for="psw">
          <b>Password</b>
        </label>
        <input
          ref={password1}
          className="signup__input"
          type="password"
          placeholder="Enter Password"
          name="psw"
          required
        />

        <label for="psw-repeat">
          <b>Repeat Password</b>
        </label>
        {!isSignIn && (
          <input
            ref={password2}
            className="signup__input"
            type="password"
            placeholder="Repeat Password"
            name="psw-repeat"
            required
          />
        )}

        <div class="clearfix">
          <button
            type="submit"
            class="signupbtn"
            onClick={(e) => {
              e.preventDefault();
              if (!isSignIn) {
                if (password2.current.value == password1.current.value) {
                  createUserWithEmailAndPassword(
                    auth,
                    email.current.value,
                    password1.current.value
                  )
                    .then((user) =>
                      dispatch(setUser({ email: user.email, uid: user.uid }))
                    )
                    .catch((e) => console.log(e));
                }
              } else {
                signInWithEmailAndPassword(
                  auth,
                  email.current.value,
                  password1.current.value
                )
                  .then((user) => console.log(user))
                  .catch((e) => console.log(e));
              }
            }}
          >
            Sign Up
          </button>
          <button
            type="button"
            class="cancelbtn"
            onClick={() => {
              setSignCallback("");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalAuth;
