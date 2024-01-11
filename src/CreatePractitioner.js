import React, { useState } from 'react'
import './App.css';

function CreatePractitioner() {

	// set form values
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')


	// handle form submission
	const handleSubmit = async (e) => {

		e.preventDefault();

		try {
			const response = await fetch("/practitioners/create/", {
				method: "POST",
				body: JSON.stringify({
                    name: name,
                    email_address: email
				}),
				mode: "no-cors"
			})

			// handle response
			if (response.ok) {
				const jsonResponse = await response.json()
				alert(jsonResponse.name)
			}
			else {
				alert("Failed to create practitioner")
			}

		} catch (error) {
			alert(error)
		}
	}


	return (
		<div className="App">
			<h1 className="App-header">Create Practitioner</h1>
			<br></br>
			<form action='/' onSubmit={handleSubmit}>
				<input type='text' placeholder="Name" onChange={(e) => setName(e.target.value)} />

				<br></br>
                <input type='email' placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

				<br />
				<br />
				<button>Send</button>
			</form>


		</div>
	);
}

export default CreatePractitioner;
