import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import swal from "sweetalert2";




export const CreateProject = ({ 
    username = "",
    projectCreated,
    ctaText = "Create new project",
    butClass="upload-file-button",

}) => {
    const { store, actions } = useContext(Context);
    const [form, setForm] = useState(
        {
            title: "",
            description: "",
            username: [username]
        }
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        actions.createNewProject(form)
            .then(() => {
                if (projectCreated) {
                    projectCreated();
                    console.error("project created");
                }
            })
            .catch((error) => {
                console.error("Error creating the project:", error);
            });


    }

    useEffect(() => {
        setForm(form => ({ ...form, username }));
    }, [username]);

    return (
        <div>
            <button type="button" className={butClass} data-bs-toggle="modal" data-bs-target="#projectModal">
                {ctaText}
            </button>


            <div className="modal fade" id="projectModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Create new Project</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="d-flex flex-column" onSubmit={handleSubmit}>
                                <input className="form-input" type="text" name="title" value={form.title} onChange={handleInputChange} placeholder="Title" required />
                                <input className="form-input" type="text" name="description" value={form.description} onChange={handleInputChange} placeholder="Description" required />
                                <input className="form-input" type="text" name="username" value={form.username} onChange={handleInputChange} placeholder="Collaborators" required />
                                <button type="submit" className="form-button" data-bs-dismiss="modal">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}