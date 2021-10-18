import React from "react";
import "./ModalAuth.css";
const ModalAuth = ({ isSignIn, setSignCallback }) => {
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
            className="signup__input"
            type="password"
            placeholder="Repeat Password"
            name="psw-repeat"
            required
          />
        )}

        <div class="clearfix">
          <button type="submit" class="signupbtn">
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
