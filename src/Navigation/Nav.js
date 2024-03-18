import "./Nav.css"
import { React, useState, useEffect } from 'react';
import { getAuth, signOut } from "firebase/auth";

function Nav() {
    const auth = getAuth();

    const [practitionerEmails, setPractitionersEmails] = useState(["cc.culturecare@gmail.com", "ab2838@cornell.edu"])

    useEffect(() => {
        const fetchData = async () => {
            const url = "https://culture-care.onrender.com/practitioners/get/";
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    const practitioners = data.practitioners

                    for (const practitioner of practitioners) {

                        const email = practitioner["email_address"]

                        setPractitionersEmails((prevEmail) => [...prevEmail, email]);

                    }

                } else {
                    console.log("Error fetching data: ", response.statusText);
                }
            } catch (error) {
                console.log("Fetching Practitioners failed: ", error);
            }
        }
        fetchData();

    }, [])

    console.log(practitionerEmails)
    localStorage.setItem('practitionerEmails', JSON.stringify(practitionerEmails));

    const checkAuth = () => {

        const email = localStorage.getItem("email")
        if (!practitionerEmails.includes(email)) {
            signOut(auth).then(() => {
                localStorage.removeItem("email")
            }).catch((error) => {
                // An error happened.
            });
            window.location.href = "/login";
        }
        else {
            window.location.href = "/pending-request"
        }
    }


    return <nav>
        <div className="navbar_container">
            <a href="/">Culture Care</a>
        </div>

        <div className='navbar_menu'>
            <a href="/">Home</a>
            <a onClick={checkAuth}>Therapist Dashboard</a>
        </div>
    </nav>

}

export default Nav
