import React, { useState } from 'react'
import './App.css';

function App() {

	// set form values
	const [name, setName] = useState('')
	const [ageGroup, setAgeGroup] = useState('')
	const [location, setLocation] = useState('')
	const [concern, setConcern] = useState('')
	const [noTherapies, setNoTherapies] = useState('')
	const [email, setEmail] = useState('')


	// handle form submission
	const handleSubmit = async (e) => {

		e.preventDefault();

		try {
			const response = await fetch("/forms/intake/", {
				method: "POST",
				body: JSON.stringify({
					data: {
						name: name,
						age_group: ageGroup,
						location: location,
						directory_discovered: "latinxtherapy.com",
						area_of_concern: concern,
						total_therapies: noTherapies,
						email: email
					},
					practitioner_id: 1
				}),
				mode: "no-cors"
			})

			// handle response
			if (response.ok) {
				const jsonResponse = await response.json()
				alert("Email sent")
			}
			else {
				alert("Failed to send email")
			}

		} catch (error) {
			alert(error)
		}
	}


	return (
		<div className="App">
			<header className="App-header">Intake Form</header>
			<br></br>
			<form action='/' onSubmit={handleSubmit}>
				<text>Hello Mrs.Ramirez,</text>
				<br></br>
				<br></br>
				<text className='form-text'>
					I hope you are well. My name is <input type='text' placeholder="Name" onChange={(e) => setName(e.target.value)} />.

					I am a <select onChange={(e) => setAgeGroup(e.target.value)}>
						<option value="Teen">Teen</option>
						<option value="Adult" selected>Adult</option>
						<option value="Student">Student</option>
					</select> in <input type='text' placeholder="Location" onChange={(e) => setLocation(e.target.value)} />.

					I am reaching out because I am interested in receiving therapy for <input type='text' placeholder="Area of Concerns" onChange={(e) => setConcern(e.target.value)} />.

					It is  <select onChange={(e) => setNoTherapies(e.target.value)}>
						<option value="First time">my first time</option>
						<option value="Not first time" selected>NOT my first time</option>
					</select> receiving therapy.

					My email is <input type='email' placeholder="Email" onChange={(e) => setEmail(e.target.value)} />.

					Is there any way I can begin the process with you?
					<br></br>
					Sincerely,
					<br></br>
					<input type='text' placeholder="Name" />

				</text>
				<br />
				<br />
				<button>Send</button>
			</form>


		</div>
	);
}

export default App;
