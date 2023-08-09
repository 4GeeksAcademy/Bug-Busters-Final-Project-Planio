import React, { useContext } from "react";
import { Context } from "../store/appContext";
import planioImg1 from "../../img/planio-home-1.jpg";
import planioImg2 from "../../img/planio-home-2.jpg";
import planioImg3 from "../../img/planio-home-3.jpg";
import planioImg4 from "../../img/planio-home-4.jpg";
import planioImg5 from "../../img/planio-home-5.jpg";
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
			<div className="container fade-in-img">
				<div className="row align-items-end">
					<div className="col">
						<img src={planioImg1} alt="..." />
					</div>
					<div className="col">
						<img src={planioImg2} alt="..." />
					</div>
					<div className="col">
						<img src={planioImg3} className="img-fluid" alt="..." />
					</div>
					<div className="col">
						<img src={planioImg4} className="img-fluid" alt="..." />
					</div>
					<div className="col">
						<img src={planioImg5} className="img-fluid" alt="..." />
					</div>
				</div>
			</div>

		</div>
	);
};
