import React from 'react';
import './PatientInfoForm.css';


function Form() {

    return (
        <>
        <div className='big-heading'>Personal info form</div>
        <div className='container-outer'>
            <div className='contact-info-container'>
                <div className='flex-row'>
                    <div className='input-field'>
                        <div className='sub-heading'> Legal First Name </div>
                        <input type="text" placeholder="Enter Legal First name" />
                    </div>

                    <div className='input-field'>
                        <div className='sub-heading'> Legal Last Name </div>
                        <input type="text" placeholder="Enter Legal Last name" />
                    </div>
                </div>

                <div className='flex-row'>
                    <div className='input-field'>
                        <div className='sub-heading'> Preferred Name </div>
                        <input type="text" placeholder="Entered Preferred Name" />
                    </div>

                    <div className='input-field'>
                        <div className='sub-heading'> Phone Number </div>
                        <input type="text" placeholder="Enter Phone Number" />
                    </div>
                </div>

                <div className='flex-row'>
                    <div className='long-input-field'>
                        <div className='sub-heading'>Address</div>
                        <input type="text" placeholder="Street Name" />
                    </div>
                </div>
                <div className='flex-row'>
                    <div className='short-input-field'>
                        <div className='sub-sub-heading'> City </div>
                        <input type="text" placeholder="City" />
                    </div>

                    <div className='short-input-field'>
                        <div className='sub-sub-heading'> State </div>
                        <input type="text" placeholder="State" />
                    </div>
                    <div className='short-input-field'>
                        <div className='sub-sub-heading'> Zip Code </div>
                        <input type="text" placeholder="ZipCode" />
                    </div>
                </div>
                <div className='flex-row'>
                    <div className='long-input-field'>
                        <div className='sub-heading'>Email Address</div>
                        <input type="text" placeholder="Enter Email Address" />
                    </div>
                </div>
                <div className='flex-row'>
                    <div className='input-field'>
                        <div className='sub-heading'> Date of Birth </div>
                        <input type="text" placeholder="MM-DD-YYYY" />
                    </div>

                    <div className='input-field'>
                        <div className='sub-heading'> Language </div>
                        <input type="text" placeholder="English or Spanish" />
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )
}
export default Form;
