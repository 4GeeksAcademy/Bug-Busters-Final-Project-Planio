import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/settings.css";
import swal from "sweetalert2";




export const Settings = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const validated_token = actions.is_token_valid();
    const [updatedComponent, setUpdatedComponent] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true)
    const [emailForm, setEmailForm] = useState(
        {
            email: ""
        }
    );



    const handleInputEmailChange = (e) => {
        const { name, value } = e.target;
        setEmailForm({ ...emailForm, [name]: value });
    };

    const handleSubmitPassword = (e) => {
        e.preventDefault()
        actions.guardar_email(emailForm);
    };



    const userInfo = store.user_info[0];

    useEffect(() => {
        if (!validated_token) {
            swal.fire({ title: "You must log in", text: "You will be redirected to login.", icon: "error", confirmButtonColor: '#fa9643' }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login");
                }
            });
        } else {
            actions.getUserInfo()
                .then((userInfo) => {
                    setForm({
                        name: userInfo?.name,
                        last_name: userInfo.last_name,
                        username: userInfo?.username,
                        email: userInfo?.email,
                        user_id: userInfo?.id
                    })
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [validated_token, updatedComponent]);

    const [form, setForm] = useState({
        name: "",
        last_name: "",
        username: "",
        email: ""
    })


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleDisabled = () => {
        setIsDisabled(!isDisabled)

        if (isDisabled === false) {
            setForm({
                name: userInfo?.name,
                last_name: userInfo.last_name,
                username: userInfo?.username,
                email: userInfo?.email,
                user_id: userInfo?.id
            })
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        actions.updateUser(form)
        setIsDisabled(!isDisabled)



    }


    const handleDeleteAccount = async () => {

        const result = await swal.fire({
            title: 'Are you sure?',
            text: 'Deleting your account will permanently remove all your data and cannot be undone, are you sure you want to continue?',
            showDenyButton: true,
            confirmButtonText: "Yes, I'm ready!",
            icon: 'warning',
            denyButtonText: `Nah, I'm joking.`,
            confirmButtonColor: '#cc0202',
            denyButtonColor: '#bcbcbc'
        });

        if (result.isConfirmed) {
            const { value: password } = await swal.fire({
                title: 'Enter your password',
                input: 'password',
                inputLabel: 'Password',
                confirmButtonColor: '#cc0202',
                confirmButtonText: "Delete Account",
                inputPlaceholder: 'Enter your password',
                inputAttributes: {
                    maxlength: 10,
                    autocapitalize: 'off',
                    autocorrect: 'off'
                }
            })

            if (password) {
                console.log(typeof password)
                const user_id = userInfo.id
                const response = await actions.deleteUser(user_id, password)
                if (response.msg === "User successfully deleted.") {
                    swal.fire({ title: "Account Successfully Deleted", text: "We hope to have you back!.", icon: "success", confirmButtonColor: '#fa9643' }).then((result) => {
                        if (result.isConfirmed) {
                            navigate("/");
                        }
                    });
                }
            }
        }
    };

    return (<>
        <div className="tasks p-4">
            <h1>Account Settings</h1>
            <div className="d-flex justify-content-center gap-2">
                <section className="mt-5 settings-wrapper col-4">
                    <h2>Profile</h2>

                    <form className="d-flex flex-column" onSubmit={handleSubmit}>
                        <input className="form-input" type="text" name="name" value={form.name} onChange={handleInputChange} placeholder="Name" required disabled={isDisabled} />
                        <input className="form-input" type="text" name="last_name" value={form.last_name} onChange={handleInputChange} placeholder="Last name" required disabled={isDisabled} />
                        <input className="form-input" type="text" name="username" value={form.username} onChange={handleInputChange} placeholder="Username" required disabled={isDisabled} />
                        <input className="form-input" type="email" name="email" value={form.email} onChange={handleInputChange} placeholder="Email" required disabled={isDisabled} />
                        <div className="d-flex gap-3">
                            <button type="submit" className={`${isDisabled ? "disabled-button" : "primary-button"}`} disabled={isDisabled}>Save</button>
                            <button type="button" className="primary-button" onClick={handleDisabled}>{isDisabled ? "Edit Profile" : "Cancel"}</button>
                        </div>
                    </form>

                </section>

                <section className="mt-5 settings-wrapper col-4">


                    <form className="d-flex flex-column justify-content-between h-100" onSubmit={handleSubmitPassword}>

                        <div>
                            <h2>Change Password</h2>
                            <input className="form-input" type="email" name="email" onChange={handleInputEmailChange} value={emailForm.email} placeholder="Email" required />
                            <label htmlFor="email" className="password-label"> A recovery token will be send to the provided email.</label>
                        </div>


                        <button className="form-button w-50 align-bottom" type="submit">Send recovery token</button>
                    </form>

                </section>

                <section className="mt-5 settings-wrapper col-4 ">
                    <div className="d-flex flex-column justify-content-between h-100">
                        <div className="justify-content-between">
                            <h2 className="d-flex justify-content-between">
                                Delete Account
                                <i className="fa-solid fa-triangle-exclamation danger-color"></i>
                            </h2>
                            <p className="warning-message">
                                <strong>Warning:</strong> Deleting your account will permanently remove all your data and cannot be undone.
                            </p>
                        </div>

                        <button className="danger-color-btn w-50" type="button" onClick={handleDeleteAccount}>Delete Account</button>
                    </div>

                </section>
            </div>

        </div>




    </>)
}