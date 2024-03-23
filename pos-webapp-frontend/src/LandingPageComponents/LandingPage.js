import React from 'react';
import './LandingPage.css';
import '../HighContrast.css';
import { Link } from 'react-router-dom';
import WeatherApi from './weather_api.js';

function LandingPage() {

    return (
        <div className='LandingPage h-screen'>
            <div className='flex justify-center gap-7'>
                <img 
                    src={'banner.png'} 
                    className='w-3/5 h-auto' 
                    alt="New seasonal item banner of the Hello Kitty Crush drink at Tiger Sugar"
                />
                <WeatherApi />
            </div>
                    
            <Link to="/order">
                <button alt="Order button">Order Here</button>
            </Link>
            
            <Link to="/menu">
                <button alt="Menu button">Menu</button>
            </Link>

        </div>
    );
}


export default LandingPage;