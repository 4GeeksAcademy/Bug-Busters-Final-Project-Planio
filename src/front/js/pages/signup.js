import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
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

    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const { name, last_name, username, email, password } = form;
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&]).{8,}$/;

        if (!regex.test(password)) {
            swal.fire({ title: "Passwords is not valid!", text: "Make sure your password meets the requirements.", icon: "warning", confirmButtonColor: '#fa9643' });
            return;
        }


        actions.signupFunction(form);
        swal.fire({ title: "User successfully registered!", text: "Now you can organize your projects and tasks!.", icon: "success", confirmButtonColor: '#fa9643' }).then((result) => {
            if (result.isConfirmed) {
                navigate("/private-view");
            }
        });
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
                    <input className="form-input" type="password" name="password" data-value={form.password} onChange={handleInputChange} placeholder="Password" required />
                    <label htmlFor="password" className="password-label"> Password should be at least 8 characters long and must contain letters, numbers, and the specified special characters [!@#$%^&].</label>
                    <button className="form-button" type="submit">Sign Up</button>
                </form>
                <div className="d-flex text-center justify-content-around mt-5">
                    <p>Already have an account?</p> <Link className="text-emphasis" to="/login"><p className="text-emphasis">Login here!</p></Link>
                </div>
            </div>

        </div>
    </>

}

