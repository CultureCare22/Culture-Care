import React from 'react';
import './Silva.css';
import { useParams } from "react-router-dom";


function Silva() {
    const params = useParams()
    return (
        <div className='schedule-consult'>
            <div className='header-form'>
                <h2>Schedule a Consultation with Us</h2>
            </div>
            <h4>Schedule a time below: </h4>
            <div className='google-cal-sched'>
            {/* <!-- Google Calendar Appointment Scheduling begin --> */}
            <iframe src="https://calendar.google.com/calendar/appointments/AcZssZ1jP93EITFDcNk1ocCJirwavPPwi6Ijby8dgEA=?gv=true" style={{border: 0}} width="100%" height="600" frameborder="0"></iframe>
            {/* <!-- end Google Calendar Appointment Scheduling --> */}
            </div>
            <div className='form-end'>
                
                <div className='pay-method'>
                    {/* <h4>Payment Method</h4> */}
                    <div className="pay-type">
                        {/* <label className='radio-container'>
                            <input type='radio' name='payment-method' />
                            <span className='radiomark'>Pay out of pocket</span>
                        </label>
                        <label className='radio-container'>
                            <input type='radio' name='payment-method' />
                            <span className='radiomark'>Insurance Reimbursement</span>
                        </label> */}
                    </div>
                </div>
                <div className='next-button'>
                    <a href='/confirmation-page'>Next &#8594;</a>
                </div>
            </div>
        </div>

    )

}

export default Silva