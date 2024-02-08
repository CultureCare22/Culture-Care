import React from 'react'
import './ApprovedApt.css'
import { useParams } from "react-router-dom"

function Confirmation() {
    const params = useParams()
    return (
        <div className='wholepage'>
            <div className='head'>
                <h1>Approved Appointment</h1>
            </div>
                

                <div className='confirmation-container'>
                    
                    <h2>You Have Successfully Approved Consultation Request For Fatima Perez</h2>
                    <img src={'/Vector.png'} />
                  
                    <h3>This Consultation Has Been Added To Your Calendar</h3>
                  
                    <h4>Note: Default automation tasks will be automatically completed for this client.</h4>

                    <a href="/">
                    <button className='return-button'>Return to Home</button>
                    </a>
                </div>
        </div>
        
    )
}

export default Confirmation