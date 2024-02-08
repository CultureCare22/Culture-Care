import React from 'react'
import './Confirmation.css'
import { useParams } from "react-router-dom"

function Confirmation() {
    const params = useParams()
    return (
        <div className='wholepage'>
            <div className='head'>
                <h1>Consultation Inquiry Sent</h1>
            </div>
                

                <div className='confirmation-container'>
                    
                    <h2>Thank you for requesting a consultation! Our team will be in touch shortly!</h2>
                    <img src={'/Vector.png'} />
                  
                    <h3>You Have Successfully Requested a Consultation.</h3>
                  
                    <h4>Note: Appointment requests will be aprroved by the practice. You recieved a copy of this consultation inquiry to your email.</h4>

                    <a href="/">
                        <button className='return-button'>Return to Home</button>
                    </a>
                </div>
        </div>
        
    )
}

export default Confirmation
