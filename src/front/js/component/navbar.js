import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import planioLogo from "../../img/planio-logo.png";
import { Avatar, Badge } from "@prismane/core";
import "../../styles/navbar.css";


export const Navbar = (

	isPrivate = false,

) => {

	const location = useLocation();
	const navigate = useNavigate()

	const getButtonContent = () => {
		if (location.pathname === '/login') {
			return <>

				<div className="searchBar">
					<form className="d-flex" role="search">
						<div className="input-group">
							<input type="text" className="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" />
							<span className="input-group-text" id="basic-addon1"><i className="fas fa-search" ></i></span>
						</div>
					</form>
				</div>
				<div className="projectSelector">
					<div class="btn-group">
						<button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
							<p>Proyecto</p>
							<i class="btnIcon fas fa-chevron-down"></i>
						</button>
						<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
							<li><a class="dropdown-item" href="#">Proyecto 1</a></li>
							<li><a class="dropdown-item" href="#">Proyecto 2</a></li>
							<li><a class="dropdown-item" href="#">Proyecto 3</a></li>
						</ul>
					</div>
				</div>
				<div className="notificationsIcon">
					<Badge label="4" color="ruby" size="xs">
						<i class="fas fa-bell"></i>
					</Badge>
				</div>
				<div className="userName d-flex align-items-center">
					<p>Nombre usuario</p>
					<Avatar color="copper" size="sm" src="https://img.freepik.com/psd-premium/avatar-personaje-dibujos-animados-lindo-masculino-3d-aislado-renderizado-3d_235528-1290.jpg">MP</Avatar>
				</div>
				<div className="logoutIcon">
					<a onClick={() => {
						localStorage.removeItem("jwt-token"); navigate("/")
					}}>
						<i className="fas fa-sign-out-alt" style={{ color: "#d70404" }}></i>
					</a>

				</div>


			</>
		}
		return <>

			<div className="loginOptions navbar-nav me-auto mb-2 mb-lg-0">
				<a className="nav-link" href="/login">Log in</a>
				<a className="nav-link" href="/signup">Sign up</a>
			</div>


		</>
	};

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">
					<img src={planioLogo} alt="Planio" />
				</a>
				<div className="collapse navbar-collapse justify-content-end">
					{getButtonContent()}
				</div>
			</div>
		</nav>
	);
};
