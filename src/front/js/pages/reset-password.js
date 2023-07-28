import React, { useContext, useState } from "react";
import { Context } from "../store/appContext"; 1
import "../../styles/home.css";

export const ResetPassword = () => {

    const { store, actions } = useContext(Context);

    const [form, setForm] = useState(
        {
            password: ""
        }
    );

    const handleInputChange = (e) => {
        const { password, value } = e.target;
        setForm({ ...form, [password]: value });
    };

    const handleSubmit = (e) => {
        actions.signupFunction(form);
    };

    return <>
        <div className="text-center mt-5">
            <h1>Reestablecer contraseña</h1>
            <div className="sign-up-form container">
                <form className="d-flex flex-column" onSubmit={handleSubmit}>
                    <input className="form-input" type="password" name="password" value={form.password} onChange={handleInputChange} placeholder="Nueva contraseña" required />
                    <input className="form-input" type="password" name="password" value={form.password} onChange={handleInputChange} placeholder="Repite nueva contraseña" required />
                    <button className="form-button" type="submit">Aceptar</button>
                </form>
            </div>

        </div>
    </>
};
