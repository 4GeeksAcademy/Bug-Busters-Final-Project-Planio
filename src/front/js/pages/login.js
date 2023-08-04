import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";


export const Login = () => {

    const { store, actions } = useContext(Context);
    const [form, setForm] = useState(
        {
            email: "",
            password: ""
        }
    );

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        actions.loginFunction(form)
            .then((data) => {
                if (data) { navigate("/private-view"); }
            });
    };



    return <>
        <div className="text-center mt-5">
            <h1>Login</h1>
            <div className="sign-up-form container">
                <form className="d-flex flex-column" onSubmit={handleSubmit}>
                    <input className="form-input" type="email" name="email" value={form.email} onChange={handleInputChange} placeholder="Email" required />
                    <input className="form-input" type="password" name="password" value={form.password} onChange={handleInputChange} placeholder="Password" required />
                    <button className="form-button" type="submit">Login</button>
                    <Link className="mt-3 text-link-black" to="/forgot-password"><p>Forgot your password?</p></Link>
                </form>
                <div className="d-flex text-center justify-content-around mt-5">
                    <p>Are you not registered?</p> <Link className="text-emphasis" to="/signup"><p className="text-emphasis">Sign up here!</p></Link>
                </div>
            </div>

        </div>
    </>
};
