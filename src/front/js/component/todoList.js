import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const TodoList = () => {
    const { store, actions } = useContext(Context);
    const [updatedComponent, setUpdatedComponent] = useState(false);
    const [todoState, setTodoState] = useState([]);
    const [todoInput, setTodoInput] = useState("")



    const handleInputTodoChange = (e) => {
        setTodoInput(e.target.value);
    };

    const newTodo = () => {
        const newTask = todoInput

        setTodoState((prev) => [...prev, newTask]);

        setTodoInput("");
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            newTodo();
            actions.addTaskToStore(todoState);

            console.log(store.todoList);
        }
    };



    return (
        <>
            <input className="form-input" type="text" name="todo_list" value={todoInput} onChange={handleInputTodoChange} onKeyDown={handleKeyDown} placeholder="Todo's" />
            <div>
                {todoState.length > 0 && <ul>
                    {todoState.map((todo, index) => (
                        <li key={index}>{todo}</li>
                    ))}
                </ul>}
            </div>


        </>
    )
};