import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/dashboard.css";
import { AddCollaborator } from "./addCollaborator"; // Asegúrate de proporcionar la ruta correcta
import { DeleteProjectButton } from "./deleteProjectButton";

export const ProjectOptions = ({ projectId, onDeleteCompleted }) => {
    const { store, actions } = useContext(Context);
    const [updatedComponent, setUpdatedComponent] = useState(false);
    const [showModal, setShowModal] = useState(false);


    const handleIconClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {

        setShowModal(false);
    };

    return (
        <>
            <div className="dropdown">
                <button
                    className="project-option-button"
                    type="button"
                    id="projectOptionsDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="true"
                >
                    <i className="addIcon fa-solid fa-ellipsis"></i>
                </button>

                <ul className="dropdown-menu" aria-labelledby="projectOptionsDropdown">
                    <li className="dropdown-item" onClick={handleIconClick}>
                        Add Collaborator
                    </li>
                    <li className="dropdown-item text-danger">
                        <DeleteProjectButton projectId={projectId} onDeleteCompleted={onDeleteCompleted} />
                    </li>
                </ul>
            </div>

            <AddCollaborator
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                usersList={store?.users_list}
                projectId={projectId}

            />
        </>
    );
};
