import React, { useContext, useState } from "react";
import { Context } from "../store/appContext"; 1
import "../../styles/home.css";

export const ForgotPassword = () => {

  const { store, actions } = useContext(Context);

  const [form, setForm] = useState(
    {
      email: ""
    }
  );

  const handleInputChange = (e) => {
    const { email, value } = e.target;
    setForm({ ...form, [email]: value });
  };

  const handleSubmit = (e) => {
    actions.signupFunction(form);
  };

  return <>
    <div className="text-center mt-5">
      <h1>Recuperar contraseña</h1>
      <div className="sign-up-form container">
        <form className="d-flex flex-column" onSubmit={handleSubmit}>
          <input className="form-input" type="email" name="email" value={form.email} onChange={handleInputChange} placeholder="Introduce tu email" required />
          <button className="form-button" type="submit">Aceptar</button>
        </form>
      </div>

    </div>
  </>
};
