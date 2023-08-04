import React, { useContext, useState } from "react";
import { Context } from "../store/appContext"; 1
import "../../styles/home.css";
import swal from 'sweetalert2';

export const ResetPassword = () => {

    const { store, actions } = useContext(Context);

    const [passForm, setPassForm] = useState(
        {
            new_password: "",
            new_password2: "",
            recovery_token: "",
        }
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPassForm({ ...passForm, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { new_password, new_password2, recovery_token } = passForm;


        if (new_password !== new_password2) {
            swal.fire({ title: "Passwords doesn't match!", text: "Make sure both password fields are the same.", icon: "warning", confirmButtonColor: '#fa9643' });
            return;
        }

        actions.pass_recovery(passForm);
        setPassForm({
            password1: "",
            password2: "",
            recovery_token: "",
        });
    };

    return <>
        <div className="text-center mt-5">
            <h1>Restore your password</h1>
            <div className="sign-up-form container">
                <form className="d-flex flex-column" onSubmit={handleSubmit}>
                    <input className="form-input" type="password" name="new_password" value={passForm.new_password} onChange={handleInputChange} placeholder="New password" required />
                    <input className="form-input" type="password" name="new_password2" value={passForm.new_password2} onChange={handleInputChange} placeholder="Confirm new password" required />

                    <input className="form-input" type="text" name="recovery_token" value={passForm.recovery_token} onChange={handleInputChange} placeholder="Recovery token" required />
                    <button className="form-button" type="submit">Actualizar contraseña</button>
                </form>
            </div>

        </div>
    </>
};
