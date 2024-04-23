import React, { useState, useEffect } from 'react';
// import Popup from 'reactjs-popup';
import './Login.css';
import { useParams } from 'react-router-dom';
import { signInWithGoogle } from '../../firebase/Firebase';
// import { GoogleLogin } from '@react-oauth/google';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


function Login() {
    const params = useParams()
    const navigate = useNavigate();
    const emails = JSON.parse(localStorage.getItem('practitionerEmails'));

    const signIn = async () => {

        const googleEmail = await signInWithGoogle();
        console.log(googleEmail)
        console.log(emails)
        if (googleEmail === "error") {
            alert("There was an error signing in")
                .then(() => navigate("/"));
        }
        else if (emails.includes(googleEmail)) {
            console.log("Practitioner signed in");
            localStorage.setItem("email", googleEmail);
            navigate("/pending-request");
        }
        else if (!emails.includes(googleEmail)) {
            console.log("Unauthorized attempt")
            alert("You are not authorized to view the therapist dashboard")
            setTimeout(function () {
                // Do something after 3 seconds
                navigate("/")
            }, 3000);
        }
    }


    return (
        <div className='sign-in-window'>
            {/* <h1>Test</h1> */}
            <body>
                <section>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <div class="signin">
                        <div class="content">
                            <h2>Sign In</h2>
                            <p>Please sign in to continue</p>
                            <div class="form">

                                <div class="inputBox">
                                    <label for='username'>Username/Email</label>
                                    <input type="text" id='username' name='username' placeholder='Enter username/email' required />

                                </div>

                                <div class="inputBox">
                                    <label for='password'>Password</label>
                                    <input type="password" id='password' name='password' placeholder='Enter password' required />

                                </div>

                                <div class="links">
                                    <a href="#">Forgot Password</a>
                                </div>
                                <div class="inputBox">
                                    {/* <a href="/select-clinician"> */}
                                    <input type="submit" value="Sign In" />
                                    <button type="button" class="login-with-google-btn" onClick={signIn}>Sign in with Google</button>
                                    {/* </a> */}
                                </div>
                                <p>
                                    New to Culture Care?
                                    {/* <a href="#">Signup</a> */}
                                    {/* <button onClick={signInWithGoogle}>Sign in with Google</button> */}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </body>
        </div>

    )
}

export default Login;
// function li() {
//     const params = useParams();
//     return (
//     <div className='sign-in-window'>
//         {/* <h1>Sign In</h1>
//         <p>Please sign in to continue</p>
//         <form>
//             <label for='username'>Username/Email</label>
//             <input type='text' id='username' name='username'></input>
//         </form> */}
//             <body> 
//                 <section>
//                     <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
//                 <div class="signin"> 
//                 <div class="content"> 
//                 <h2>Sign In</h2> 

//                 <div class="form"> 

//                     <div class="inputBox"> 

//                     <input type="text" required> <i>Username</i> </input>

//                     </div> 

//                     <div class="inputBox"> 

//                     <input type="password" required> <i>Password</i> </input>

//                     </div> 

//                     <div class="links"> 
//                     <a href="#">Forgot Password</a> 
//                     <a href="#">Signup</a> 
//                     </div> 
//                     <div class="inputBox"> 
//                         <input type="submit" value="Login"> </input>
//                     </div> 
//                 </div> 
//                 </div> 
//                 </div> 
//                 </section>
//         </body>
//     </div>
// )
// }
// export default li;