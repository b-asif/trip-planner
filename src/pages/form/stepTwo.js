import react from 'react'
import '../../styles/stepTwoForm.css'
import { useState } from 'react'

function StepTwo({nextStep, prevStep}) {
    //dynamically adding travellers - initial people count 0
    const [travellers, setTravellers] = useState(0);
    const [startAvailability, setStartAvailability] = useState([]);
    const [endOfAvailability, setEndOfAvailability] = useState([]);
    const [travelDays, setTravelDays] = useState(1);

    //updating the availability
    const updateAvailability = (e) => {
        //variable to hold the user updated value
        const travelerCount = parseInt(e.target.value) || 0;
        setTravellers(travelerCount);

        //updater function since the current state depends on the previous state 
        setStartAvailability((prevState) => {
            //previous state must be retained 
            const newAvailability = [...prevState];
            while (newAvailability.length < travelerCount) {
                newAvailability.push("");
            }
            //if the count is less than the current size, remove till matches current count
            return newAvailability.slice(0, travelerCount)
        });

    };
    const updateTraveldays = (e) => {
        const days = parseInt(e.target.value) || 1;
        setTravelDays(days);
    }
    const handleDateChange = (index, date, type) => {
        if (type == "start") {
            const newAvailabilityStart = [...startAvailability];
            newAvailabilityStart[index] = date;
            setStartAvailability(newAvailabilityStart);
        }
        else if (type == "end") {
            const newAvailabilityEnd = [...endOfAvailability];
            newAvailabilityEnd[index] = date;
            setEndOfAvailability(newAvailabilityEnd);
        }
    }

    const saveTravelData = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/travelForm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                //make sure that the react states match teh schema key names 
                body: JSON.stringify({ travellers, startAvailability, endOfAvailability, travelDays })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("travelForm", JSON.stringify(data.traveler))
                nextStep();
            }
        } catch (err) {
            console.error("there was an error logging the data to the database", err);
        }

    };


    return (
        <div className="form">
            <div className = "side-panel">
                <div className = "step">
                    <h2 className="title"><img src="number-1.png" className="num"/> Step 1</h2>
                    <p className="sub">Select Destination</p>
                </div>
                <div className = "step active">
                    <h2 className="title"><img src="number-2.png" className="num"/>Step 2</h2> 
                    <p className="sub">Traveler Availabilities</p>
                </div>
                <div className = "step">
                    <h2 className="title"><img src="number-3.png" className="num"/>Step 3</h2> 
                    <p className="sub"> Confirm Travel Dates</p></div>
            </div>
            <div className = "right-panel">
                <form className="content">
                    <h3 className="stepTwoHeader">Traveler Availability</h3>
                    <label className="input">
                        Number of Travelers:
                        <input
                            type="numbers"
                            min="0"
                            value={travellers}
                            onChange={updateAvailability} />
                    </label>
                    <label className="input">
                        Maximum days of travel:
                        <input
                            type="numbers"
                            min="1"
                            value={travelDays}
                            onChange={updateTraveldays}
                        />
                    </label>
                    <div className="dynamic-form">
                        {Array.from({ length: travellers }, (_, index) => (
                            <div key={index}>
                                <label className="internal">
                                    Traveler {index + 1} Availability
                                    <input
                                        type="date"
                                        value={startAvailability[index] || ""}
                                        onChange={(e) => handleDateChange(index, e.target.value, "start")}></input>
                                    <input
                                        type="date"
                                        value={endOfAvailability[index] || ""}
                                        onChange={(e) => handleDateChange(index, e.target.value, "end")}></input>

                                </label>
                            </div>
                        ))}
                    </div>
                    <p className="sub-text">
                {travellers == 0 ? "No family members added yet. Add a family member to get started" : ""}.</p>
                </form>
                <img src="next.png" onClick={saveTravelData} className="img" />
                <img src="back.png" onClick={prevStep} className="back"/>
            </div>
            
            

        </div>
    )
}
export default StepTwo;