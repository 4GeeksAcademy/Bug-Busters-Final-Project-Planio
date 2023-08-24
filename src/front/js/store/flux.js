import swal from 'sweetalert2';
import jwtDecode from 'jwt-decode';



const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user_info: [{ name: "", email: "" }],
			users_usernames: [""]
		},
		actions: {
			getAllUsers: async () => {
				const store = getStore();

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
						method: "GET"
					});

					if (!response.ok) {
						throw new Error("There was a problem retrieving the users data.")
					}

					const data = await response.json();
					const usernames = data.map(user => user.username);
					setStore({ users_usernames: usernames });
					console.log(store.users_usernames);


				} catch (error) {
					console.error(error);
				}
			},
			signupFunction: async (form) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ name: form.name, last_name: form.last_name, username: form.username, email: form.email, password: form.password })
					});

					if (!response.ok) {
						throw new Error("There was a problem with Sign up process, please try again.")
					}

					const data = await response.json();
					localStorage.setItem("jwt-token", data.token);
					console.log(data);

					return data;

				} catch (error) {
					console.error(error);


				}
			},
			guardar_email: async (emailForm) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/forgot-password`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email: emailForm.email, })
					});

					if (!response.ok) {
						throw new Error("There was a problem saving the email, please try again.")
					}

					const data = await response.json();
					localStorage.setItem("user_id", data.user_id);
					swal.fire({ title: "Email sent successfully!", text: "Check your email for the verification code.", icon: "success", confirmButtonColor: '#fa9643' });



					return data;

				} catch (error) {
					console.error(error);
					swal.fire({ title: "There was an error!", text: "Make sure your email is correct or registered.", icon: "error", confirmButtonColor: '#fa9643' });

				}
			},
			pass_recovery: async (passForm) => {
				let user_id = localStorage.getItem("user_id")

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/reset-password/${user_id}`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ new_password: passForm.new_password, recovery_token: passForm.recovery_token })
					});

					if (!response.ok) {
						throw new Error("Something went wrong, please try again.")
					}

					const data = await response.json();
					swal.fire({ title: "Password successfully updated!", text: "You can login now.", icon: "success", confirmButtonColor: '#fa9643' });


					return data;

				} catch (error) {
					console.error(error);
					swal.fire({ title: "There was an error!", text: "Make sure you are typing a valid recovery token.", icon: "error", confirmButtonColor: '#fa9643' });


				}

			},
			loginFunction: async (form) => {
				const store = getStore();

				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email: form.email, password: form.password })
					});

					if (!resp.ok) {
						throw new Error("There was a problem in the login request");
					}

					const data = await resp.json();
					localStorage.setItem("jwt-token", data.token);



					return data;
				} catch (error) {
					console.error(error);
					swal.fire({ title: "Invalid user or password", text: "Make sure you are typing a valid user or password.", icon: "error", confirmButtonColor: '#fa9643' });
				}
			},
			is_token_valid: () => {
				const token = localStorage.getItem('jwt-token');
				if (token) {
					const decodedToken = jwtDecode(token);
					const currentTime = Date.now() / 1000;
					return decodedToken.exp > currentTime;
				}
				return false;
			},
			getUserInfo: async () => {
				const token = localStorage.getItem("jwt-token");
				const store = getStore();

				return fetch(`${process.env.BACKEND_URL}/api/protected`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				})
					.then((response) => response.json())
					.then((data) => {
						setStore({ user_info: [data] })

						return data;
					})
					.catch((error) => {
						console.error(error);
						throw new Error("Error al obtener la información del usuario");
					});
			},
			uploadFile: async (file, projectId) => {
				const formData = new FormData();
				formData.append("file", file);

				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/upload/${projectId}`, {
						method: "POST",
						body: formData
					});

					if (!resp.ok) {
						throw new Error("There was a prolem while uploading the file.")
					};

					return "Success"
				} catch (error) {
					console.error(error);
					console.log("there was an error this is catch block")
				};

			},
			deleteFile: async (file_name, project_id) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/delete-file`, {
						method: "DELETE",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ file_name: file_name, project_id: project_id })
					})

					if (!resp.ok) {
						throw new Error("something went wrong while deleting the file")
					}
				} catch (error) {
					console.error(error)

				}
			},
			createNewProject: async (form) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/create-new-project`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ title: form.title, description: form.description, users: [form.username] })
					});

					if (!resp.ok) {
						throw new Error("something went wrong while getting create project form")
					}

					const data = await resp.json()
					console.log(["this is data from create new project", data])
				} catch (error) {
					console.error(error)
				}
			},
			createNewTask: async (form, projectId) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/task`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ title: form.title, description: form.description, due_at: form.due_at, todo_list: form.todo_list, project_id: projectId })
					});

					if (!resp.ok) {
						throw new Error("something went wrong while creating a new task.")
					}

					const data = await resp.json()
					console.log(["this is data from create new task", data])

				} catch (error) {
					console.error(error)
				}
			},
			deleteTask: async (task_id) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/task/${task_id}`, {
						method: "DELETE",
						headers: { "Content-Type": "application/json" },
					})
					return resp.status;

				} catch (error) {
					console.error(error);
					swal.fire({ title: "Something went wrong", text: "Please try again or refresh the page.", icon: "error", confirmButtonColor: '#fa9643' });
				}
			}

		}
	};
};

export default getState;
