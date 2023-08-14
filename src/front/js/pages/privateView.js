import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import swal from "sweetalert2";
import "../../styles/home.css";

export const PrivateView = () => {
    const { store, actions } = useContext(Context);
    const validated_token = actions.is_token_valid();
    const navigate = useNavigate();

    const userInfo = store.user_info[0];



    useEffect(() => {

        if (!validated_token) {
            swal.fire({ title: "You must log in", text: "bla bla bla bla.", icon: "error", confirmButtonColor: '#fa9643' }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login");
                }
            });
        } else {
            actions.getUserInfo()
                .then((userInfo) => {
                    console.log('%cUser info successfully retrieved', 'color: cyan; background: black; font-size: 20px');
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    if (!validated_token) {
        return null;
    }

    if (validated_token) {
        return (
            <div className="text-center mt-5">
                <h1>DASHBOARD</h1>
                <h2>Hi, {userInfo.name}</h2>

                <h1>Your projects below:</h1>
                {userInfo.projects && userInfo.projects.map((project) => (
                    <div key={project.id} className="mt-5">
                        <h2>{project.title}</h2>
                        <h5>{project.description}</h5>
                    </div>

                ))}
            </div>
        );
    }
};

