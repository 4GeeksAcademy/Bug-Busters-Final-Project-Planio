import React, { useContext } from "react";
import { Context } from "../store/appContext";
import planioLogo from "../../img/planio-logo-png.png";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 home">
			<div className="home-title">
				<h1>Easy way to get full control of your tasks</h1>
				<p>
					The joyful productivity app. Schedule time for todos, events and contacts.
				</p>

			</div>
			<Link className="home-button" to="/signup">
				<span>Sign up here!</span>
			</Link>
			<div class="container fade-in-img">
				<div class="row align-items-end">
					<div class="col">
						<img src="../../planio-home-1.png"  alt="..." />
					</div>
					<div class="col">
						<img src="../../img/planio-home-1.png" className="img-fluid" alt="..." />
					</div>
					<div class="col">
						<img src="../../img/planio-home-1.png" className="img-fluid" alt="..." />
					</div>
					<div class="col">
						<img src="../../img/planio-home-1.png" className="img-fluid" alt="..." />
					</div>
					<div class="col">
						<img src="../../img/planio-home-1.png" className="img-fluid" alt="..." />
					</div>
				</div>
			</div>

		</div>
	);
};
