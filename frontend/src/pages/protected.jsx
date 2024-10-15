import { useAuth } from '../components/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Protected = () => {

    const { user } = useAuth();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [existPass, setExistPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handleLogout = ()=>{
        logout();
        navigate('/');
    };

    const handleNewPassword = async ()=>{
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;
        if (!passwordRegex.test(newPass)) {
            alert("Password must have min 8 chars, max 20 chars, at least one uppercase letter, one lowercase letter, and one number and also a special character")

            return;
        }

        if (newPass !== confirmPass) {
            alert("check your confirm password");

            return;
        }

        const response = await fetch('http://localhost:5000/changePassword',{
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                existPass: existPass,
                newPass: newPass,
                email: user.email
            })
        })
        if(response.status === 201){
            alert('password changed')
        } else{
            alert('failed to change password');
        }
    }

    if (!user) {
        return <Navigate to="/signup" />;
    }

    console.log("user is: ",user);

    return (
        <div className='protected-page'>
            <h1> Welcome to the protected page! </h1>
            <button className='prot-but' onClick={handleLogout}>Logout</button>
            <div className='input-box-mainpage'>
                <h2> Change Password </h2>
                <input type='password' placeholder='Enter Your Existing Password' onChange={(e)=> setExistPass(e.target.value)}/>
                <input type='password' placeholder='Enter New Password' onChange={(e)=> setNewPass(e.target.value)} />
                <input type='password' placeholder='Confirm Password' onChange={(e)=> setConfirmPass(e.target.value)}/>
                <button className='changepass' onClick={handleNewPassword}>Change Password</button>
            </div>
        </div>
    );

}