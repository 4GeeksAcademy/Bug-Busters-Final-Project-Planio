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
      <h1>Recuperar contraseña</h1>
      <p>Introduce tu email y te enviaremos un código de verificación para reestablecer tu contraseña.</p>
      <div className="sign-up-form container">
        <form className="d-flex flex-column" onSubmit={handleSubmit}>
          <input className="form-input" type="email" name="email" onChange={handleInputChange} value={emailForm.email} placeholder="Introduce tu email" required />
          <button className="form-button" type="submit">Enviar código de verificación</button>
        </form>
      </div>

    </div>
  </>
};
