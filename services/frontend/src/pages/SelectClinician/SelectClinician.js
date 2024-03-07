import { React, useState, useEffect } from 'react';
import './SelectClinician.css';
import { SlCalender } from "react-icons/sl";
import { MdOutlineArrowOutward } from "react-icons/md";
import { AiFillSlackCircle } from "react-icons/ai";
import { FaUserCheck } from "react-icons/fa6";

function Category() {

    const filter_groups = {
        "Specializations": [
            "Relationship Issues",
            "Depression",
            "Life Transitions",
            "Financial Anxiety",
            "Grief",
            "General"
        ],
        "Genders": [
            "Male",
            "Female",
            "Non-Binary",
            "Other"
        ],
        "Languages": [
            "English",
            "Spanish",
            "French"
        ],
        "Locations": [
            "NY", "NJ", "CA"
        ]
        // "Ethnicity": [
        //     "Hispanic/Latinx",
        //     "Asian",
        //     "Black",
        //     "White",
        //     "Native American",
        //     "Other"
        // ]
    }



    /*
        This function takes a checkbox group with a category name 
        and some filter options and returns the HTML for the group.
    
        @param name: string name of the category
        @param group: list of strings corresponding to the items in this category
    */
    const CheckboxGroup = ({ name, group, checked, setChecked }) => {

        const handleCheck = (idx) => (() => {
            setChecked([checked[0], checked[1].map(
                (v, i) => {
                    return i == idx ? !v : v
                }
            )])
        })

        const handleRadioCheck = () => {
            setChecked([!checked[0], new Array(group.length).fill(!checked[0])]);
        }

        return (
            <div>
                <div className='filter-container'>
                    <div className='filter-menu'>
                        <h4><u>{name}</u></h4>

                        <div className="radio-button">
                            <label className='check-all'>
                                <input
                                    type='checkbox'
                                    onChange={handleRadioCheck}
                                    checked={checked[0]}
                                />
                                <span className='radiomark'>All</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className='checkbox-container'>
                    {group.map((name, i) => (
                        <label className='checkbox-item'>
                            <input type='checkbox' onChange={handleCheck(i)} checked={checked[1][i]} />
                            <span className='checkmark-box'>{name}</span>
                        </label>
                    ))
                    }
                </div>
            </div>
        )
    }


    const clinicians = {
        "Jasmine Ramirez": {
            image: "/Ramirezpfp.png",
            description: "As a dedicated Latina Social Worker with a Certification in Financial Social Work, I focus on helping individuals (age 18-65+) navigate money-related emotions, alleviate financial anxieties, and embrace achievements without guilt or imposter syndrome, addressing concerns ranging from partner discussions to the fear of financial mistakes and business-related worries. ",
            availibility: [
                ["Mon", "3pm-6pm"],
                ["Tues-Thurs", "9am-6pm"],
                ["Fri", "9am-12pm"]
            ],
            licenses: [
                "LCSW", "CFSW"
            ]
        },
        "Lilliana Tapia": {
            image: "/Tapiapfp.png",
            description: "I'm a bilingual Latina therapist with over 10 years of experience, specializing in anxiety, depression, trauma, personality disorders, and psychotic disorders for individuals and couples (age 18-65+). I create a safe and culturally sensitive space, utilizing evidence-based techniques like Dialectical Behavioral Therapy and Cognitive Behavioral Therapy to help you feel your best, providing personalized support for young adults, BIPOC/LGBTQIA individuals, and couples. ",
            availibility: [
                ["Mon-Wed", "6pm-8pm"],
                ["Sun", "8am-10am"]
            ],
            licenses: [
                "LMSW"
            ]
        },
        "Sierra Silva": {
            image: "/Silvapfp.png",
            description: "My passion lies in providing compassionate support to individuals (age 18-65+)  in Maryland or DC who identify as Black, Indigenous, or Person of Color (BIPOC). I have over 11 years of experience working with individuals experiencing grief, trauma, depression, anxiety, and other life transitions. Know that as your therapist, I'm joining you on your journey and I'll be right by your side! ",
            availibility: [
                ["Mon-Thurs", "6pm-8pm"],
                ["Sat", "8am-12pm"]
            ],
            licenses: [
                "LICSW, LCSW-C"
            ]
        }
    }


    const Practitioner = ({ id, image, name, description, specializations, availibility, licenses, locations }) => {
        return (
            <div className='request-2'>
                <img src={image} />
                <h3>{name}</h3>
                <div className='clin-info'>
                    <h4>{licenses.join(", ")} | {locations.map(location => location.name).join(", ")}</h4>
                    <div className='description'>{description}</div>

                    <div className="clinician_2">Specializes in:</div>
                    <div className="consultation">
                        {specializations.slice(0, 4).map(specialization => (<div className="consultation_details">{specialization.name}</div>))}
                    </div>

                    <div className="clinician_2">Typically available:</div>
                    <div className="consultation">
                        <div className="days">
                            {availibility.map(([day, _]) => (<div className="consultation_details">{day}</div>))}
                        </div>
                        <div className="times">
                            {availibility.map(([_, time]) => (<div className="consultation_details">{time}</div>))}
                        </div>
                    </div>
                </div>

                <div className="view_consultation">
                    {/* <a href="/clinician-j-ramirez">Book an appointment</a> */}
                    <a href={`/patient-info/${id}`}>Book an appointment</a>
                </div>

            </div>
        )
    }

    // state is stored in a dicgtionary with this format:
    /*
        {
            Group_Name: [
                "All" Checkbox state,
                [Checkbox states of each element]
            ]
        }
    */
    const [checked, setChecked] = useState(
        Object.fromEntries(
            Object.keys(filter_groups).map(v => [v, [false, new Array(filter_groups[v].length).fill(0)]])
        )
    )

    const FilteredPractitioners = ({ checked }) => {
        let [practitioners, setPractitioners] = useState([])

        useEffect(() => {
            let filtered = Object.fromEntries(
                Object.keys(checked).map((key) => {
                    const values = checked[key][1]
                    let filter = []
                    for (let i = 0; i < values.length; i++) {
                        if (values[i]) {
                            filter.push(filter_groups[key][i])
                        }
                    }

                    return [key.toLowerCase(), filter]
                })
            )
            console.log(checked)
            console.log(filtered)

            // fetch("https://culture-care-server-a5e264f8c326.herokuapp.com/practitioners/get/filter/", {
            fetch("appculturecarehub.com/practitioners/get/filter/", {

            "method": "POST",
                "body": JSON.stringify(filtered)
            })
                .then(response => response.json())
                // 4. Setting *dogImage* to the image url that we received from the response above
                .then(data => {
                    console.log(data)

                    // Filter clinicians by name for now
                    setPractitioners(data.practitioners.filter(practitioner => practitioner.id !== 1).map(practitioner => ({
                        ...clinicians[practitioner.name],
                        ...practitioner
                    })))
                })
        }, [])

        return (<div className="requests">
            {practitioners.map(practitioner => (
                <Practitioner
                    key={practitioner["name"]}
                    id={practitioner["id"]}
                    image={practitioner["image"]}
                    name={practitioner["name"]}
                    description={practitioner["description"]}
                    specializations={practitioner["specializations"]}
                    availibility={practitioner["availibility"]}
                    licenses={practitioner["licenses"]}
                    locations={practitioner["locations"]}
                />
            ))}
        </div>)
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
                            <CheckboxGroup
                                key={key}
                                name={key}
                                group={filter_groups[key]}
                                checked={checked[key]}
                                setChecked={(d) => {
                                    let newChecked = {
                                        ...checked,
                                    }
                                    newChecked[key] = d;
                                    setChecked(newChecked)
                                }}
                            />
                        )
                    )}
                </div>


                <div className='cover-box2'>
                    <div className="box1">
                        <h2>Clinicians</h2>
                        <div className="summary-box-sc">
                            <FilteredPractitioners checked={checked} />
                            {/* <div className="requests"> */}
                            {/* <div className='request-2'>
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
                                        {/* <a href="/clinician-j-ramirez">Book an appointment</a> 
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
                                {/* <a href="/clinician-l-tapia">Book an appointment</a> 
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
                                {/* <a href="/clinician-s-silva">Book an appointment</a> 
                                <a href="/patient-info">Book an appointment</a>
                            </div>

                        </div> */}

                            {/* </div> */}

                        </div>
                    </div>

                </div>
            </div >
        </div >
    );
}

export default Category;