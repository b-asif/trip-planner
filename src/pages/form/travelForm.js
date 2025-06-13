import React from 'react';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from './stepThree';
import { useState } from 'react';

function TravelForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        country: "",
        city: ""
    });

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleInputChange = input => e => {
        setFormData({
            ...formData,
            [input]: e.target.value
        });
    };

    switch (step) {
        case 1:
            return (
                <StepOne
                    formData={formData}
                    handleInputChange={handleInputChange}
                    nextStep={nextStep}
                />
            );
        case 2:
            return (
                <StepTwo 
                nextStep={nextStep}
                prevStep={prevStep}/>
            );
        case 3:
            return(
                <StepThree 
                prevStep={prevStep}/>
            );
        default:
            return <div>Unknown step</div>;
    }

}
export default TravelForm