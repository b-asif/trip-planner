import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import WelcomePage from './pages/welcomePage'
import TravelForm from './pages/form/travelForm';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/welcomePage" />} />
            <Route path="/welcomePage" element={<WelcomePage />} />
            <Route path="/travelForm" element={<TravelForm />} />
        </Routes>
    )
}
export default App;