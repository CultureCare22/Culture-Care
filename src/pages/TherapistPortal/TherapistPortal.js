import { React, useState, useEffect } from 'react';
import './TherapistPortal.css';
// import PendingRequest from './pages/PendingRequest/PendingRequest';
import { SlCalender } from "react-icons/sl";
import { MdOutlineArrowOutward } from "react-icons/md";
import { AiFillSlackCircle } from "react-icons/ai";
import { FaUserCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import dummy_data from "../../dummy_clinician.json";


const url = "https://culture-care.onrender.com"
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

    const navigate = useNavigate();
    useEffect(() => {
        const checkAuth = () => {
            const emails = localStorage.getItem("practitionerEmails");

            const userEmail = localStorage.getItem("email");

            if (!userEmail || !emails.includes(userEmail)) {
                console.log("unauthenticated user")
                navigate(-1);
            }
        }
        checkAuth();
    })



    useEffect(() => {
        const fetchData = async () => {
            const endpoint = `/practitioners/get/2`;
            // "http://127.0.0.1:8000"
            console.log('asdifuhaoisdufhaoiudsfhioauhsfipuashdfoiausdhfiuash\n\n\\n\asfasdfasdf\n\n')
            const response = await fetch(url + endpoint);
            const data = await response.json();

            try {
                const response = await fetch(url + endpoint);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setPractitioners(data);
                    setSpecializations(practitioners.specializations);
                    setGenders(practitioners.genders)
                    setLocations(practitioners.locations)
                    setLanguages(practitioners.languages)
                    setName(practitioners.name)
                    setDescription(practitioners.description)
                    setEmail(practitioners.email_address)
                    setAppointments(practitioners.appointments);
                    // TO GET APPOINTMENTS USE STRINGIFY JSON
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

        const handleStatusChange = async (event) => {
            const newStatus = event.target.value;
    
            const requestBody = {
                patient_name: patient_name,
                paymentmethod: payment_method,
                status: newStatus,
            };
    
            try {
                const slugified = requested_clinician.toLowerCase().replace(/ /g, '-');
                const response = await fetch(url + `/practitioners/${encodeURIComponent(requested_clinician)}/appointments/update/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });
    
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
    
                const data = await response.json();
                console.log('Success:', data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        return (
                <tr>
                    <th scope='row'>{patient_name}</th>
                    <td>{requested_clinician}</td>
                    <td>{payment_method}</td>
                    <td>
                    <select
                        name='update_status'
                        id={`update_status_${patient_name}`} 
                        value={status}
                        onChange={handleStatusChange}
                    >
                            <option value='Awaiting Approval'>Awaiting Approval</option>
                            <option value='Approved'>Approved</option>
                            <option value='Declined'>Declined</option>
                        </select>
                    </td>
                </tr>
        )
    }

    const ApptRequests = ({ appointments_test }) => {
        const { practitioners } = appointments_test;

        const allAppointments = practitioners.flatMap(practitioner => {
            let appointmentsArray;
            if (Array.isArray(practitioner.appointments)) {
                appointmentsArray = practitioner.appointments;
            } else if (typeof practitioner.appointments === 'string' && practitioner.appointments.trim() !== '') {
                try {
                    appointmentsArray = JSON.parse(practitioner.appointments);
                } catch (error) {
                    console.error("Error parsing appointments JSON", error);
                    appointmentsArray = []; 
                }
            } else {
                appointmentsArray = [];
            }
            
            return appointmentsArray.map(appointment => ({
                ...appointment,
                clinician: practitioner.name,
            }));
        });

        return (
            <>
              {allAppointments.map((appointment, index) => (
                <Appt
                  key={index}
                  id={appointment.id} 
                  patient_name={appointment.patient_name}
                  payment_method={appointment.paymentmethod} 
                  status={appointment.status}
                  requested_clinician={appointment.clinician}
                />
              ))}
            </>
        )
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
                                <th scope='col'>Requested Clinician</th>
                                <th scope='col'>Payment</th>
                                <th scope='col'>Appointment Status</th>
                            </tr>
                        </thead>
                    <tbody>
                        <ApptRequests appointments_test={dummy_data}/>
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



