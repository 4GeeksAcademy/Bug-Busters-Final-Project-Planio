import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import swal from "sweetalert2";
import { TodoList } from "./todoList";

export const CreateTask = ({ 

    projectId, 
    ctaText,
    butClass,

 }) => {
    const { store, actions } = useContext(Context);



    const [form, setForm] = useState(
        {
            title: "",
            description: "",
            due_at: "",
            todo_list: []
        }
    )

    // Todo LIST

    const [todoInput, setTodoInput] = useState("")

    const handleInputTodoChange = (e) => {
        setTodoInput(e.target.value);
    };

    const newTodo = () => {
        const newTask = todoInput

        setForm((prev) => ({ ...prev, todo_list: [...prev.todo_list, newTask] }));
        setTodoInput("");
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            newTodo();
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        console.log(form);

    };


    useEffect(() => {
        console.log('projectId changed:', projectId);

    }, [projectId]);

    // ----- FORM SUBMISSION 

    const handleSubmit = (e) => {
        e.preventDefault()

        actions.createNewTask(form, projectId)


    }

    const handleDelete = () => {
        setForm({
            title: "",
            description: "",
            due_at: "",
            todo_list: [],

        })

    }

    return (
        <div>
            <button type="button" className={butClass} data-bs-toggle="modal" data-bs-target={`#taskModal${projectId}`}>
                {ctaText}
            </button>


            <div className="modal fade" id={`taskModal${projectId}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Create new task</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleDelete}></button>
                        </div>
                        <div className="modal-body">
                            <form className="d-flex flex-column" onSubmit={handleSubmit}>
                                <input className="form-input" type="text" name="title" value={form.title} onChange={handleInputChange} placeholder="Title" required />
                                <input className="form-input" type="text" name="description" value={form.description} onChange={handleInputChange} placeholder="Description" required />
                                <input className="form-input" type="text" name="todo_list" value={todoInput} onChange={handleInputTodoChange} onKeyDown={handleKeyDown} placeholder="Todo's" />
                                <div>
                                    {form.todo_list.length > 0 && <ul>
                                        {form.todo_list.map((todo, index) => (
                                            <li key={index}>{todo}</li>
                                        ))}
                                    </ul>}
                                </div>
                                <input className="form-input" type="datetime-local" name="due_at" value={form.due_at} onChange={handleInputChange} placeholder="Due date" required />
                                <button type="submit" className="form-button" data-bs-dismiss="modal">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};