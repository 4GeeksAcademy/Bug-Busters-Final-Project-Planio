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
                <img src="https://bug-busters-planio-bucket-demostration.s3.amazonaws.com/planio-logo-png.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXYLU2MAGUBRWUAAP%2F20230808%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20230808T161037Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=5c00e4dfeae0ca3e1e33ab61c5cf5f0ba51526ad286513706a47aeaef8c6f8ad" />
                <div className="mt-5 mb-5"> <a href="https://bug-busters-planio-bucket-demostration.s3.amazonaws.com/4Geeks_restAPI.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXYLU2MAGUBRWUAAP%2F20230808%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20230808T161209Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=81358ba3cbc60be9aa24c685030d0a637b2dfae620a008f70bd9ad03ec39506e" target="_blank">YOUR PDF FILE</a></div>
            </div>

        );
    }
};
