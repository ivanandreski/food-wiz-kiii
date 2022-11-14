import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

const NotAuthenticated = ({ handleLogin, handleSignup }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignup] = useState(false);

  const login = (email, password) => {
    setShowLogin(false);
    handleLogin(email, password);
  };

  const signup = (email, password, fullName) => {
    setShowSignup(false);
    handleSignup(email, password, fullName);
  };

  return (
    <>
      <button
        id="login"
        className="btn btn-primary"
        onClick={() => setShowLogin(true)}
      >
        Log in
      </button>

      <button
        id="signup"
        className="btn btn-secondary ml-2"
        onClick={() => setShowSignup(true)}
      >
        Sign up
      </button>

      <Modal show={showLogin} onHide={() => setShowLogin(false)}>
        <LoginModal setShowLogin={setShowLogin} login={login} />
      </Modal>

      <Modal show={showSignUp} onHide={() => setShowSignup(false)}>
        <SignUpModal setShowSignup={setShowSignup} signup={signup} />
      </Modal>
    </>
  );
};

export default NotAuthenticated;
