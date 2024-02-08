import React from 'react';
import './SelectClinician.css';
import { SlCalender } from "react-icons/sl";
import { MdOutlineArrowOutward } from "react-icons/md";
import { AiFillSlackCircle } from "react-icons/ai";
import { FaUserCheck } from "react-icons/fa6";

function Category() {

    return (
        <div>
            

            <div className="search-bar">
            <h1>Select a Clinician</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
        />
        <button>Search</button>
      </div>
    </div>


            <div class="flex-container">
                <div className='cover-box1'>
                    <h2>Filter by:</h2>

                    {/* Radio Buttons Section */}
                    <div className='filter-container'>
                        <div className='filter-menu'>
                            <h4><u>Specialization</u></h4>

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
                            <span className='checkmark-box'>Relationship</span>
                        </label>

                        <label className='checkbox-item'>
                            <input type='checkbox' />
                            <span className='checkmark-box'>Depression</span>
                        </label>

                        <label className='checkbox-item'>
                            <input type='checkbox' />
                            <span className='checkmark-box'>Life Transition</span>
                        </label>

                        <label className='checkbox-item'>
                            <input type='checkbox' />
                            <span className='checkmark-box'>Finances</span>
                        </label>

                        <label className='checkbox-item'>
                            <input type='checkbox' />
                            <span className='checkmark-box'>Grief</span>
                        </label>

                        <label className='checkbox-item'>
                            <input type='checkbox' />
                            <span className='checkmark-box'>General</span>
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
                </div>


                <div className='cover-box2' style={{ width: '10%' }}>
                    <div class="box1">
                        <h2>Clinicians</h2>
                        <div class="summary-box">
                            <div class="requests">
                                <div className='request-1'>
                                    <img src={'/Ramirezpfp.png'} />
                                    <h3>Jasmine Ramirez</h3>
                                    <h4>LCSW, CFSW | NY, NJ</h4>
                                    <div class="clinician_1">Specializes in:</div>
                                    <div class="consultation">
                                        <div class="consultation_details">Life Transition</div>
                                        <div class="consultation_details">Financial Anxiety</div>
                                    </div>

                                    <div class="clinician_1">Typically available:</div>
                                    <div class="consultation">
                                      <div class="days">
                                        <div class="consultation_details">Mon</div>
                                        <div class="consultation_details">Tues-Thurs</div>
                                        <div class="consultation_details">Friday</div>
                                      </div>
                                      <div class="times">
                                        <div class="consultation_details">3pm-6pm</div>
                                       
                                        <div class="consultation_details">9am-6pm</div>
                                      
                                        <div class="consultation_details">9am-12pm</div>
                                        </div>  
                                    </div>
                             

                                    <div class="view_consultation">
                                    <a href="/clinician-j-ramirez">Book an appointment</a>
                                    </div>

                                </div>

                                <div className='request-2'>
                                    <img src={'/Tapiapfp.png'} />
                                    <h3>Lilliana Tapia</h3>
                                    <h4>LMSW | NY</h4>
                                    <div class="clinician_1">Specializes in:</div>
                                    <div class="consultation">
                                        <div class="consultation_details">Anxiety</div>
                                        <div class="consultation_details">Depression</div>
                                        <div class="consultation_details">LGBTQ+</div>

                                    </div>

                                    <div class="clinician_1">Typically available:</div>
                                    <div class="consultation">
                                    <div class="days">
                                        <div class="consultation_details">Mon-Wed</div>
                                        <div class="consultation_details">Sunday</div>
                                        </div>
                                    <div class="times">
                                        <div class="consultation_details">6pm-8pm</div>
                                        <div class="consultation_details">8am-10am</div>
                                    </div>
                                    </div>
                             

                                    <div class="view_consultation">
                                        <a href="/clinician-l-tapia">Book an appointment</a>
                                    </div>

                                </div>

                                <div className='request-3'>
                                    <img src={'/Silvapfp.png'} />
                                    <h3>Sierra Silva</h3>
                                    <h4>LICSW, LCSW-C | MD</h4>
                                    <div class="clinician_1">Specializes in:</div>
                                    <div class="consultation">
                                        <div class="consultation_details">Grief</div>
                                        <div class="consultation_details">Trauma</div>
                                        <div class="consultation_details">Depression</div>

                                    </div>

                                    <div class="clinician_1">Typically available:</div>
                                    <div class="consultation">
                                    <div class="days">
                                        <div class="consultation_details">Mon-Thurs</div>
                                        <div class="consultation_details">Saturday</div>
                                        </div>
                                    <div class="times">
                                        <div class="consultation_details">6pm-8pm</div>
                                        <div class="consultation_details">8am-12pm</div>
                                    </div>
                                    </div>
                             
                                    
                                    <div class="view_consultation">
                                        <a href="/clinician-s-silva">Book an appointment</a>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </div >
        </div >
    );
}

export default Category;