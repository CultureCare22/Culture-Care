import React, { useState } from 'react';
// import Popup from 'reactjs-popup';
import './PatientInfoForm.css';
import { useParams } from 'react-router-dom';


function Form() {
    const { pId } = useParams();
    console.log({pId})
    // I am not sure if these will come in handy, but I will leave them here to save the possible work 
    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [preferredName, setPreferredName] = useState("");
    // const [address, setAddress] = useState("");
    // const [city, setCity] = useState("");
    const [state, setState] = useState([]);
    // const [zipCode, setZipCode] = useState("");
    // const [email, setEmail] = useState("");
    // const [DoB, setDoB] = useState("");
    // const [language, setLanguage] = useState("");
    // const [referral, setReferral] = useState("");
    // const [communication, setCommunication] = useState("");
    const [payment, setPayment] = useState([]);
    const [details, setDetails] = useState([]);


    const handleSubmit = async () => {
        // if (this.refs.required.reportValidity()) {
        //     e.preventDefault();
        //     // do something here
        //   }
        console.log("initiating submit")
        console.log("state", state)
        console.log("payment", payment)
        console.table("details", details)

        try {
            console.log(pId)
            // const response = await fetch(`https://culture-care-server-a5e264f8c326.herokuapp.com/practitioners/get/${pId}/match/`, {
            const response = await fetch(`https://culture-care-server-a5e264f8c326.herokuapp.com/practitioners/get/${pId}/match/`, {
                method: "POST",
                body: JSON.stringify({
                    // firstName: firstName,
                    // lastName: lastName,
                    // email: email,
                    // preferredName: preferredName,
                    // address: address,
                    // city: city,
                    locations: state,
                    // zipCode: zipCode,
                    // DateOfBirth: DoB,
                    // languages: language,
                    // referral: referral,
                    // communication: communication,
                    paymentmethods: payment,
                    specializations: details
                })
            })
            console.log(response.status)
            if (response.ok) {
                const res = await response.json()
                const matched = res.matched
                console.log(matched)
                if (matched) {
                    console.log("1")
                    window.location.href = "/clinician-j-ramirez"
                }
                else {
                    alert("Soft pass")
                    console.log("2")
                    window.location.href = "/clinician-j-ramirez"
                }
            }
            else {
                console.log("Failed the Hard Pass")
                alert("Sorry you are not a match! \nWe are grateful for your interest in Honest Hour. It looks like our services might not be a match, but we think you could benefit from specialized support. \nHere are four websites where you can find qualified therapists in your area: \n    Zocdoc.com \n    PsychologyToday.com \n    LatinxTherapy.com \n    TherapyForBlackGirls.com")
            }
        }
        catch (error) {
            console.log("Failed the Hard Pass")
            alert("Sorry you are not a match! \n We are grateful for your interest in Honest Hour. It looks like our services might not be a match, but we think you could benefit from specialized support. \n Here are four websites where you can find qualified therapists in your area:")
        }
    }




    return (
        <>
            <div className='big-heading'>
                <h1>Personal Information</h1>
            </div>
            <div className='forms'>
                <div className='container-outer'>
                    <h2>Contact Information</h2>
                    <div className='contact-info-container'>
                        <div className='flex-row'>
                            {/* Legal first name */}
                            <div className='input-field'>
                                <div className='sub-heading'> Legal First Name </div>
                                <input type="text" placeholder="Enter legal first name" />
                            </div>
                            {/* Legal last name */}
                            <div className='input-field'>
                                <div className='sub-heading'> Legal Last Name </div>
                                <input type="text" placeholder="Enter legal last name" />
                            </div>
                        </div>

                        <div className='flex-row'>
                            {/* preferred name */}
                            <div className='input-field'>
                                <div className='sub-heading'> Preferred Name </div>
                                <input type="text" placeholder="Enter preferred name" />
                            </div>

                            {/* Phone number */}
                            <div className='input-field'>
                                <div className='sub-heading'> Phone Number </div>
                                <input type="text" placeholder="Enter phone number" />
                            </div>
                        </div>

                        <div className='flex-row'>
                            {/* Address */}
                            <div className='long-input-field'>
                                <div className='sub-heading'>Address</div>
                                <input type="text" placeholder="Enter street address" />
                            </div>
                        </div>
                        <div className='flex-row'>
                            {/* City */}
                            <div className='short-input-field'>
                                <div className='sub-sub-heading'> City </div>
                                <input type="text" placeholder="City" />
                            </div>

                            <div className='input-field'>
                                <div className='sub-sub-heading'> State </div>
                                <select id='state' name='state' onChange={(e) => setState([
                                    ...state,
                                    e.target.value
                                ])}>
                                    <option value=''>Select State</option>
                                    <option value='AL'>Alabama</option>
                                    <option value='AK'>Alaska</option>
                                    <option value='AZ'>Arizona</option>
                                    <option value='AR'>Arkansas</option>
                                    <option value='CA'>California</option>
                                    <option value='CO'>Colorado</option>
                                    <option value='CT'>Connecticut</option>
                                    <option value='DE'>Delaware</option>
                                    <option value='FL'>Florida</option>
                                    <option value='GA'>Georgia</option>
                                    <option value='HI'>Hawaii</option>
                                    <option value='ID'>Idaho</option>
                                    <option value='IL'>Illinois</option>
                                    <option value='IN'>Indiana</option>
                                    <option value='IA'>Iowa</option>
                                    <option value='KS'>Kansas</option>
                                    <option value='KY'>Kentucky</option>
                                    <option value='LA'>Louisiana</option>
                                    <option value='ME'>Maine</option>
                                    <option value='MD'>Maryland</option>
                                    <option value='MA'>Massachusetts</option>
                                    <option value='MI'>Michigan</option>
                                    <option value='MN'>Minnesota</option>
                                    <option value='MS'>Mississippi</option>
                                    <option value='MO'>Missouri</option>
                                    <option value='MT'>Montana</option>
                                    <option value='NE'>Nebraska</option>
                                    <option value='NV'>Nevada</option>
                                    <option value='NH'>New Hampshire</option>
                                    <option value='NJ'>New Jersey</option>
                                    <option value='NM'>New Mexico</option>
                                    <option value='NY'>New York</option>
                                    <option value='NC'>North Carolina</option>
                                    <option value='ND'>North Dakota</option>
                                    <option value='OH'>Ohio</option>
                                    <option value='OK'>Oklahoma</option>
                                    <option value='OR'>Oregon</option>
                                    <option value='PA'>Pennsylvania</option>
                                    <option value='RI'>Rhode Island</option>
                                    <option value='SC'>South Carolina</option>
                                    <option value='SD'>South Dakota</option>
                                    <option value='TN'>Tennessee</option>
                                    <option value='TX'>Texas</option>
                                    <option value='UT'>Utah</option>
                                    <option value='VT'>Vermont</option>
                                    <option value='VA'>Virginia</option>
                                    <option value='WA'>Washington</option>
                                    <option value='WV'>West Virginia</option>
                                    <option value='WI'>Wisconsin</option>
                                    <option value='WY'>Wyoming</option>
                                </select>
                            </div>
                            <div className='short-input-field'>
                                <div className='sub-sub-heading'> Zip Code </div>
                                <input type="text" placeholder="ZipCode" />
                            </div>
                        </div>
                        <div className='flex-row'>
                            <div className='long-input-field'>
                                <div className='sub-heading'>Email Address</div>
                                <input type="email" placeholder="Enter email address" />
                            </div>
                        </div>
                        <div className='flex-row'>
                            <div className='input-field-date'>
                                <div className='sub-heading'> Date of Birth </div>
                                <input type="date" placeholder="MM-DD-YYYY" />
                            </div>

                            <div className='input-field'>
                                <div className='sub-heading'> Language </div>
                                {/* <input type="text" placeholder="English or Spanish" /> */}
                                <select id='language' name='language'>
                                    <option value=''> Please select a preferred language</option>
                                    <option value='English'> English</option>
                                    <option value='Spanish'> Spanish</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex-row'>
                            <div className='input-field'>
                                <div className='sub-heading'> Referral Source</div>
                                <select id='referral-source' name='referral-souce'>
                                    <option value=''> Please select a referral source</option>
                                    <option value='Directory-links'> Directory Links</option>
                                    <option value='Latinx'> LatinxTherapy</option>
                                    <option value='Therapy-for-b'> Therapyforblackgirls</option>
                                    <option value='Zocdoc'> ZocDoc</option>
                                    <option value='Psychtoday'> Psychology Today</option>
                                    <option value='Google-ad'> Google Ads</option>
                                    <option value='Referral-ff'> Referral (Friends/Family)</option>
                                    <option value='Referral-p'> Referral (Practitioner)</option>
                                    <option value='Other'> Other</option>
                                </select>
                            </div>
                            <div className='input-field'>
                                <div className='sub-heading'> Preferred Method of Communication</div>
                                <select id='method-of-comm' name='method-of-comm'>
                                    <option value=''> Please select a preferred method of communication</option>
                                    <option value='Texting'> Text</option>
                                    <option value='Phone-call'> Phone Call</option>
                                    <option value='Email'> Email</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='right-forms'>
                    <div className='payment-info-form'>
                        <h2>Payment Information</h2>
                        <div className="payment-selection">
                            <p>This practice is out-of-network (OON). </p>
                            <p>Many individuals have health insurance plans that will reimburse a portion
                                of your costs for OON treatments. You can obtain more information on your
                                specific coverage and deductible information by filling out
                                <a href='https://practitioner.reimbursify.com/verifast?ec=1D7G2G2F9C' target="_blank"> this questionaire</a>
                            </p>
                            <form required className='select-fop' onChange={(e) => {
                                setPayment([
                                    ...payment,
                                    e.target.value
                                ]);
                            }} >
                                <h3>Form of Payment</h3>
                                <input type='radio' id='self-pay' name='payment-form' value='Self Pay'></input>
                                <label for='self-pay'>Self Pay</label><br></br>
                                <input type='radio' id='oon' name='payment-form' value='OON'></input>
                                <label for='oon'>I would like more information about OON payment</label>

                            </form>
                        </div>
                    </div>
                    <div className='appt-details'>
                        <h2>Appointment Details</h2>
                        <form required className='look-discuss' onChange={(e) => {
                            setDetails([
                                ...details,
                                e.target.value
                            ]);
                        }} multiple={true} >
                            <h3>What are you looking to discuss? Select all that apply.</h3>
                            <div className='dis-options'>
                                <div className='dis-check'>
                                    <input type='checkbox' id='anxiety' name='discuss-details' value='Financial Anxiety'></input>
                                    <label for='anxiety'>Anxiety</label>
                                </div>
                                <div className='dis-check'>
                                    <input type='checkbox' id='finances' name='discuss-details' value='Finances'></input>
                                    <label for='finances'>Finances</label>
                                </div>
                                <div className='dis-check'>
                                    <input type='checkbox' id='grief' name='discuss-details' value='Grief'></input>
                                    <label for='grief'>Grief</label>
                                </div>
                                <div className='dis-check'>
                                    <input type='checkbox' id='life-tran' name='discuss-details' value='life-tran'></input>
                                    <label for='life-tran'>Life Transition</label>
                                </div>
                                <div className='dis-check'>
                                    <input type='checkbox' id='imposter' name='discuss-details' value='imposter'></input>
                                    <label for='imposter'>Imposter Syndrome</label>
                                </div>
                                <div className='dis-check'>
                                    <input type='checkbox' id='depression' name='discuss-details' value='depression'></input>
                                    <label for='depression'>Depression</label>
                                </div>
                                <div className='dis-check'>
                                    <input type='checkbox' id='trauma' name='discuss-details' value='trauma'></input>
                                    <label for='trauma'>Trauma</label>
                                </div>
                                <div className='dis-check'>
                                    <input type='checkbox' id='family' name='discuss-details' value='family'></input>
                                    <label for='family'>Family</label>
                                </div>
                                <div className='dis-check'>
                                    <input type='checkbox' id='inter-rela' name='discuss-details' value='inter-rela'></input>
                                    <label for='inter-rela'>Interracial Relationships</label>
                                </div>
                                <div className='dis-check'>
                                    <input type='checkbox' id='lgbtqia' name='discuss-details' value='lgbtqia'></input>
                                    <label for='lgbtqia'>LGBTQIA+</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='schedule-button'>
                {/* <a href="/clinician-s-silva"> */}
                <button className='return-button' onClick={(e) => handleSubmit(e)}>Schedule Appointment</button>
                {/* </a> */}
                {/* <Popup trigger={<button className='return-button' onClick={(e) => handleSubmit(e)}>Schedule Appointment</button> } position="right center">
                <div>Popup content here !!</div>
            </Popup> */}
            </div>
        </>
    )
}
export default Form;