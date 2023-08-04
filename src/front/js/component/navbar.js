import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {

	const location = useLocation();
	const navigate = useNavigate()

	const getButtonContent = () => {
		if (location.pathname === '/private-view') {
			return (
				<button className="btn btn-primary" onClick={() => {
					localStorage.removeItem("jwt-token"); navigate("/")
				}}>
					Logout
				</button>
			);
		}
		return null; // Retorna null para no renderizar el botón en otras vistas
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link className="text-link-black" to="/">
					<span className="navbar-brand mb-0 h1">Planio</span>
				</Link>
			</div>
			<div className="p-2">{getButtonContent()}</div>
		</nav>
	);
};
