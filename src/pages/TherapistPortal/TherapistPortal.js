import { React, useState, useEffect } from 'react';
import './TherapistPortal.css';
// import PendingRequest from './pages/PendingRequest/PendingRequest';
import { SlCalender } from "react-icons/sl";
import { MdOutlineArrowOutward } from "react-icons/md";
import { AiFillSlackCircle } from "react-icons/ai";
import { FaUserCheck } from "react-icons/fa6";

function Category() {
    const [practitioners, setPractitioners] = useState([]);
    const [name, setName] = useState('')
    const [specializations, setSpecializations] = useState([])
    const [genders, setGenders] = useState([])
    const [locations, setLocations] = useState([])
    const [languages, setLanguages] = useState([])
    const [description, setDescription] = useState([])
    const [email, setEmail] = useState([])
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const url = `https://culture-care.onrender.com/practitioners/get/2`;

            const response = await fetch(url);
            const data = await response.json();
            
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setPractitioners(data);
                    // console.log(practitioners);
                    setSpecializations(practitioners.specializations);
                    setGenders(practitioners.genders)
                    setLocations(practitioners.locations)
                    setLanguages(practitioners.languages)
                    setName(practitioners.name)
                    setDescription(practitioners.description)
                    setEmail(practitioners.email_address)
                    setAppointments(practitioners.appointments);
                } else {
                    console.log("Error fetching data: ", response.statusText);
                }
            } catch (error) {
                console.log("Fetching Practitioners failed: ", error);
            }
        }
        fetchData();

    }, [])

    const Appt = ({ time, id, patient_name, payment_method, status, requested_clinician }) => {
        return (
            <>
                <tr>
                    <th scope='row'>{patient_name}</th>
                    <td>{time}</td>
                    <td>{requested_clinician}</td>
                    <td>{payment_method}</td>
                    <td>{status}</td>
                    <td><a href={`/pending-request-details/${id}`}>Details</a></td>
                </tr>
            </>
        )
    }

    const ApptRequests = () => {
        for (let appointment in appointments) {
            return (
                <Appt
                    time = {appointment['start']['dateTime']}
                    id = {appointment['start']['id']}
                    patient_name = {appointment['description']['patient name']}
                    payment_method = {appointment['description']['paymentmethod']}
                    status = {appointment['status']}
                    requested_clinician = {appointment['clinician']}
                />
            )
        }  
    }
    return (
        <div className='therapist-portal-page'>
            <h1>Therapist Portal</h1>
            <div className='row-flex'>
                <div class="allrequests">
                    <h2>Appointment Requests</h2>
                    
                    <table class='request-table'>
                        <thead>
                            <tr>
                                <th scope='col'>Name</th>
                                <th scope='col'>Time</th>
                                <th scope='col'>Requested Clinician</th>
                                <th scope='col'>Payment</th>
                                <th scope='col'>Appointment Status</th>
                                <th scope='col'>View/Update</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {/* <ApptRequests /> */}
                            <tr>
                                <th scope='row'>Fatima Perez</th>
                                <td>3/11 @ 10:00am</td>
                                <td>Jasmine Ramirez</td>
                                <td>Self-Pay</td>
                                <td>Awaiting Approval</td>
                                <td><a href='/pending-request-details'>Details</a></td>
                            </tr>
                            <tr>
                                <th scope='row'>Aracella Davis</th>
                                <td>3/15 @ 8:00am</td>
                                <td>Lilliana Tapia</td>
                                <td>OON</td>
                                <td>Awaiting Approval</td>
                                <td><a href='/pending-request-details'>Details</a></td>
                            </tr>
                            <tr>
                                <th scope='row'>Isa Montes</th>
                                <td>3/18 @ 9:30am</td>
                                <td>Sierra Silva</td>
                                <td>OON</td>
                                <td>Awaiting Approval</td>
                                <td><a href='/pending-request-details'>Details</a></td>
                            </tr>
                            <tr>
                                <th scope='row'>Isa Montes</th>
                                <td>3/18 @ 9:30am</td>
                                <td>Sierra Silva</td>
                                <td>OON</td>
                                <td>Awaiting Approval</td>
                                <td><a href='/pending-request-details'>Details</a></td>
                            </tr>
                            <tr>
                                <th scope='row'>Isa Montes</th>
                                <td>3/18 @ 9:30am</td>
                                <td>Sierra Silva</td>
                                <td>OON</td>
                                <td>Awaiting Approval</td>
                                <td><a href='/pending-request-details'>Details</a></td>
                            </tr>
                        </tbody>
                    </table>      
                </div>
                <div className='data-stats'>
                    <div class="box1">
                        <h2>Summary</h2>
                        <div class="cr_box">
                            <div class="tile-head">
                                <img src={'/calendar-logo.png'} />
                                <div class="flex-calender">
                                    <p><SlCalender style={{ color: 'white' }} className='calender' /></p>
                                    <div class="p-consultation">Consultation</div>
                                    <div class="p-consultation">Requests</div>
                                </div>
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
                                <p><AiFillSlackCircle style={{ color: 'white' }} className='fact-check' /></p>
                                <div class="circle-text_1">4.5</div>
                                <div class="circle-text_2">Average Request Per Clinician</div>
                            </div>

                            <div class="box_3">
                                <p><FaUserCheck style={{ color: 'white' }} className='fact-check' /></p>
                                <div class="circle-text_1">90%</div>
                                <div class="circle-text_2">Verified Out-Of-Network Benefits</div>
                            </div>

                            <div class="box_4">
                                <p><FaUserCheck style={{ color: 'white' }} className='fact-check' /></p>
                                <div class="circle-text_1">83%</div>
                                <div class="circle-text_2">Conversion Rate</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    );
}

export default Category;



