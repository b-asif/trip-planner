import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../../styles/form.css';

function StepOne({ formData, handleInputChange, nextStep }) {

    const [country, setCountry] = useState([]);
    const [city, setCity] = useState([]);

    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                const response = await axios.get('https://countriesnow.space/api/v0.1/countries');
                setCountry(response.data.data);
            }
            catch (error) {
                console.error("Error fetching the country data", error);
            }
        };
        fetchCountryData();
    }, [])

    useEffect(() => {
        const fetchCityData = async () => {
            if (!formData.country) {
                return setCity([]);
            }

            try {
                const response = await axios.post('https://countriesnow.space/api/v0.1/countries/cities',
                    { country: formData.country }
                );
                setCity(response.data.data);
            }
            catch (error) {
                console.error("Error catching the city data", error);
            }
        };
        fetchCityData();

    }, [formData.country])

    return (
        <div className="form">
            <div className="left-panel">
                <div className="header-1">
                    <h3>Let's Plan the Perfect Trip</h3>
                </div>

                <img src="flight.png" className="logo" ></img>
                <div className="options">
                    <select className="form-select" value={formData.country}
                        onChange={handleInputChange('country')}>


                        <option value="" disabled>Travel Destination</option>
                        {country.map((value, index) => (
                            <option key={index} value={value.country}>
                                {value.country}
                            </option>
                        ))}

                    </select>
                    <select className="form-select" value={formData.city} onChange={handleInputChange('city')}>
                        <option className="dropdown" value="" disabled>Select City</option>
                        {city.map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))}


                    </select>
                </div>

                <img src="next.png" onClick={nextStep} className="img" />
                
            </div>
            <div className="right-panel">
                <img src="background.jpg" className="img-1" />
            </div>

        </div>
    )
}
export default StepOne;