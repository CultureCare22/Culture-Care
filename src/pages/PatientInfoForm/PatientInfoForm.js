import React from 'react';
import './PatientInfoForm.css';


function Form() {

    return (
        <>
        <div>Personal info form</div>


        <div className='payment-info-form'>
            <h2>Payment Information</h2>
            <p>This practice is out-of-network (OON). </p>
            <p>Many individuals have health insurance plans that will reimburse a portion 
                of your costs for OON treatments. You can obtain more information on your 
                specific coverage and deductible information by filling out this questionaire
            </p>
            <form className='select-fop'>
                <h3>Form of Payment</h3>
                <input type='radio' id='self-pay' name='payment-form' value='SELFPAY'></input>
                <label for='self-pay'>Self-Pay</label><br></br>
                <input type='radio' id='oon' name='payment-form' value='OON'></input>
                <label for='oon'>I would like more information about OON payment</label>

            </form>
        </div>
        <div className='appt-details'>
            <h2>Appointment Details</h2>
            <form className='look-discuss'>
                <h3>What are you looking to discuss? Select all that apply.</h3>
                <input type='checkbox' id='anxiety' name='discuss-details' value='anxiety'></input>
                <label for='anxiety'>Anxiety</label>
                <input type='checkbox' id='finances' name='discuss-details' value='finances'></input>
                <label for='finances'>Finances</label>
                <input type='checkbox' id='grief' name='discuss-details' value='grief'></input>
                <label for='grief'>Grief</label>
                <input type='checkbox' id='life-tran' name='discuss-details' value='life-tran'></input>
                <label for='life-tran'>Life Transition</label>
                <input type='checkbox' id='imposter' name='discuss-details' value='imposter'></input>
                <label for='imposter'>Imposter Syndrome</label>
                <input type='checkbox' id='depression' name='discuss-details' value='depression'></input>
                <label for='depression'>Depression</label>
                <input type='checkbox' id='trauma' name='discuss-details' value='trauma'></input>
                <label for='trauma'>Trauma</label>
                <input type='checkbox' id='family' name='discuss-details' value='family'></input>
                <label for='family'>Family</label>
                <input type='checkbox' id='inter-rela' name='discuss-details' value='inter-rela'></input>
                <label for='inter-rela'>Interracial Relationships</label>
                <input type='checkbox' id='lgbtqia' name='discuss-details' value='lgbtqia'></input>
                <label for='lgbtqia'>LGBTQIA+</label>

            </form>
        </div>
        
        </>
    )
}
export default Form;
