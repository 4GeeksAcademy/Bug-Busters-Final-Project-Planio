import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/settings.css";




export const Settings = () => {
    const { store, actions } = useContext(Context);
    const validated_token = actions.is_token_valid();
    const [updatedComponent, setUpdatedComponent] = useState(false);
    const [disabledInput, setDisabledInput] = useState(true)
    const [emailForm, setEmailForm] = useState(
        {
            emailPassword: ""
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
        setDisabledInput(!disabledInput)

        if (disabledInput === false) {
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
        setDisabledInput(!disabledInput)



    }

    return (<>
        <div className="tasks p-4">
            <h1>Account Settings</h1>
            <section className="mt-5 settings-wrapper">
                <h2>Profile</h2>
                <div className="row">
                    <div className="col">
                        <form className="d-flex flex-column" onSubmit={handleSubmit}>
                            <input className="form-input" type="text" name="name" value={form.name} onChange={handleInputChange} placeholder="Name" required disabled={disabledInput} />
                            <input className="form-input" type="text" name="last_name" value={form.last_name} onChange={handleInputChange} placeholder="Last name" required disabled={disabledInput} />
                            <input className="form-input" type="text" name="username" value={form.username} onChange={handleInputChange} placeholder="Username" required disabled={disabledInput} />
                            <input className="form-input" type="email" name="email" value={form.email} onChange={handleInputChange} placeholder="Email" required disabled={disabledInput} />
                            <div className="d-flex gap-3">
                                <button type="submit" className="primary-button">Save</button>
                                <button type="button" className="primary-button" onClick={handleDisabled}>{disabledInput ? "Edit Profile" : "Cancel"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <section className="mt-5 settings-wrapper">
                <h2>Change Password</h2>
                <div className="row">
                    <div className="col">
                        <form className="d-flex flex-column" onSubmit={handleSubmitPassword}>
                            <input className="form-input" type="email" name="emailPassword" onChange={handleInputEmailChange} value={emailForm.email} placeholder="Email" required />
                            <label htmlFor="emailPassword" className="password-label"> A recovery token will be send to the provided email.</label>


                            <button className="form-button w-50" type="submit">Send recovery token</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>


    </>)
}