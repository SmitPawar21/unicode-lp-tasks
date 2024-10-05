import React from "react";
import dob from "../images/dob.svg";
import name from "../images/name.svg";
import email from "../images/email.svg";
import pass from "../images/pass.svg";
import confirm from "../images/confirm.svg";
import correctpass from "../images/correctpass.svg";
import background_2 from "../images/background_2.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import eye from "../images/eye.svg";
import hide from "../images/hide.svg";

export const SignupPage = () => {

    // const location = useLocation();
    // const { state } = location;
    // const theme = state?.theme || "yellow-theme";

    const navigate = useNavigate();

    const handleSignInPage = () => {

        navigate('/signin', { state: { formData: formData } });

    }

    const [theme, setTheme] = useState("yellow-theme");

    const changeThemePink = () => {

        setTheme("pink-theme");

    }
    const changeThemeYellow = () => {

        setTheme("yellow-theme");

    }

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const updateDataName = (e) => {
        let value = e.target.value;
        setFormData({
            ...formData,
            name: value
        })
    }
    const updateDataEmail = (e) => {
        let value = e.target.value;
        setFormData({
            ...formData,
            email: value
        })
    }
    const updateDataPass = (e) => {
        let value = e.target.value;
        setFormData({
            ...formData,
            password: value
        })
    }
    const updateDataConPass = (e) => {
        let value = e.target.value;
        setFormData({
            ...formData,
            confirmPassword: value
        })
    }

    const [errors, setErrors] = useState({});
    console.log(errors);

    const validate = () => {

        const newErrors = {};
        const nameRegex = /^[A-Za-z\s]{8,20}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;

        if (!nameRegex.test(formData.name)) {
            newErrors.name = "Name must have alphabetical characters only, min 8 chars, max 20 chars."
        }
        if (!emailRegex.test(formData.email)) {
            newErrors.email = "no valid format for Email";
        }
        if (!passwordRegex.test(formData.password)) {
            newErrors.password = "Password must have min 8 chars, max 20 chars, at least one uppercase letter, one lowercase letter, and one number and also a special character"
        }
        if (!(formData.password === formData.confirmPassword)) {
            newErrors.confirmPassword = "password not matching";
        }

        setErrors(newErrors);
        console.log("errors: ", newErrors);
        return Object.keys(newErrors).length === 0;

    };

    const submitForm = async (event) => {
        event.preventDefault();
        setErrors({});

        const answer = await validate();
        console.log(answer);
        if (answer === true) {
            handleSignInPage();
        }

    }

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');

    const togglePasswordVisibility = (event) => {
        event.preventDefault();

        setIsPasswordVisible((prev) => !prev);
    };

    return (
        <div>
            <img src={background_2} alt="image hai" className='backgroundimg' />
            <div id='filter_box' className={theme}></div>
            <ul>
                change theme
                <li id='yellow_btn' onClick={changeThemeYellow}></li>
                <li id='pink_btn' onClick={changeThemePink}></li>
            </ul>

            <div className="container">
                <form>
                    <h1 className="animated-text">Sign Up</h1>
                    <div className="input-box">
                        <img src={name} alt="image hai" />
                        <input type="text" placeholder="Enter Your Name" onChange={updateDataName} />
                        <input type="text" placeholder="Username" />
                        {console.log(formData.name)}
                    </div>
                        {errors.name && <p>{errors.name}</p>}

                    <div className="input-box">
                        <img src={dob} alt="image hai" />
                        <input type="date" className='date' />
                        <input type="text" placeholder="Phone" className='phone' />
                    </div>

                    <div className="input-box">
                        <img src={email} alt="image hai" />
                        <input type="email" placeholder="Enter Your Email" onChange={updateDataEmail} />
                        {console.log(formData.email)}

                    </div>
                        {errors.email && <p>{errors.email}</p>}

                    {/* <div class="input-box">
          </div> */}

                    <div className="input-box">
                        <img src={pass} alt="image hai" />
                        <input type={isPasswordVisible ? 'text' : 'password'} placeholder="Password" className='password' onChange={updateDataPass} />
                        <button onClick={togglePasswordVisibility} aria-label="Toggle password visibility" style={{backgroundColor: "#ff000000"}}> 
                            {isPasswordVisible ? <img src={hide}/> : <img src={eye} />}
                        </button>
                        {console.log(formData.password)}

                    </div>
                        {errors.password && <p>{errors.password}</p>}

                    <div className="input-box">
                        <img src={confirm} alt="image hai" className='passicon' />
                        <img src={correctpass} alt="image hai" className='correctpassicon' />
                        <input type="password" placeholder="Confirm Password" className='Conpassword' onChange={updateDataConPass} />
                    </div>
                        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

                    <button id="btn" className={theme} onClick={submitForm}>Sign Up</button>

                </form>

            </div>
        </div>
    );
}