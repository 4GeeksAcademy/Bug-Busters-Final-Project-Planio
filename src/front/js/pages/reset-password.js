import React, { useContext, useState } from "react";
import { Context } from "../store/appContext"; 1
import "../../styles/home.css";

export const ResetPassword = () => {

    const { store, actions } = useContext(Context);

    const [passForm, setPassForm] = useState(
        {
            password: "",
            recovery_token: "",
        }
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPassForm({ ...passForm, [name]: value });
    };

    const handleSubmit = (e) => {
        actions.pass_recovery(passForm);
    };

    return <>
        <div className="text-center mt-5">
            <h1>Reestablecer contraseña</h1>
            <div className="sign-up-form container">
                <form className="d-flex flex-column" onSubmit={handleSubmit}>
                    <input className="form-input" type="password" name="password" value={passForm.password} onChange={handleInputChange} placeholder="Nueva contraseña" required />
                    <input className="form-input" type="text" name="recovery_token" value={passForm.recovery_token} onChange={handleInputChange} placeholder="Código de verificación" required />
                    <button className="form-button" type="submit">Actualizar contraseña</button>
                </form>
            </div>

        </div>
    </>
};
