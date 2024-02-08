import React from 'react';
import './Silva.css';
import { useParams } from "react-router-dom";


function Silva() {
    const params = useParams()
    return (
        <div>
            <div className='details'>
                <p>After scheduling a time, please click on 'Confirm' to confirm your appointment.</p>
                <div className='next-button'>
                    <a href='/confirmation-page'>Confirm</a>
                </div>
            </div>
            {/* <!-- Google Calendar Appointment Scheduling begin --> */}
            <iframe src="https://calendar.google.com/calendar/appointments/AcZssZ1jP93EITFDcNk1ocCJirwavPPwi6Ijby8dgEA=?gv=true" style={{border: 0}} width="100%" height="600" frameborder="0"></iframe>
            {/* <!-- end Google Calendar Appointment Scheduling --> */}
            
        </div>

    )

}

export default Silva