import React, { useState, useEffect } from 'react';

// styling
import './App.css';

// pages
import LandingPage from './LandingPageComponents/LandingPage.js'
import Menu from './MenuComponents/Menu';
import CustomerOrder from './CustomerComponents/CustomerOrder.js';
import EmployeeView from './EmployeeComponents/EmployeeView';
import Customization from './CustomerComponents/Customization.js';
import Login from './HeaderComponents/Login.js';
import ProtectedRoute from './HeaderComponents/ProtectedRoute.js';
import Logout from './HeaderComponents/Logout.js';
import ManagerView from './ManagerComponents/ManagerView';
import GoogleTranslate from './HeaderComponents/Translate.js';

import { CartProvider } from './CustomerComponents/CartContext.js';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './HeaderComponents/Logout.js';
import LoginButton from './HeaderComponents/Login.js';

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [isHighContrast, setIsHighContrast] = useState(localStorage.getItem('storedIsHighContrast') === 'true');

  const [isLoadingHome, setIsLoadingHome] = useState(false);
  const [textSize, setTextSize] = useState(100); // 100% is the default size

  /* DONT REMOVE: Adds delay when user clicks home
    Necessary delay because translation API errors if weather API is not loaded yet 
  */
  useEffect(() => {
    if (isLoadingHome) {
      const timeoutId = setTimeout(() => {
        window.location.href = '/';
      }, 400); // Adjust the delay durations

      return () => clearTimeout(timeoutId); // Clear timeout if the component unmounts
    }
  }, [isLoadingHome]);

  const handleHomeClick = () => {
    localStorage.setItem('storedIsHighContrast', isHighContrast);
    setIsLoadingHome(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  let LINKTHEME = 'LINK text-white hover:text-yellow-200 font-semibold';

  const getFontSizeClass = (size) => {
    if (size <= 100) return 'text-base'; // default size
    if (size <= 110) return 'text-lg';
    if (size <= 120) return 'text-xl';
    // Add more mappings as needed
    return 'text-2xl'; // for larger sizes
  };

  const MAX_TEXT_SIZE = 125; // Example maximum size, adjust as needed

  const increaseTextSize = () => {
    setTextSize(currentSize => {
      if (currentSize >= MAX_TEXT_SIZE) {
        return currentSize; // Prevent further increase if the maximum is reached
      }
      return currentSize + 8;
    });
  };

  const resetTextSize = () => {
    setTextSize(100); // Reset to 100%
  };

  // Apply text size to the whole app
  const appStyle = {
    fontSize: `${textSize}%`,
  };
  const isManager = isAuthenticated && user && user.email === 'bellaleblanc19@gmail.com';
  const isEmployee = isAuthenticated && user && user.email === 'albertapplea@gmail.com';

  return (
    <CartProvider>
          <Router>
          <div style={appStyle} className={`${isHighContrast ? 'high-contrast' : ''}`}>
              <header className={`${isHighContrast ? 'bg-black p-10' : 'bg-tiger-gray p-10'}`}>
                <div className="flex justify-center text-white w-full">
                  <h1 
                    className='TIGERSUGAR font-bold text-yellow-200 text-4xl hover:cursor-pointer'
                    onClick={handleHomeClick}
                    >TIGER SUGAR
                  </h1>
                </div>
                {isAuthenticated && (
                  <div className="absolute right-6 top-15">
                    <div className="flex items-right text-white">
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p>{user.email}</p>
                      </div>
                      <img src={user.picture} alt="Profile" className="h-12 w-12 rounded-full ml-4" />
                    </div>
                  </div>
                )}
                <div className="absolute right-64 top-6">
                  <GoogleTranslate />
                </div>
                <div className="absolute right-6 top-5 flex gap-3">
                  {isAuthenticated ? (
                    <LogoutButton />
                    ) : (
                    <>
                    <LoginButton />
                    </>
                  )}
                </div>
                <div className="absolute top-5 flex flex-wrap gap-3 w-96">
                 <button 
                      className="bg-white text-black font-semibold border-black border-2 hover:bg-gray-200 hover:text-black round p-1 px-2 rounded-xl hover:shadow-lg"
                      onClick={() => setIsHighContrast(!isHighContrast)}
                  >High Contrast
                  </button>
                  <button 
                    className="bg-white text-black font-semibold border-black border-2 hover:bg-gray-200 hover:text-black round p-1 px-2 rounded-xl hover:shadow-lg"
                    onClick={increaseTextSize}
                  >
                    Increase Text
                  </button>

                  <button 
                    className="bg-white text-black font-semibold border-black border-2 hover:bg-gray-200 hover:text-black round p-1 px-2 rounded-xl hover:shadow-lg"
                    onClick={resetTextSize}
                  >
                    Reset Text
                  </button>
                </div>
            
                <nav className="flex justify-center space-x-4 mt-4">
                  <Link to="/" 
                    className='LINK text-white hover:text-yellow-200 font-semibold'>HOME
                  </Link>
                  <Link to="/order" 
                    className='LINK text-white hover:text-yellow-200 font-semibold'>ORDER
                  </Link>
                  <Link to="/menu" 
                    className='LINK text-white hover:text-yellow-200 font-semibold'>MENU
                  </Link>
                  {isManager && (
                    <>
                      <Link to="/manager" 
                        className='LINK text-white hover:text-yellow-200 font-semibold'>MANAGER
                      </Link>
                    </>
                  )}
                  {isEmployee && (
                    <>
                      <Link to="/employee" 
                        className='LINK text-white hover:text-yellow-200 font-semibold'>EMPLOYEE
                      </Link>
                    </>
                  )}
                </nav>
              </header>
              <Routes>
                <Route 
                  path="/" 
                  element={<LandingPage textSize={textSize} getFontSizeClass={getFontSizeClass} />} 
                  />
                <Route path="/login" element={<Login />} />
                <Route path="/order" 
                  element={
                    <CustomerOrder 
                      isHighContrast={isHighContrast}
                    />
                  } 
                />
                <Route path="/menu" element={<Menu />} />
                <Route path="/manager" element={
                  <ProtectedRoute>
                    <ManagerView />
                  </ProtectedRoute>} />
                <Route 
                  path="/employee" 
                  element={
                    <ProtectedRoute> 
                      <EmployeeView 
                        isHighContrast={isHighContrast}
                      /> 
                    </ProtectedRoute>}
                />
                <Route path="/customization/:drinkId" element={<Customization/>} />
                <Route path="/logout" element={<Logout />} />
              </Routes>
            </div>
          </Router>
    </CartProvider>
  );
}

export default App;
