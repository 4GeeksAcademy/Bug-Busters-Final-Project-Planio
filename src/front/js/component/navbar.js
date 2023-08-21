import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import planioLogo from "../../img/planio-logo.png";
import { Avatar, Badge } from "@prismane/core";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";


export const Navbar = () => {

	const location = useLocation();
	const navigate = useNavigate()
	const { store, actions } = useContext(Context);

	const userInfo = store.user_info[0];

	useEffect(() => {

		actions.getUserInfo()
			.then((userInfo) => {
				console.log(userInfo);
			})
			.catch((error) => {
				console.error(error);
			});

	}, []);

	const getButtonContent = () => {
		if (location.pathname === '/dashboard' || location.pathname === '/projects' || location.pathname === '/calendar' || location.pathname === '/tasks' || location.pathname === '/settings') {
			return <>
				<div className="navbar-collapse">

					<div className="searchBar">
						<form className="d-flex" role="search">
							<div className="input-group">
								<input type="text" className="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" />
								<span className="input-group-text" id="basic-addon1"><i className="fas fa-search" ></i></span>
							</div>
						</form>
					</div>
					<div className="projectSelector">
						<div className="btn-group">
							<button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
								<p>Projects</p>
								<i className="btnIcon fas fa-chevron-down"></i>
							</button>
							<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
								{userInfo.projects && userInfo.projects.map((project) => (
									<li key={project.id}>
										<a className="dropdown-item" href={`/tasks/${project.id}`}>{project.title}</a>
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className="notificationsIcon">
						<Badge label="4" color="ruby" size="xs">
							<i className="fas fa-bell"></i>
						</Badge>
					</div>
					<div className="userName d-flex align-items-center">
						<p>{userInfo.name}</p>
						<Avatar color="copper" size="sm" src="https://img.freepik.com/psd-premium/avatar-personaje-dibujos-animados-lindo-masculino-3d-aislado-renderizado-3d_235528-1290.jpg">MP</Avatar>
					</div>
					<div className="logoutIcon">
						<a onClick={() => {
							localStorage.removeItem("jwt-token"); navigate("/")
						}}>
							<i className="fas fa-sign-out-alt" style={{ color: "#d70404" }}></i>
						</a>

					</div>
				</div>


			</>
		}
		return <>

			<div className="loginOptions navbar-nav me-auto mb-2 mb-lg-0">
				<a className="nav-link mr-auto" href="/login">Log in</a>
				<a className="nav-link mr-auto" href="/signup">Sign up</a>
			</div>


		</>
	};

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">
					<img src={planioLogo} alt="Planio" />
				</a>
				<div className="container-fluid">
					{getButtonContent()}
				</div>
			</div>
		</nav>
	);
};
