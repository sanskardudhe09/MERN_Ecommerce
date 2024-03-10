
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
const Spinner = ({path="login"}) => {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((preval) => --preval);
        }, 1000)
        count === 0 && navigate(`${path}`, {
            state: location.pathname,
        });
        return () => clearInterval(interval);
    }, [count, navigate, location.pathname, path])
    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5" 
        style={{minHeight:"50vh"}}>
             <h2 className='text-center'>Redirecting you in {count} seconds..</h2>
            <div className="spinner-border text-center" role="status">
                <h3 className='visually-hidden'>Loading...</h3>
            </div>
        </div>
    )
}

export default Spinner