import { React, useState, useEffect } from 'react';
import './TherapistPortal.css';
// import PendingRequest from './pages/PendingRequest/PendingRequest';
import { SlCalender } from "react-icons/sl";
import { MdOutlineArrowOutward } from "react-icons/md";
import { AiFillSlackCircle } from "react-icons/ai";
import { FaUserCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import dummy_data from "../../dummy_clinician.json";

var run = 1
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
    const [allAppointments, setAllAppointments] = useState(["asdf"])
    const [getAllPractitionerData, setData] = useState(dummy_data);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    // useEffect(() => {
    //     const checkAuth = () => {
    //         const emails = localStorage.getItem("practitionerEmails");

    //         const userEmail = localStorage.getItem("email");

    //         if (!userEmail || !emails.includes(userEmail)) {
    //             console.log("unauthenticated user")
    //             navigate(-1);
    //         }
    //     }
    //     checkAuth();
    // })



    useEffect(() => {
        const fetchData = async () => {
            const endpoint = `/practitioners/get/2`;
            // "http://127.0.0.1:8000"

            const response = await fetch(url + endpoint);
            const data = await response.json();
            console.log(data);

            try {
                const response = await fetch(url + endpoint);
                if (response.ok) {
                    const data = await response.json();
                    // console.log(data);
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

    useEffect(() => {
        const fetchData = async () => {
            const url = `http://127.0.0.1:8000`;
            const endpoint = `/practitioners/get/`

            try {
                const response = await fetch(url + endpoint);
                if (response.ok) {
                    const data = await response.json();
                    console.log("\n\n\nddddata",data);
                    setData(data);
                    setIsLoading(false);
                } else {
                    console.log("Error fetching data: ", response.statusText);
                }
            } catch (error) {
                console.log("Fetching Practitioners failed: ", error);
            }
        }
        fetchData();
    }, [])

    const Appt = ({ time, id, patient_name, payment_method, status, requested_clinician, referral, pass_status }) => {

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
                    {/* <td>{referral}</td> */}
                    <td>Anxiety</td>
                    <td>{pass_status}</td>
                    <td className='appt_status'><p>Awaiting Approval</p></td>
                    <td className='link_details'><a href='/'>View</a></td>

                    {/* <td>
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
                    </td> */}
                </tr>
        )
    }

    // const processData = ({appointments_test}) => {
    //     const { practitioners } = appointments_test;

    //     const allAppointmentsProcessed = practitioners.flatMap(practitioner => {
    //         let appointmentsArray;
    //         if (Array.isArray(practitioner.appointments)) {
    //             appointmentsArray = practitioner.appointments;
    //         } else if (typeof practitioner.appointments === 'string' && practitioner.appointments.trim() !== '') {
    //             try {
    //                 appointmentsArray = JSON.parse(practitioner.appointments);
    //             } catch (error) {
    //                 console.error("Error parsing appointments JSON", error);
    //                 appointmentsArray = []; 
    //             }
    //         } else {
    //             appointmentsArray = [];
    //         }
            
    //         return appointmentsArray.map(appointment => ({
    //             ...appointment,
    //             clinician: practitioner.name,
    //         }));
    //     });

    // }
    useEffect(() => {
        const processData = (appointments_test) => {
            const { practitioners } = appointments_test;

            const allAppointmentsProcessed = practitioners.flatMap(practitioner => {
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
            return allAppointmentsProcessed;
        };

        // Assuming dummy_data is imported and available

        // const processedAppointments = processData(dummy_data);
        const processedAppointments = processData(getAllPractitionerData);
        setAllAppointments(processedAppointments);

    }, [isLoading]);

    const ApptRequests = ({ appointments_test }) => {
        return (
            <>
              {appointments_test.map((appointment, index) => (
                <Appt
                  key={index}
                  id={appointment.id} 
                  patient_name={appointment.patient_name}
                  payment_method={appointment.paymentmethod} 
                  status={appointment.status}
                  requested_clinician={appointment.clinician}
                  referral={appointment.referral}
                  pass_status={appointment.pass_status}
                />
              ))}
            </>
        )
    }

    var oonCount = allAppointments.filter(appointment => appointment.paymentmethod === "OON").length;
    var totalAppointments = allAppointments.length;
    var oonPercentage = (oonCount / totalAppointments) * 100;
    var formattedPercentage = oonPercentage.toFixed(1) + "%";


    const referralCounts = allAppointments.reduce((acc, {referral}) => {
        acc[referral] = (acc[referral] || 0) + 1;
        return acc;
    }, {});
    
    // Find highest referral source
    const highestReferralSource = Object.keys(referralCounts).reduce((a, b) => referralCounts[a] > referralCounts[b] ? a : b);
    console.log("highestReferralSource", highestReferralSource)
    const formattedHighestReferralSource = highestReferralSource.match(/.{1,7}/g).join('\n');
    // Calculate percentage dominance
    const totalReferrals = allAppointments.length;
    const percentageDominance = ((referralCounts[highestReferralSource] / totalReferrals) * 100).toFixed(1);
    
    console.log(`Highest Referral Source: ${highestReferralSource}, Percentage Dominance: ${percentageDominance}%`);
    console.log(allAppointments.length)

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
                                <th scope='col'>Concerns</th>
                                <th scope='col'>Pass Status</th>
                                <th scope='col'>Appt Status</th>
                                <th scope='col'>Details</th>
                            </tr>
                        </thead>
                    <tbody>
                        <ApptRequests appointments_test={allAppointments}/>
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
                                <div class="p-22">{allAppointments.length}</div>
                                {/* <p><MdOutlineArrowOutward style={{ color: 'green' }} className='arrow' /></p>
                                <span className='text'>9.5%</span>
                                <div class="p-lastline">from last week</div> */}
                            </div>
                        </div>

                        <div class="boxes">
                            <div class="box_2">
                                <p><AiFillSlackCircle style={{ color: 'white' }} className='fact-check' /></p>
                                <div class="circle-text_1">{(allAppointments.length / 3).toFixed(1)}</div>
                                <div class="circle-text_2">Average Request Per Clinician</div>
                            </div>

                            <div class="box_3">
                                <p><FaUserCheck style={{ color: 'white' }} className='fact-check' /></p>
                                <div class="circle-text_1">{formattedPercentage}</div>
                                <div class="circle-text_2">Percentage of Out-Of-Network</div>
                            </div>

                            <div class="box_4">
                                <p><FaUserCheck style={{ color: 'white' }} className='fact-check' /></p>
                                <div class="circle-text_1">{formattedHighestReferralSource} {percentageDominance}%</div>
                                <div class="circle-text_2">Highest Referral Source</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    );
}

export default Category;



