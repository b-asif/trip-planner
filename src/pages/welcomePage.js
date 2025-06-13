import React from 'react'
import '../styles/welcomePage.css'
import { useNavigate } from 'react-router-dom';


function WelcomePage() {
    const navigate = useNavigate();

    const handleTravelForm = () => {
        console.log("navigation page loaded");
        navigate("/travelForm")
    }

    return (
        <div className="main">
            <img src="hotairballoon.png" className="balloon" />
            <img src="balloon.png" className="balloon1" />
            <img src="balloon2.png" className="balloon2" />
            <img src="balloon3.png" className="balloon3" />
            <img src="balloon4.png" className="balloon4" />


            <div className="header">
                <img src="tweety.png" alt="Logo" className="logo" />
                <h2>Plan Your Perfect Trip</h2>
                <p>Add your family members and friends and their availability dates  to find the perfect time for your next adventure together.</p>
                <button className="btn" onClick={handleTravelForm}>Get Started</button>

            </div>
        </div>
    )
}
export default WelcomePage;