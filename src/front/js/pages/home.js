import React, { useContext } from "react";
import { Context } from "../store/appContext";
import planioLogo from "../../img/planio-logo-png.png";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 fade-in-title">
			<h1>Welcome to</h1>
			<p className="fade-in-image">
				<img src={planioLogo} />

			</p>
			<iframe src="https://giphy.com/embed/l0MYSqNU3hr8MUq0o" width="480" height="161" className="giphy-embed fade-in-img2" allowFullScreen></iframe>
			<div className="fade-in-img2">
				<div className="d-flex container gap-3 justify-content-center mt-5">
					<p>Already have an account?</p> <Link className="text-emphasis" to="/login"><p className="text-emphasis">Login here!</p></Link>
				</div>
				<div className="d-flex container gap-3 justify-content-center">
					<p>Are you not registered?</p> <Link className="text-emphasis" to="/signup"><p className="text-emphasis">Sign up here!</p></Link>
				</div>
			</div>

		</div>
	);
};
