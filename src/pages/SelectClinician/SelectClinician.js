import { React, useState } from 'react';
import './SelectClinician.css';
import { SlCalender } from "react-icons/sl";
import { MdOutlineArrowOutward } from "react-icons/md";
import { AiFillSlackCircle } from "react-icons/ai";
import { FaUserCheck } from "react-icons/fa6";

function Category() {

    const filter_groups = {
        "Specialization": [
            "Relationship",
            "Depression",
            "Life Transition",
            "Finances",
            "Grief",
            "General"
        ],
        "Gender": [
            "Male",
            "Female",
            "Non-Binary",
            "Other"
        ],
        "Language": [
            "English",
            "Spanish"
        ],
        "Ethnicity": [
            "Hispanic/Latinx",
            "Asian",
            "Black",
            "White",
            "Native American",
            "Other"
        ]
    }

    const Checkbox = ({ name, onChange, checked }) => {
        return (
            <label className='checkbox-item'>
                <input type='checkbox' onChange={onChange} checked={checked} />
                <span className='checkmark-box'>{name}</span>
            </label>
        )
    }

    /*
        This function takes a checkbox group with a category name 
        and some filter options and returns the HTML for the group.

        @param name: string name of the category
        @param group: list of strings corresponding to the items in this category
    */
    const CheckboxGroup = ({ name, group }) => {
        const [checked, setChecked] = useState(new Array(group.length).fill(false))
        const [radioChecked, setRadioChecked] = useState(false)

        const handleCheck = (idx) => (() => {
            setChecked(checked.map(
                (v, i) => {
                    return i == idx ? !v : v
                }
            ))
        })

        return (
            <div>
                <div className='filter-container'>
                    <div className='filter-menu'>
                        <h4><u>{name}</u></h4>

                        <div className="radio-button">
                            <label className='check-all'>
                                <input type='checkbox' onChange={
                                    () => {
                                        setChecked(new Array(group.length).fill(!radioChecked));
                                        setRadioChecked(!radioChecked);
                                    }
                                } checked={radioChecked} />
                                <span className='radiomark'>All</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className='checkbox-container'>
                    {group.map((name, i) => (
                        <Checkbox name={name} key={i} onChange={handleCheck(i)} checked={checked[i]} />
                    ))
                    }
                </div>
            </div>
        )
    }

    function Practitioner(photo, name, clininfo, specialties, days, times) {
        return (
            <div className='request-2'>
                <img src={photo} />
                <h3>name</h3>
                <div className='clin-info'>
                    <h4>clininfo</h4>
                    <div className="clinician_2">Specializes in:</div>
                    <div className="consultation">
                        {specialties.map((specialty) => (
                            <div className="consultation_details">{specialty}</div>
                        ))}
                    </div>

                    <div className="clinician_2">Typically available:</div>
                    <div className="consultation">
                        <div className="days">
                            {days.map((day) => (
                                <div className="consultation_details">day</div>
                            ))}
                        </div>
                        <div className="times">
                            {times.map((time) => (
                                <div className="consultation_details">time</div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="view_consultation">
                    {/* <a href="/clinician-j-ramirez">Book an appointment</a> */}
                    <a href="/patient-info">Book an appointment</a>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="search-bar">
                <h1>Select a Clinician</h1>
                <div className="search-container">
                    <input type="text" placeholder="Search by name" />
                    <button>Search</button>
                </div>
            </div>


            <div className="flex-container">
                <div className='cover-box1'>
                    <h2>Filter by:</h2>

                    {Object.keys(filter_groups).map(
                        (key) => (
                            <CheckboxGroup key={key} name={key} group={filter_groups[key]} />
                        )
                    )}
                </div>


                <div className='cover-box2'>
                    <div className="box1">
                        <h2>Clinicians</h2>
                        <div className="summary-box-sc">
                            <div className="requests">
                                <div className='request-2'>
                                    <img src={'/Ramirezpfp.png'} />
                                    <h3>Jasmine Ramirez</h3>
                                    <div className='clin-info'>
                                        <h4>LCSW, CFSW | NY, NJ</h4>
                                        <div className='description'>
                                        As a dedicated Latina Social Worker with a Certification in Financial 
                                        Social Work, I focus on helping individuals navigate money-related 
                                        emotions, alleviate financial anxieties, and embrace achievements 
                                        without guilt or imposter syndrome, addressing concerns ranging from 
                                        partner discussions to the fear of financial mistakes and business-related 
                                        worries.
                                        </div>

                                        <div className="clinician_2">Specializes in:</div>
                                        <div className="consultation">
                                            <div className="consultation_details">Life Transition</div>
                                            <div className="consultation_details">Financial Anxiety</div>
                                        </div>

                                        <div className="clinician_2">Typically available:</div>
                                        <div className="consultation">
                                            <div className="days">
                                                <div className="consultation_details">Mon</div>
                                                <div className="consultation_details">Tues-Thurs</div>
                                                <div className="consultation_details">Friday</div>
                                            </div>
                                            <div className="times">
                                                <div className="consultation_details">3pm-6pm</div>

                                                <div className="consultation_details">9am-6pm</div>

                                                <div className="consultation_details">9am-12pm</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="view_consultation">
                                        {/* <a href="/clinician-j-ramirez">Book an appointment</a> */}
                                        <a href="/patient-info">Book an appointment</a>
                                    </div>

                                </div>

                                <div className='request-2'>
                                    <img src={'/Tapiapfp.png'} />
                                    <h3>Lilliana Tapia</h3>
                                    <div className='clin-info'>
                                        <h4>LMSW | NY</h4>
                                        <div className='description'>
                                        I'm Lilliana, a bilingual Latina therapist with over 10 years of experience, 
                                        specializing in anxiety, depression, trauma, personality disorders, and 
                                        psychotic disorders. I create a safe and culturally-sensitive space, 
                                        utilizing evidence-based techniques like Dialectical Behavioral Therapy 
                                        and Cognitive Behavioral Therapy to help you feel your best, providing 
                                        personalized support for young adults and BIPOC/LGBTQIA individuals.
                                        </div>
                                        <div className="clinician_2">Specializes in:</div>
                                        <div className="consultation">
                                            <div className="consultation_details">Anxiety</div>
                                            <div className="consultation_details">Depression</div>
                                            <div className="consultation_details">LGBTQ+</div>

                                        </div>

                                        <div className="clinician_2">Typically available:</div>
                                        <div className="consultation">
                                            <div className="days">
                                                <div className="consultation_details">Mon-Wed</div>
                                                <div className="consultation_details">Sunday</div>
                                            </div>
                                            <div className="times">
                                                <div className="consultation_details">6pm-8pm</div>
                                                <div className="consultation_details">8am-10am</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="view_consultation">
                                        {/* <a href="/clinician-l-tapia">Book an appointment</a> */}
                                        <a href="/patient-info">Book an appointment</a>
                                    </div>

                                </div>

                                <div className='request-2'>
                                    <img src={'/Silvapfp.png'} />
                                    <h3>Sierra Silva</h3>
                                    <div className='clin-info'>
                                        <h4>LICSW, LCSW-C | MD</h4>
                                        <div className='description'>
                                        My passion lies in providing compassionate support to individuals 
                                        in Maryland or DC who identify as Black, Indigenous, or Person of 
                                        Color (BIPOC). I have over 11 years of experience working with 
                                        individuals experiencing grief, trauma, depression, anxiety, and 
                                        other life transitions. Know that as your therapist, I'm joining 
                                        you on your journey and I'll be right by your side!
                                        </div>
                                        <div className="clinician_2">Specializes in:</div>
                                        <div className="consultation">
                                            <div className="consultation_details">Grief</div>
                                            <div className="consultation_details">Trauma</div>
                                            <div className="consultation_details">Depression</div>

                                        </div>

                                        <div className="clinician_2">Typically available:</div>
                                        <div className="consultation">
                                            <div className="days">
                                                <div className="consultation_details">Mon-Thurs</div>
                                                <div className="consultation_details">Saturday</div>
                                            </div>
                                            <div className="times">
                                                <div className="consultation_details">6pm-8pm</div>
                                                <div className="consultation_details">8am-12pm</div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="view_consultation">
                                        {/* <a href="/clinician-s-silva">Book an appointment</a> */}
                                        <a href="/patient-info">Book an appointment</a>
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