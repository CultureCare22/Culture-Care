import React, { useState } from 'react'
import './App.css';
import CreatePractitioner from './CreatePractitioner';
import IntakeForm from './IntakeForm';

function App() {


	return (
		<div className="App">
            <IntakeForm></IntakeForm>
            <CreatePractitioner></CreatePractitioner>


		</div>
	);
}

export default App;
