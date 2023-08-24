import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import swal from "sweetalert2";




export const TaskModal = ({
    username = "",
    projectCreated,
    ctaText = "View task",
    butClass = "addNew",

}) => {
    const { store, actions } = useContext(Context);
    const [form, setForm] = useState(
        {
            title: "",
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
            <button type="button" className={butClass} data-bs-toggle="modal" data-bs-target={`#taskModal`}>
                <i className="addIcon fa-solid fa-ellipsis"></i>
            </button>


            <div className="modal fade" id="taskModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="task-todo-list">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Todo 1
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                    <label className="form-check-label" htmlFor="flexCheckChecked">
                                        Todo 2
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Todo 3
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                    <label className="form-check-label" htmlFor="flexCheckChecked">
                                        Todo 4
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}