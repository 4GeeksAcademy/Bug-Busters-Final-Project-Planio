import React, { useContext, useRef, useState } from "react";
import { Context } from "../store/appContext";


export const UploadFile = ({ projectId }) => {
    const { store, actions } = useContext(Context);
    const inputRef = useRef();
    const [fileLabelName, setFileLabelName] = useState("")

    const handleClick = () => {

        inputRef.current.click();
    };

    const handleFileChange = (e) => {
        const fileObj = e.target.files && e.target.files[0];
        if (!fileObj) {
            return;
        };

        actions.uploadFile(fileObj, projectId)

        e.target.value = null;
        setFileLabelName(fileObj.name)
    };

    const handleClickDeleteFile = () => {
        if (inputRef) {
            inputRef.current.value = "";
            setFileLabelName("")

        }
    };

    return (
        <div className="upload-file-button-container container d-flex flex-column">
            <input style={{ display: 'none' }} ref={inputRef} type="file" onChange={handleFileChange} />

            <button onClick={handleClick} className="upload-file-button">Upload file</button>
            <label className="upload-file-button-label" onClick={handleClickDeleteFile}>{fileLabelName && `${fileLabelName} click to remove`}</label>
        </div>
    );


};