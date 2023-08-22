import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import swal from 'sweetalert2'




export const DeleteTaskButton = ({ task_id, onDeleteCompleted }) => {
    const { store, actions } = useContext(Context);
    

    const handleClick = async () => {
        const result = await swal.fire({
            title: 'Are you sure?',
            text: 'This task will be permanently deleted from this project.',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            icon: 'warning',
            denyButtonText: `Cancel`,
            confirmButtonColor: '#D40000',
            denyButtonColor: 'gray'
        });

        if (result.isConfirmed) {
            try {
                console.log(["This is handleclick", task_id])
                const response = await actions.deleteTask(task_id);

                if (response === 200) {
                    swal.fire({ title: 'Your task was deleted', icon: 'success', confirmButtonColor: '#fa9643' });
                   
                        if (onDeleteCompleted) {
                            onDeleteCompleted();
                        }
                } else {
                    swal.fire({ title: 'Failed to delete task', text: 'An error occurred while deleting the task', icon: 'error', confirmButtonColor: '#fa9643' });
                }
            } catch (error) {
                console.error('Error deleting task:', error);
                swal.fire('Error', 'An error occurred while deleting the task', 'error');
            }
        }
    };




    return (
        <button className="primary-button" type="button" onClick={handleClick}>Delete</button>
    )

}