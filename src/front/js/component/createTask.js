import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import swal from "sweetalert2";
import { TodoList } from "./todoList";

export const CreateTask = () => {
    const { store, actions } = useContext(Context);
    const [form, setForm] = useState(
        {
            title: "",
            description: "",
            due_at: "",
            todo_list: [],
            project_id: 0
        }
    )

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <div className="mt-5">
            <button type="button" className="form-button mb-5" data-bs-toggle="modal" data-bs-target="#taskModal">
                Create new task
            </button>


            <div className="modal fade" id="taskModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Create new task</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="d-flex flex-column">
                                <input className="form-input" type="text" name="title" value={form.title} onChange={handleInputChange} placeholder="Title" required />
                                <input className="form-input" type="text" name="description" value={form.description} onChange={handleInputChange} placeholder="Description" required />
                                <TodoList />
                                <input className="form-input" type="datetime-local" name="due_date" value={form.due_at} onChange={handleInputChange} placeholder="Due date" required />
                                <button type="submit" className="form-button" data-bs-dismiss="modal">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};