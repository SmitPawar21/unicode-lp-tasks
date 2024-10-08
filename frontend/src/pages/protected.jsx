import { useAuth } from '../components/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

export const Protected = () => {

    const { user } = useAuth();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = ()=>{
        logout();
        navigate('/');
    };

    if (!user) {
        return <Navigate to="/signup" />;
    }

    console.log("user is: ",user);

    return (
        <div className='protected-page'>
            <h1> Welcome to the protected page! </h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );

}