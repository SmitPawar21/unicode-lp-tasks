import React from "react";
import { useNavigate } from "react-router-dom";

export const LoginButton = (props)=>{

    const navigate = useNavigate();

    const handleSignUpPage = ()=>{
    
        navigate('/signup', {state: {theme: props.theme}});

    }

    return (

        <button onClick={handleSignUpPage} className="login"> Sign Up </button>

    );

}