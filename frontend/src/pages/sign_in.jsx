import { useState } from "react";
import background_2 from "../images/background_2.jpg";
import email from "../images/email.svg";
import pass from "../images/pass.svg";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookies";
import { useEffect } from "react";
import { useAuth } from '../components/AuthContext';

export const SigninPage = () => {

    const location = useLocation();
    const { state } = location;
    const formData = state?.formData || {};
    const navigate = useNavigate();
    const { login } = useAuth();

    console.log(formData);

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const updateEmail = (e) => {
        let value = e.target.value;
        console.log(value);
        setUserData({
            ...userData,
            email: value
        })
    }
    const updatePass = (e) => {
        let value = e.target.value;
        console.log(value);
        setUserData({
            ...userData,
            password: value
        })
    }

    const checkData = async (event) => {
        event.preventDefault();

        if (!(userData.email === formData.email) || !(userData.password === formData.password)) {
            alert("kindly check your email and password.")
        }

        else {

            login(userData);
            //POST REQUESTING login data of user to backend 
            await fetch('http://localhost:5000/login', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    email: userData.email,
                    password: userData.password,
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.token);
                    Cookies.setItem('token', data.token, {expires: 1});
                })
                .catch((err) => console.log(err));

            //VERIFY TOKEN from the BACKEND
            const token = Cookies.getItem('token');
            console.log("cookies se aya hua token", token);
            await fetch('http://localhost:5000/protected', {
                method: 'GET',
                headers: {
                    'authorization': `bearer ${token}`,
                    'content-type': 'application/json'
                }
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("successful: ", data);
                if(data.message === 'you are in Protected route'){
                    navigate('/protected');
                }
                else{
                    console.log("no no");
                }
            });

            //verifying from the backend (middlewares)
            // await fetch("http://localhost:5000/protected", {
            //     method: 'GET',
            //     credentials: 'include'
            // })
            // .then((res) => {
            //     if(res.ok) {
            //         navigate('/protected');
            //     } 
            //     console.log(res);
            //     // return res.json();
            // })
            // .then((data) => console.log(`when used protected: ${data}`))
            // .catch(error => {
            //     console.log(`error while verifying: ${error}`);
            // })

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
                        <img src={email} alt="image hai" />
                        <input type="email" placeholder="Enter Your Email" onChange={updateEmail} />
                    </div>

                    <div className="input-box">
                        <img src={pass} alt="image hai" />
                        <input type="password" placeholder="Password" className='password' onChange={updatePass} />
                    </div>

                    <button className="login_btn" onClick={checkData} >Login</button>

                </form>
            </div>
        </div>
    );

}