import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import swal from 'sweetalert2'

export const DeleteProjectButton = ({ projectId, onDeleteCompleted }) => {
    const { store, actions } = useContext(Context);


    const handleClick = async () => {
        const result = await swal.fire({
            title: 'Are you sure?',
            text: 'This project will be permanently deleted, this action is permanent.',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            icon: 'warning',
            denyButtonText: `Cancel`,
            confirmButtonColor: '#cc0202',
            denyButtonColor: '#bcbcbc'
        });

        if (result.isConfirmed) {
            try {
                const response = await actions.deleteProject(projectId);

                if (response === 200) {
                    swal.fire({ title: 'Your project was deleted', icon: 'success', confirmButtonColor: '#fa9643' });

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
        <button className="delete-project-button " type="button" onClick={handleClick}>Delete <i className="fa-regular fa-trash-can ms-2"></i></button>
    )
}