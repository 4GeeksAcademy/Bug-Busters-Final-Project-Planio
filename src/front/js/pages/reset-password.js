import React, { useContext, useState } from "react";
import { Context } from "../store/appContext"; 1
import "../../styles/home.css";

export const ResetPassword = () => {

    const { store, actions } = useContext(Context);

    const [passForm, setPassForm] = useState(
        {
            password: "",
            recovery_code: "",
        }
    );

    const handleInputChange = (e) => {
        const { password, value } = e.target;
        setPassForm({ ...passForm, [password]: value });
    };

    const handleSubmit = (e) => {
        actions.pass_recovery(passForm);
    };

    return <>
        <div className="text-center mt-5">
            <h1>Reestablecer contraseña</h1>
            <div className="sign-up-form container">
                <form className="d-flex flex-column" onSubmit={handleSubmit}>
                    <input className="form-input" type="password" name="password" onChange={handleInputChange} placeholder="Nueva contraseña" required />
                    <input className="form-input" type="text" name="code" onChange={handleInputChange} placeholder="Código de verificación" required />
                    <button className="form-button" type="submit">Actualizar contraseña</button>
                </form>
            </div>

        </div>
    </>
};
