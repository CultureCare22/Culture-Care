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
                            <img src={'/Ramirezpfp.png'} />
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
                                <dt>NY, NJ</dt>
                                <dd>Address</dd>
                                <dt>123 Street, NY</dt>
                                <dd>Currently Accepting Clients: </dd>
                                <dt>Yes</dt>
                                <dd>Education: </dd>
                                <dt>A school</dt>
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
                        <p>Jasmine is the founder of Honest Hour—a culturally-sensitive practice dedicated to empowering 
                            individuals and fostering honesty and empowerment in their life stories. Jasmine's mission is 
                            to help her clients lead fulfilling lives, regardless of their past or present circumstances.
                        </p>
                        <p>As a New York native and Latina, Jasmine brings a unique perspective to her practice, combining 
                            her personal experiences with her academic achievements. She holds a Master's degree from New 
                            York University and a Bachelor's degree from Rutgers University.
                        </p>
                        <p>
                        Jasmine firmly believes that life presents its challenges, and achieving balance in one's career, 
                        relationships, finances, and health is crucial for overall well-being. Her expertise lies in empowering 
                        individuals, particularly in the BIPOC community, to make informed decisions, alleviating anxieties, 
                        and assisting them in celebrating their accomplishments without succumbing to guilt or imposter syndrome.
                        </p>
                        <p>
                        Notably, Jasmine is a Certified Financial Social Worker (CFSW) and one of the pioneering entrepreneurs in 
                        her family. She understands firsthand the exhilarating yet challenging nature of achieving financial 
                        success, which often comes with unique responsibilities and pressures.
                        </p>
                        <p>
                        With a personalized and collaborative approach, Jasmine cultivates a safe and supportive environment 
                        for her clients to embark on their healing journey, guiding them towards a confident and promising 
                        future. Whether it's embracing one's personal growth or navigating the complexities of financial 
                        prosperity, Jasmine is committed to helping her clients navigate life's obstacles and reach their 
                        full potential.
                        </p>

                        <h2>Specialization</h2>
                        <div className='specializations'>
                            <div className='specs'>Life Transition</div>
                            <div className='specs'>Financial Anxiety</div>
                            <div className='specs'>Group Practice</div>
                            <div className='specs'>Family</div>
                            <div className='specs'>General</div>
                            <div className='specs'>Something Else</div>
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
        <Practitioner name={name} description = {description} specializations={specializations} locations={locations} email={email}/>
    );

}

export default ClinicianProfile;