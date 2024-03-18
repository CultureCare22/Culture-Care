import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ClinicianProfile.css';
import { SlCalender } from "react-icons/sl";
import { MdOutlineArrowOutward } from "react-icons/md";
import { AiFillSlackCircle } from "react-icons/ai";
import { FaUserCheck } from "react-icons/fa6";

function ClinicianProfile() {
    let { pId } = useParams();
    pId = parseInt(pId);
    // console.log({pId});

    const [practitioners, setPractitioners] = useState({})
    const [name, setName] = useState('')
    const [specializations, setSpecializations] = useState([])
    const [genders, setGenders] = useState([])
    const [locations, setLocations] = useState([])
    const [languages, setLanguages] = useState([])
    const [description, setDescription] = useState([])
    const [email, setEmail] = useState([])
    const [image, setImage] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            console.log({pId});
            
            console.log(typeof pId);
            const url = `https://culture-care.onrender.com/practitioners/get/${pId}`;

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
                    if ({pId} == 1) {
                        setImage('/Ramirezpfp.png')
                    } else if ({pId} == 2) {
                        setImage('/Tapuapfp.png')
                    } else if ({pId} == 3){
                        setImage('/Silvapfp.png')
                    }
                    console.log(practitioners.specializations[0]['name'])
                } else {
                    console.log("Error fetching data: ", response.statusText);
                }
            } catch (error) {
                console.log("Fetching Practitioners failed: ", error);
            }
        }
        fetchData();

    }, [])

    // console.log(practitioners)
    // console.log(email)
    // let {id, name, specializations, locations, genders} = practitioners;
    // console.log(name)
    // console.log()
    

    const Practitioner = ({ id, image, name, description, specializations, availibility, licenses, locations }) => {
        return (
            <div>
                <h1>Clinician Profile</h1>
                <div className='clin-prof'>
                    <div className='clinician-qfacts'>
                        <div className='clinician-pic'>
                            {/* <img src={`/${pId}.png/`} /> */}
                            <img src={image} />
                            <div className='name-and-spec'>
                                <h2>{practitioners.name}</h2>
                                <h3>LCSW, CFSW</h3>
                            </div>
                        </div>
                        <div className='clinician-basic'>
                            <h2>Personal/Contact</h2>
                            <dl>
                                <dd>Email: </dd>
                                <dt>{practitioners.email_address}</dt>
                                <dd>Phone</dd>
                                <dt>+1-123-456-7890</dt>
                                <dd>Licensed In: </dd>
                                <dt>{practitioners.locations[0]['name']}</dt>
                                <dd>Address</dd>
                                <dt>123 Street, NY</dt>
                                <dd>Currently Accepting Clients: </dd>
                                <dt>Yes</dt>
                            </dl>

                            <h2>Typical Availability</h2>
                            <dl>
                                <dd>Monday: </dd>
                                <dt>3:00 PM - 6:00 PM</dt>
                                <dd>Tuesday: </dd>
                                <dt>9:00 AM - 6:00 PM</dt>
                                <dd>Wednesday: </dd>
                                <dt>9:00 AM - 6:00 PM</dt>
                                <dd>Thursday: </dd>
                                <dt>9:00 AM - 6:00 PM</dt>
                                <dd>Friday: </dd>
                                <dt>9:00 AM - 12:00 PM</dt>
                            </dl>
                        </div>
                    </div>
                    <div className='clinician-summary'>
                        <h2>About</h2>
                        <p>{practitioners.description}</p>

                        <h2>Specialization</h2>
                        {/* <div className="consultation">
                        {specializations.slice(0, 2).map(specialization => (<div className="consultation_details">{specialization.name}</div>))}
                        </div> */}
                        <div className='specializations'>
                            <div className='specs'>{practitioners.specializations[0]['name']}</div>
                            <div className='specs'>{practitioners.specializations[1]['name']}</div>
                            {/* <div className='specs'>Group Practice</div> */}
                            {/* <div className='specs'>Family</div> */}
                            {/* <div className='specs'>General</div> */}
                            {/* <div className='specs'>Something Else</div> */}
                        </div>
                        
                        <div className="view_consultation">
                            {/* FIX LATER ADD ID */}
                            <a href={`/patient-info/${pId}`}>Book an appointment</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Practitioner name={name} image={image} description = {description} specializations={specializations} locations={locations} email={email}/>
    );

}

export default ClinicianProfile;