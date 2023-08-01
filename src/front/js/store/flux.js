import swal from 'sweetalert2';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
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
					// swal("Please make sure your inputs are ok.");

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
					swal.fire({ title: "Email sent successfully!", text: "Check your email for the verification code.", icon: "success", cancelButtonColor: '#fa9643' });
					console.log(data)


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
		}
	};
};

export default getState;
