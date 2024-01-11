import React, { useState, useEffect } from 'react'
import './App.css';
import Options from './Options'



function IntakeForm() {

	const [practitioners, setPractitioners] = useState([])

	// get all practitioners on load
	useEffect(() => {
		async function getPractitioners() {
			try {
				const response = await fetch('/practitioners/get/', {
					method: "GET",
					mode: "no-cors"
				});

				if (response.ok) {
					const jsonResponse = await response.json()
					const res = jsonResponse.practitioners
					setPractitioners(res)
				}
				else throw new Error("Request failed");

			} catch (error) {
				console.log(error)
			}
		}
		getPractitioners()
	}, [])


	// set form values
	const [name, setName] = useState('')
	const [ageGroup, setAgeGroup] = useState('')
	const [location, setLocation] = useState('')
	const [concern, setConcern] = useState('')
	const [noTherapies, setNoTherapies] = useState('')
	const [email, setEmail] = useState('')
	const [directoryDiscovered, setDirectoryDiscovered] = useState("")
	const [practitioner_id, setPractitionerID] = useState()


	// handle form submission
	const handleSubmit = async (e) => {

		e.preventDefault();
		console.log("chosen id is", practitioner_id)
		try {
			const response = await fetch("/forms/intake/", {
				method: "POST",
				body: JSON.stringify({
					data: {
						name: name,
						age_group: ageGroup,
						location: location,
						directory_discovered: directoryDiscovered,
						area_of_concern: concern,
						total_therapies: noTherapies,
						email: email
					},
					practitioner_id: Number(practitioner_id)
				}),
				mode: "no-cors"
			})

			// handle response
			if (response.ok) {
				const jsonResponse = await response.json()
				alert("Email sent successfully")
				console.log(jsonResponse)
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
			<h1 className="App-header">Intake Form</h1>
			<br></br>
			<form action='/' onSubmit={handleSubmit}>
				<text>Hello
					<select name="" onChange={(e) => setPractitionerID(e.target.value)}>
						<option value="" selected>Select Practitioner</option>
						{practitioners.map(({id, name, email_address}) => {
							return (
								<Options practitioner = {{id: id, name: name, email: email_address}}/>
							)
						})}

						{console.log("chosen pract id is",practitioner_id)}
					</select>

				</text>
				<br></br>
				<br></br>
				<text className='form-text'>
					I hope you are well. My name is <input type='text' placeholder="Name" onChange={(e) => setName(e.target.value)} />.

					I am a <select onChange={(e) => setAgeGroup(e.target.value)}>
						<option value="teen">preteen</option>
						<option value="adult" selected>teen</option>
						<option value="student">adult</option>
					</select>

					living in <input type='text' placeholder="Location" onChange={(e) => setLocation(e.target.value)} />.

					I found you on <select onChange={(e) => setDirectoryDiscovered(e.target.value)}>
						<option value="latinxtherapy.com1" selected>latinxtherapy.com1</option>
						<option value="latinxtherapy.com2">latinxtherapy.com2</option>
						<option value="lantixtherapy.com3">latinxtherapy.com3</option>
					</select>.

					I am reaching out because I am interested in receiving therapy for <input type='text' placeholder="Area of Concerns" onChange={(e) => setConcern(e.target.value)} />.

					It is  <select onChange={(e) => setNoTherapies(e.target.value)}>
						<option value="first time">my first time</option>
						<option value="not first time" selected>not my first time</option>
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

export default IntakeForm;
