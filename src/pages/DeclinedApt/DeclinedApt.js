import React from 'react'
import './DeclinedApt.css'
import { useParams } from "react-router-dom"

function Confirmation() {
    const params = useParams()
    return (
        <div className='wholepage'>
            <div className='head'>
                <h1>Declined Appointment</h1>
            </div>
                

                <div className='confirmation-container'>
                    
                    <h2>You Have Declined Consultation Request For Fatima Perez</h2>
                    <img src={'/X.png'} />
                  
                    <h3>This client has been notified of their appointment status.</h3>
                  
                    <h4>Note: Default email will be automatically sent to this client.</h4>
                    <a href="/">
                        <button className='return-button'>Return to Home</button>
                    </a>
                </div>
        </div>
        
    )
}

export default Confirmation