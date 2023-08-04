import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import planioLogo from "../../img/planio-logo.png";
import { Avatar } from "@prismane/core";

export const Navbar = ({

	isPrivate,
	isLogin,

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
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">
						<img src={planioLogo} alt="Planio" width="30" height="24" />
					</a>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							{isLogin &&
								<>
									<li className="nav-item">
										<a className="nav-link active" aria-current="page" href="/login">Log in</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="/signup">Sign up</a>
									</li>
								</>
							}
							{isPrivate &&
								<>
									<li className="nav-item dropdown">
										<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
											Choose a project
										</a>
										<ul className="dropdown-menu">
											<li><a className="dropdown-item" href="#">Project 1</a></li>
											<li><a className="dropdown-item" href="#">Project 2</a></li>
											<li><a className="dropdown-item" href="#">Project 3</a></li>
										</ul>
									</li>
								</>

							}
						</ul>

						{isPrivate &&
							<>
								<form className="d-flex" role="search">
									<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
									<button className="btn btn-outline-success" type="submit">Search</button>
								</form>
								<div className="d-flex align-items-center">
									Nombre usuario
									<Avatar color="copper" size="sm" src="https://img.freepik.com/psd-premium/avatar-personaje-dibujos-animados-lindo-masculino-3d-aislado-renderizado-3d_235528-1290.jpg">MP</Avatar>
								</div>
							</>

						}
					</div>
				</div>
				<div className="p-2">{getButtonContent()}</div>
			</nav>
		);
	};
