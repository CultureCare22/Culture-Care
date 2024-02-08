import React from 'react'
import './PendingRequest.css';
import { MdCheck } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import { RxBorderSolid } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaRegCheckCircle } from "react-icons/fa";

function Confirmation() {
    // const params = useParams()
    return (
        <>
            <div className="scrollable-div" style={{ overflow: "scroll" }}>
                <h1>Pending Appointments</h1>

                <div class="flex-container">
                    <div className='patient-details'>
                        <h3>Patient Details:</h3>
                        <div class="patient-box">
                            <h4>Personal/Contact Info</h4>

                            <div className='flex-container'>
                                <MdCheck style={{ color: 'white' }} className='check' />
                                <div class="patient_identity">Name</div>
                            </div>
                            <p>Fatima Perez</p>

                            <div className='flex-container'>
                                <MdCheck style={{ color: 'white' }} className='check' />
                                <div class="patient_identity">Date Of Birth</div>
                            </div>
                            <p>Jan 01, 2022</p>

                            <div className='flex-container'>
                                <MdCheck style={{ color: 'white' }} className='check' />
                                <div class="patient_identity">Gender</div>
                            </div>
                            <p>Female</p>

                            <div className='flex-container'>
                                <MdCheck style={{ color: 'white' }} className='check' />
                                <div class="patient_identity">Phone Number</div>
                            </div>
                            <p>+1-123-456-7890</p>

                            <div className='flex-container'>
                                <MdCheck style={{ color: 'white' }} className='check' />
                                <div class="patient_identity">Email</div>
                            </div>
                            <p>arealemaildefinitely@gmail.com</p>

                        </div>

                        <div class="patient-box">
                            <div className='flex-container'>
                                <h4>Specialization Match</h4>
                                <MdCheckCircle className='tick' />
                            </div>

                            <div className='flex-container'>
                                <div class="p-textSpecialization">Requested Specialization:</div>
                                <span className='textInfo'>Life Transition</span>
                            </div>

                            <div class="p-textSpecialization">This consultation request fits in your availability!</div>
                            <div class="p-textItalic">This patient's preferred language is Spanish</div>

                        </div>
                    </div>

                    <div class="comfirmation_box">
                        <h3>Confirmation</h3>

                        <div class="flex-container">
                            <div className='comfimation_twoBox'>
                                <h4>Appointments Details</h4>
                                <div className='flex-container'>
                                    <MdCheck style={{ color: 'white' }} className='check' />
                                    <div class="patient_identity">Appointment with</div>
                                </div>
                                <p>Jasmine Ramierz</p>

                                <div className='flex-container'>
                                    <MdCheck style={{ color: 'white' }} className='check' />
                                    <div class="patient_identity">Service</div>
                                </div>
                                <p>Initial consultation, 15 minutes</p>

                                <div className='flex-container'>
                                    <MdCheck style={{ color: 'white' }} className='check' />
                                    <div class="patient_identity">Date and Time</div>
                                </div>
                                <p>Mon. Nov 13, 2023 @ <br></br>
                                    10:00am - 10:15am EST</p>

                                <div className='flex-container'>
                                    <MdCheck style={{ color: 'white' }} className='check' />
                                    <div class="patient_identity">Location</div>
                                </div>
                                <p>Honest Hour, Jersey City, <br></br>
                                    NJ 07310 <br></br>
                                    (201)305-3575</p>

                                <div className='flex-container'>
                                    <MdCheck style={{ color: 'white' }} className='check' />
                                    <div class="patient_identity">Status</div>
                                </div>
                                <p>Awaiting Confirmation</p>

                            </div>

                            <div className='comfimation_twoBox'>
                                <h4>Automated Tasks</h4>

                                <div className='taskBox1'>
                                    <div className='flex-container'>
                                        <p>Send consultation details</p>
                                        <RxBorderSolid style={{ color: 'white' }} className='negative' />
                                    </div>
                                </div>

                                <div className='taskBox2'>
                                    <div className='flex-container'>
                                        <p>Verify insurance w/ Reimbursify</p>
                                        <RxBorderSolid style={{ color: 'white' }} className='negative' />
                                    </div>
                                </div>

                                <div className='taskBox3'>
                                    <div className='flex-container'>
                                        <p>Complete documents</p>
                                        <RxBorderSolid style={{ color: 'white' }} className='negative' />
                                    </div>
                                </div>

                                <h5>Add More Tasks:</h5>

                                <div className='taskBox4'>
                                    <div className='flex-container'>
                                        <p>Add to calender</p>
                                        <IoMdAdd style={{ color: 'grey' }} className='positive' />
                                    </div>
                                </div>

                                <div className='taskBox5'>
                                    <div className='flex-container'>
                                        <p>Verify Residence</p>
                                        <IoMdAdd style={{ color: 'grey' }} className='positive' />
                                    </div>
                                </div>

                                <div className='taskBox6'>
                                    <div className='flex-container'>
                                        <p>Search for more options</p>
                                        <RiArrowDropDownLine style={{ color: 'grey' }} className='drop-down' />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className='updateStatus'>
                            <div className='flex-container'>
                                <h4>Update Status:</h4>
                                <svg width="68" height="65" viewBox="0 0 68 65" fill="none" className='accept' xmlns="http://www.w3.org/2000/svg">
                                    <a href="/appt-approved">
                                        <path d="M34 0C27.2754 0 20.7019 1.90609 15.1106 5.47724C9.51935 9.04838 5.16149 14.1242 2.58811 20.0628C0.0147316 26.0014 -0.658582 32.536 0.653316 38.8404C1.96521 45.1448 5.2034 50.9357 9.95838 55.481C14.7134 60.0262 20.7716 63.1215 27.3669 64.3755C33.9623 65.6295 40.7986 64.9859 47.0112 62.5261C53.2239 60.0662 58.534 55.9006 62.27 50.556C66.0059 45.2114 68 38.9279 68 32.5C68 23.8805 64.4179 15.614 58.0416 9.51903C51.6654 3.4241 43.0174 0 34 0ZM29.1429 45.4768L17 33.8696L20.8614 30.1786L29.1429 38.0946L47.1386 20.8929L51.0146 24.5746L29.1429 45.4768Z" fill="#00CD81" />
                                    </a>
                                </svg>

                                <svg width="65" height="65" viewBox="0 0 65 65" fill="none" className='decline' xmlns="http://www.w3.org/2000/svg">
                                    <a href="/appt-declined">
                                        <path d="M32.5 64.9999C50.4497 64.9999 64.9999 50.4497 64.9999 32.5C64.9999 14.5502 50.4497 0 32.5 0C14.5502 0 0 14.5502 0 32.5C0 50.4497 14.5502 64.9999 32.5 64.9999ZM42.2499 45.4999L22.75 19.5L42.2499 45.4999ZM22.75 45.4999L42.2499 19.5L22.75 45.4999Z" fill="#EB3D25" />
                                        <g clip-path="url(#clip0_1195_502)">
                                            <path d="M23.9029 18.7952L18.7959 23.7641L21.4037 26.3015L27.8509 32.6801L21.4037 38.953L18.7959 41.3846L23.9029 46.4593L26.5107 43.9219L33.0665 37.5433L39.5136 43.9219L42.0128 46.4593L47.2285 41.3846L44.6206 38.953L38.0649 32.6801L44.6206 26.3015L47.2285 23.7641L42.0128 18.7952L39.5136 21.3325L33.0665 27.6054L26.5107 21.3325L23.9029 18.7952Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1195_502">
                                                <rect width="28.9759" height="28.1927" fill="white" transform="translate(18.7959 18.7952)" />
                                            </clipPath>
                                        </defs>
                                    </a>
                                </svg>



                            </div>
                        </div>


                    </div>
                </div >
            </div>
        </>

    )
};

export default Confirmation
