import React from 'react';
import './Ramirez.css';
import { useParams } from "react-router-dom";


function Ramirez() {
    const params = useParams()
    return (
        <div className='schedule-consult'>
            <div className='header-form'>
                <h2>Schedule a Consultation with Us</h2>
            </div>
            <div className='sub-header-form'>
                <h4>Schedule a time below. After scheduling, please click on the next button to confirm your appointment.</h4>
                <div className='next-button'>
                        <a href='/confirmation-page'>Next &#8594;</a>
                </div>
            </div>
            <p>IMPORTANT: By scheduling this appointment request, you are consenting to having your personal information collected.</p>
            <div className='google-cal-sched'>
            {/* <!-- Google Calendar Appointment Scheduling begin --> */}
            <iframe src="https://calendar.google.com/calendar/appointments/AcZssZ1jP93EITFDcNk1ocCJirwavPPwi6Ijby8dgEA=?gv=true" style={{border: 0}} width="100%" height="600" frameborder="0"></iframe>
            {/* <!-- end Google Calendar Appointment Scheduling --> */}
            </div>
            <div className='form-end'>
                
                {/* <div className='pay-method'>
                    <h4>Payment Method</h4>
                    <div className="pay-type">
                        <label className='radio-container'>
                            <input type='radio' name='payment-method' />
                            <span className='radiomark'>Pay out of pocket</span>
                        </label>
                        <label className='radio-container'>
                            <input type='radio' name='payment-method' />
                            <span className='radiomark'>Insurance Reimbursement</span>
                        </label>
                    </div>
                </div> */}
                
            </div>
        </div>

    )

}

export default Ramirez