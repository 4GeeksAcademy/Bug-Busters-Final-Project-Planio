import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Modal } from "react-bootstrap";
import { SearchBarUser } from "./searchBarUser";

export const AddCollaborator = ({ showModal, handleCloseModal, usersList, projectId }) => {
    const { store, actions } = useContext(Context);

    const [filteredUsers, setFilteredUsers] = useState([]);
    const [teamList, setTeamList] = useState([]);

    const handleSearch = (searchTerm) => {
        const lowercaseSearchTerm = searchTerm.toLowerCase();
        if (lowercaseSearchTerm.trim() === "") {
            setFilteredUsers([]);
            return;
        }

        const filtered = usersList.filter(
            (user) =>
                user.username.toLowerCase().includes(lowercaseSearchTerm) ||
                user.email.toLowerCase().includes(lowercaseSearchTerm)
        );
        setFilteredUsers(filtered);
    };

    const handleTeamList = (user) => {
        if (!teamList.some(item => item.username === user.username)) {
            setTeamList((prev) => [...prev, user]);
        }
    };

    const resetTeamList = () => {
        setTeamList([]);
        setFilteredUsers([]);
    }

    const addCollaboratorToProject = async () => {
        try {
            const usernames = teamList.map(user => user.username);
            const response = await actions.addCollaborator(usernames, projectId);

            console.log([response, "this is log from await test"])
            resetTeamList();
            handleCloseModal();
        } catch (error) {
            console.error(error);
            // Manejo de errores si es necesario
        }
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header>
                <Modal.Title>Add Team Members to this project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <SearchBarUser onSearch={handleSearch} />
                    <div>
                        {teamList.length > 0 ? (
                            <ul className="d-flex gap-1 list-unstyled mt-2">
                                {teamList.map((member, index) => (
                                    <div key={index} className="tag-wrapper">
                                        <li>{member.username}</li>
                                    </div>
                                ))}
                            </ul>
                        ) : (<div></div>)}
                    </div>
                    {filteredUsers.length > 0 ? (
                        <ul className="list-group mt-2 ">
                            {filteredUsers.map((user, index) => (
                                <li key={index} className="list-group-item custom-list-group-item-action" onClick={() => { handleTeamList(user) }}>
                                    <strong>{user.username}</strong>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p></p>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer className="custom-modal-footer d-flex gap-2">
                <button className="primary-button" onClick={() => { addCollaboratorToProject(); resetTeamList(); handleCloseModal() }}>
                    Add Member
                </button>
                <button className="btn btn-secondary" onClick={() => { handleCloseModal(); resetTeamList() }}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
};


