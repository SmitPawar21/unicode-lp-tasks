import { useState } from "react";
import background_2 from "../images/background_2.jpg";
import email from "../images/email.svg";
import pass from "../images/pass.svg";
import { useLocation, useNavigate } from "react-router-dom";

export const SigninPage = () => {

    const location = useLocation();
    const { state } = location;
    const formData = state?.formData || {};
    const navigate = useNavigate();

    console.log(formData);

    const [userData , setUserData] = useState({
        email: '',
        password: ''
    })

    const updateEmail = (e)=>{
        let value = e.target.value;
        console.log(value);
        setUserData({
            ...userData,
            email: value
        })
    }
    const updatePass = (e)=>{
        let value = e.target.value;
        console.log(value);
        setUserData({
            ...userData,
            password: value
        })
    }

    const checkData = (event)=>{
        event.preventDefault();

        if(!(userData.email === formData.email) || !(userData.password === formData.password))
        {
            alert("kindly check your email and password.")
        }
        
        else{
            navigate('/');
            alert(`Hello ${formData.name} successfully logged in`);
        }

    }

    return (
        <div>
            <img src={background_2} alt="image hai" className='backgroundimg' />
            <div className='filter_box yellow-theme' ></div>

            <div className="container">
                <form action="#">
                    <h1>Sign In</h1>

                    <div className="input-box">
                        <img src={email} alt="image hai"  />
                        <input type="email" placeholder="Enter Your Email" onChange={updateEmail}/>
                    </div>

                    <div className="input-box">
                        <img src={pass} alt="image hai" />
                        <input type="password" placeholder="Password" className='password' onChange={updatePass}/>
                    </div>

                    <button className="login_btn" onClick={checkData} >Login</button>

                </form>
            </div>
        </div>
    );

}