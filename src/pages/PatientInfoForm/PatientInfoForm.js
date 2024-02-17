import React from 'react';
import './PatientInfoForm.css';


function Form() {

    return (
        <>
        <div className='big-heading'>Personal info form</div>
        <div className='container-outer'>
            <div className='flex-row'>
                <div className='input-field'>
                    <div className='sub-heading'> Placeholder </div>
                    <input type="text" placeholder="First name" />
                </div>

                <div className='input-field'>
                    <div className='sub-heading'> Placeholder </div>
                    <input type="text" placeholder="Last name" />
                </div>
            </div>

            <div className='flex-row'>
                {/* <div></div> */}
                
                <div className='input-field'>
                    <div className='sub-heading'> Placeholder </div>
                    <input type="text" placeholder="First name" />
                </div>

                <div className='input-field'>
                    <div className='sub-heading'> Placeholder </div>
                    <input type="text" placeholder="Last name" />
                </div>
            </div>

            <div className='flex-row'>
                <div className='long-input-field'>
                    <div className='sub-heading'> Placeholder </div>
                    <input type="text" placeholder="Location" />
                </div>
            </div>

        </div>
        
        </>
    )
}
export default Form;
