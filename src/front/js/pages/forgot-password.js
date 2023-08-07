import React, { useContext, useState } from "react";
import { Context } from "../store/appContext"; 1
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {

  const { store, actions } = useContext(Context);

  const [emailForm, setEmailForm] = useState(
    {
      email: ""
    }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailForm({ ...emailForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    actions.guardar_email(emailForm);
  };

  return <>
    <div className="text-center mt-5">
      <h1>Change or reset your password</h1>
      <p>Enter your email and we'll send you a link to reset your password</p>
      <div className="sign-up-form container">
        <form className="d-flex flex-column" onSubmit={handleSubmit}>
          <input className="form-input" type="email" name="email" onChange={handleInputChange} value={emailForm.email} placeholder="email" required />
          <button className="form-button" type="submit">Send recovery token</button>
        </form>
        <div className="d-flex text-center justify-content-center gap-1 mt-5">
          <p>Or</p> <Link className="text-emphasis" to="/"><p className="text-link-black">go back.</p></Link>
        </div>
      </div>

    </div>
  </>
};
