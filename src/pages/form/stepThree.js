import react from "react";
import axios from 'axios'
import { useState, useEffect } from 'react'
import '../../styles/StepThree.css';

function StepThree({ nextStep, prevStep }) {
    const [tripInfo, setTripInfo] = useState(null);
    //connecting to the backend 
    useEffect(() => {
        //in server.js we have app.get that will be fetching our data from the database
        axios.get("http://localhost:5001/travelForm")
            .then(response => {
                if (response.data.idealStartDate) {
                    setTripInfo(response.data)
                }

            })
            .catch(error => {
                console.log("error fetching the data and printing to console", error);
            });
    }, []);


    return (
        <div className="form">
            <div className = "side-panel">
                <div className = "step">
                    <h2 className="title"><img src="number-1.png" className="num"/> Step 1</h2>
                    <p className="sub">Select Destination</p>
                </div>
                <div className = "step">
                    <h2 className="title"><img src="number-2.png" className="num"/>Step 2</h2> 
                    <p className="sub">Traveler Availabilities</p>
                </div>
                <div className = "step active">
                    <h2 className="title"><img src="number-3.png" className="num"/>Step 3</h2> 
                    <p className="sub"> Confirm Travel Dates</p></div>
            </div>
            <div className = "right-panel">
                {tripInfo && (
                    <div className="results">
                        <p>Ideal Start Date: {new Date(tripInfo.idealStartDate).toLocaleDateString()}</p>
                        <p>Ideal End Date: {new Date(tripInfo.idealEndDate).toLocaleDateString()}</p>
                    </div>
                )}
                <img src="next.png" onClick={nextStep} className="img" />
                <img src="back.png" onClick={prevStep} className="back" />

                
            </div>
            

            
        </div>
    )
}
export default StepThree;