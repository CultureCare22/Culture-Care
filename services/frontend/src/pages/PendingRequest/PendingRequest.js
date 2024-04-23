import React from 'react'
import './PendingRequest.css';
import { MdCheck } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import { RxBorderSolid } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";

function Confirmation() {
    // const params = useParams()
    return (
        <>
            {/* <div className="scrollable-div" style={{ overflow: "scroll" }}> */}
            <div className="scrollable-div">
                <h3>Pending Appointment</h3>

                <div class="flex-container-outer">
                    <div className='patient-details'>
                        <h3>Patient Details:</h3>
                        <div className='flex-container-pr'>
                            <div class="patient-box">
                                <div className="PCI">Personal/Contact Info</div>

                                <div className='flex-container-pr'>
                                    <MdCheck style={{ color: 'white' }} className='check' />
                                    <div class="patient_identity">Name</div>
                                </div>
                                <p>Fatima Perez</p>

                                <div className='flex-container-pr'>
                                    <MdCheck style={{ color: 'white' }} className='check' />
                                    <div class="patient_identity">Date Of Birth</div>
                                </div>
                                <p>Jan 01, 2022</p>

                                <div className='flex-container-pr'>
                                    <MdCheck style={{ color: 'white' }} className='check' />
                                    <div class="patient_identity">Gender</div>
                                </div>
                                <p>Female</p>

                                <div className='flex-container-pr'>
                                    <MdCheck style={{ color: 'white' }} className='check' />
                                    <div class="patient_identity">Phone Number</div>
                                </div>
                                <p>+1-123-456-7890</p>

                                <div className='flex-container-pr'>
                                    <MdCheck style={{ color: 'white' }} className='check' />
                                    <div class="patient_identity">Email</div>
                                </div>
                                <p>arealemaildefinitely@gmail.com</p>

                                <div className='flex-container-pr'>
                                    <MdCheck style={{ color: 'white' }} className='check' />
                                    <div class="patient_identity">Address</div>
                                </div>
                                <p>123 Address Street, NY 14850</p>

                                <div className='flex-container-pr'>
                                    <MdCheck style={{ color: 'white' }} className='check' />
                                    <div class="patient_identity">Preferred Language</div>
                                </div>
                                <p>Spanish</p>
                            </div>
                            <div className='patient-box'>
                                <div className='titlePR'>Appointment Details</div>
                                <div className='flex-container-pr'>
                                    <MdCheck style={{ color: 'white' }} className='check' />
                                    <div class="patient_identity">Appointment with</div>
                                </div>
                                <p>Jasmine Ramierz</p>

                                <div className='flex-container-pr'>
                                    <MdCheck style={{ color: 'white' }} className='check' />
                                    <div class="patient_identity">Service</div>
                                </div>
                                <p>Initial consultation, 15 minutes</p>

                                <div className='flex-container-pr'>
                                    <MdCheck style={{ color: 'white' }} className='check' />
                                    <div class="patient_identity">Date and Time</div>
                                </div>
                                <p>Mon. Nov 13, 2023 @ <br></br>
                                    10:00am - 10:15am EST</p>

                                <div className='flex-container-pr'>
                                    <MdCheck style={{ color: 'white' }} className='check' />
                                    <div class="patient_identity">Location</div>
                                </div>
                                <p>Honest Hour, Jersey City, <br></br>
                                    NJ 07310 <br></br>
                                    (201)305-3575</p>

                                <div className='flex-container-pr'>
                                    <MdCheck style={{ color: 'white' }} className='check' />
                                    <div class="patient_identity">Status</div>
                                </div>
                                <p>Awaiting Confirmation</p>

                                <div className='flex-container-pr'>
                                    <MdCheck style={{ color: 'white' }} className='check' />
                                    <div class="patient_identity">Specialization</div>
                                </div>
                                <p>Grief</p>

                            </div>
                        </div>
                    </div>

                    <div class="comfirmation_box">
                        <h3>Action Items</h3>

                        <div className='comfimation_twoBox'>
                            <h5 className='titlePR'>Automated Tasks</h5>

                            <div className='taskBox'>
                                <span>Send consultation details</span>
                                <RxBorderSolid style={{ color: 'white' }} className='negative' />
                            </div>

                            <div className='taskBox'>
                                <span>Verify insurance w/ Reimbursify</span>
                                <RxBorderSolid style={{ color: 'white' }} className='negative' />
                            </div>

                            <div className='taskBox'>
                                <span>Complete documents</span>
                                <RxBorderSolid style={{ color: 'white' }} className='negative' />
                            </div>

                            <h5>Add More Tasks:</h5>

                            <div className='taskBox'>
                                <span>Add to calender</span>
                                <IoMdAdd style={{ color: 'grey' }} className='positive' />
                            </div>

                            <div className='taskBox'>
                                <span>Verify Residence</span>
                                <IoMdAdd style={{ color: 'grey' }} className='positive' />
                            </div>

                            <div className='taskBox'>
                                <span>More options</span>
                                <FaChevronDown style={{ color: 'grey' }} className='drop-down' />
                            </div>
                            <div className='updateStatus'>
                                <button className='accept taskBox' type="button">Accept</button>
                                <button className='decline taskBox' type="button">Decline</button>
                            </div>
                        </div>


                    </div>
                </div >
            </div>
        </ >

    )
};

export default Confirmation
