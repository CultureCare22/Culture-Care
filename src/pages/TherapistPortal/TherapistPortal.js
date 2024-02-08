import React from 'react';
import './TherapistPortal.css';
// import PendingRequest from './pages/PendingRequest/PendingRequest';
import { SlCalender } from "react-icons/sl";
import { MdOutlineArrowOutward } from "react-icons/md";
import { AiFillSlackCircle } from "react-icons/ai";
import { FaUserCheck } from "react-icons/fa6";

function Category() {

    return (
        <>
            <div>
                <h1>Therapist Portal</h1>


                <div class="flex-container">
                    <div className='cover-box1'>
                        <h2 className='sidebar-title'>Filter by:</h2>

                        {/* Radio Buttons Section */}
                        <div className='filter-container'>
                            <div className='filter-menu'>
                                <h4><u>Overview</u></h4>

                                <div class="radio-button">
                                    <label className='radio-container'>
                                        <input type='radio' name='radio' />
                                        <span className='radiomark'>All</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Checkboxes Section */}
                        <div className='checkbox-container'>
                            <label className='checkbox-item'>
                                <input type='checkbox' checked='checked' />
                                <span className='checkmark-box'>Consultation Summary</span>
                            </label>

                            <label className='checkbox-item'>
                                <input type='checkbox' />
                                <span className='checkmark-box'>Appointments</span>
                            </label>

                            <label className='checkbox-item'>
                                <input type='checkbox' />
                                <span className='checkmark-box'>Observations</span>
                            </label>

                            <label className='checkbox-item'>
                                <input type='checkbox' />
                                <span className='checkmark-box'>Referrals</span>
                            </label>

                            <label className='checkbox-item'>
                                <input type='checkbox' />
                                <span className='checkmark-box'>Administrative items</span>
                            </label>

                            <label className='checkbox-item'>
                                <input type='checkbox' />
                                <span className='checkmark-box'>Send Tasks</span>
                            </label>

                            <label className='checkbox-item'>
                                <input type='checkbox' />
                                <span className='checkmark-box'>Pending Appointments</span>
                            </label>
                        </div>

                        {/* Radio Buttons Section */}
                        <div className='filter-container'>
                            <div className='filter-menu'>
                                <h4><u>Gender</u></h4>

                                <div class="radio-button">
                                    <label className='radio-container'>
                                        <input type='radio' name='radio' />
                                        <span className='radiomark'>All</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Checkboxes Section */}
                        <div className='checkbox-container'>
                            <label className='checkbox-item'>
                                <input type='checkbox' checked='checked' />
                                <span className='checkmark-box'>Male</span>
                            </label>

                            <label className='checkbox-item'>
                                <input type='checkbox' />
                                <span className='checkmark-box'>Female</span>
                            </label>

                            <label className='checkbox-item'>
                                <input type='checkbox' />
                                <span className='checkmark-box'>Non-binary</span>
                            </label>

                            <label className='checkbox-item'>
                                <input type='checkbox' />
                                <span className='checkmark-box'>Other</span>
                            </label>
                        </div>

                        {/* Radio Buttons Section */}
                        <div className='filter-container'>
                            <div className='filter-menu'>
                                <h4><u>Language</u></h4>

                                <div class="radio-button">
                                    <label className='radio-container'>
                                        <input type='radio' name='radio' />
                                        <span className='radiomark'>All</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className='checkbox-container'>
                            <label className='checkbox-item'>
                                <input type='checkbox' checked='checked' />
                                <span className='checkmark-box'>English</span>
                            </label>

                            <label className='checkbox-item'>
                                <input type='checkbox' />
                                <span className='checkmark-box'>Spanish</span>
                            </label>
                        </div>

                        {/* Radio Buttons Section */}
                        <div className='filter-container'>
                            <div className='filter-menu'>
                                <h4><u>Clinician</u></h4>

                                <div class="radio-button">
                                    <label className='radio-container'>
                                        <input type='radio' name='radio' />
                                        <span className='radiomark'>All</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Checkboxes Section */}
                        <div className='checkbox-container'>
                            <label className='checkbox-item'>
                                <input type='checkbox' checked='checked' />
                                <span className='checkmark-box'>Jasmine Ramierz (You)</span>
                            </label>

                            <label className='checkbox-item'>
                                <input type='checkbox' />
                                <span className='checkmark-box'>Lilliana Tapia</span>
                            </label>

                            <label className='checkbox-item'>
                                <input type='checkbox' />
                                <span className='checkmark-box'>Sierra Silva</span>
                            </label>
                        </div>
                    </div>


                    <div className='cover-box2' style={{ width: '10%' }}>
                        <div class="box1">
                            <h2>Patient Consultation Requests</h2>
                            <div class="summary-box">
                                <h4>Summary</h4>

                                <div class="flex-boxes">
                                    <div class="box_1">
                                        <div class="flex-calender">
                                            <p><SlCalender style={{ color: 'white' }} className='calender' /></p>
                                            <div class="p-consultation">Consultation Request</div>
                                        </div>

                                        <div class="flex-datesRate">
                                            <div class="p-22">22</div>
                                            <p><MdOutlineArrowOutward style={{ color: 'green' }} className='arrow' /></p>
                                            <span className='text'>9.5%</span>
                                            <div class="p-lastline">from last week</div>

                                        </div>
                                    </div>

                                    <div class="boxes">
                                        <div class="box_2">
                                            <p><AiFillSlackCircle style={{ color: 'white' }} className='circle' /></p>
                                            <div class="circle-text_1">4.5</div>
                                            <div class="circle-text_2">Average Request Per Clinician</div>
                                        </div>

                                        <div class="box_3">
                                            <p><FaUserCheck style={{ color: 'white' }} className='fact-check' /></p>
                                            <div class="circle-text_1">90%</div>
                                            <div class="circle-text_2">Verified Outt-Of-Network Benefits</div>
                                        </div>

                                        <div class="box_4">
                                            <p><FaUserCheck style={{ color: 'white' }} className='fact-check' /></p>
                                            <div class="circle-text_1">83%</div>
                                            <div class="circle-text_2">Conversion Rate</div>
                                        </div>
                                    </div>
                                </div>


                                <h3>Confirm Requests</h3>
                                <div class="requests">
                                    <div className='request-1'>
                                        <p>Fatima Perez (NY)</p>
                                        <div class="clinician_1">Requested Clinician</div>
                                        <div class="clinician_name1">Jasmine Ramierz</div>

                                        <div class="clinician_1">Consultation Type</div>
                                        <div class="consultation">
                                            <div class="consultation_details">Life Transition</div>
                                            <div class="consultation_details">Financial Anxiety</div>
                                        </div>

                                        <div class="clinician_1">Consultation Request</div>
                                        <div class="consultation">
                                            <div class="consultation_details">November 13</div>
                                            <div class="consultation_details">10:00am</div>
                                        </div>

                                        <div class="clinician_1">Payment Status</div>
                                        <div class="consultation">
                                            <div class="consultation_details">Self-Pay</div>
                                            <div class="consultation_details">Confirmed</div>
                                        </div>

                                        <div class="view_consultation">
                                            <form method="get" action="/pending-request-details">
                                                <input type="hidden" name="request" value="consultation" />
                                                <a href='/pending-request-details'>View Consultation Request
                                                    {/* <button>View Consultation Request</button> */}
                                                </a>
                                            </form>
                                        </div>
                                    </div>

                                    <div className='request-2'>
                                        <p>Aracelis Davis (NY)</p>
                                        <div class="clinician_2">Requested Clinician</div>
                                        <div class="clinician_name2">Lilliana Tapia</div>

                                        <div class="clinician_1">Consultation Type</div>
                                        <div class="consultation">
                                            <div class="consultation_details">Depression</div>
                                            <div class="consultation_details">LGBTQ+</div>
                                        </div>


                                        <div class="clinician_1">Consultation Request</div>
                                        <div class="consultation">
                                            <div class="consultation_details">December 5</div>
                                            <div class="consultation_details">2:30pm</div>
                                        </div>

                                        <div class="clinician_1">Payment Status</div>
                                        <div class="consultation">
                                            <div class="consultation_details">O-O-N</div>
                                            <div class="consultation_details">Confirmed</div>
                                        </div>

                                        <div class="view_consultation">
                                            <form method="get" action="/pending-request-details">
                                                <input type="hidden" name="request" value="consultation" />
                                                <a href='/pending-request-details'>View Consultation Request
                                                    {/* <button>View Consultation Request</button> */}
                                                </a>
                                            </form>
                                        </div>
                                    </div>

                                    <div className='request-3'>
                                        <p>Isa Montes (MD)</p>
                                        <div class="clinician_3">Requested Clinician</div>
                                        <div class="clinician_name3">Sierra Silva</div>

                                        <div class="clinician_1">Consultation Type</div>
                                        <div class="consultation">
                                            <div class="consultation_details">Grief</div>
                                            <div class="consultation_details">Anxiety</div>
                                        </div>

                                        <div class="clinician_1">Consultation Request</div>
                                        <div class="consultation">
                                            <div class="consultation_details">December 18</div>
                                            <div class="consultation_details">3:15pm</div>
                                        </div>

                                        <div class="clinician_1">Payment Status</div>
                                        <div class="consultation">
                                            <div class="consultation_details">O-O-N</div>
                                            <div class="consultation_details">In Progress</div>
                                        </div>


                                        <div class="view_consultation">

                                            <form method="get" action="/pending-request-details">
                                                <input type="hidden" name="request" value="consultation" />
                                                <a href='/pending-request-details'>View Consultation Request
                                                    {/* <button>View Consultation Request</button> */}
                                                </a>
                                            </form>

                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </div >
            </div >
        </>
    );
}

export default Category;



