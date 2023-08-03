import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import swal from 'sweetalert2'
import "../../styles/home.css";


export const Signup = () => {

    const { store, actions } = useContext(Context);

    const [form, setForm] = useState(
        {
            name: "",
            last_name: "",
            username: "",
            email: "",
            password: ""
        }
    );


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        const { name, last_name, username, email, password } = form;
        const regex = /[!@#$%^&*]/;

        if (password.length < 8 && !regex.test(password)) {
            swal.fire({ title: "Passwords is not valid!", text: "Make sure your password meets the requirements.", icon: "warning", confirmButtonColor: '#fa9643' });
            return;
        }


        actions.signupFunction(form);
    };


    return <>
        <div className="text-center mt-5">
            <h1>Sign up</h1>
            <div className="sign-up-form container">
                <form className="d-flex flex-column" onSubmit={handleSubmit}>
                    <input className="form-input" type="text" name="name" value={form.name} onChange={handleInputChange} placeholder="Name" required />
                    <input className="form-input" type="text" name="last_name" value={form.last_name} onChange={handleInputChange} placeholder="Last name" required />
                    <input className="form-input" type="text" name="username" value={form.username} onChange={handleInputChange} placeholder="Username" required />
                    <input className="form-input" type="email" name="email" value={form.email} onChange={handleInputChange} placeholder="Email" required />
                    <input className="form-input" type="password" name="password" value={form.password} onChange={handleInputChange} placeholder="Password" required />
                    <button className="form-button" type="submit">Sign Up</button>
                </form>
                <div className="d-flex text-center justify-content-around mt-5">
                    <p>Already have an account?</p> <Link className="text-emphasis" to="/login"><p className="text-emphasis">Login here!</p></Link>
                </div>
            </div>

        </div>
    </>

}

