import React from 'react';
import { Link } from 'react-router-dom';

import './Menu.css';

const LeftNavBar = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <nav className="sticky top-0 flex-shrink-0 h-full p-4 w-1/5 space-y-5">
        <h2 className="CENTERTEXT font-bold">DRINKS</h2>
        <div className='flex flex-col space-y-5 items-center'>
          <button className='p-2 hover:shadow-md w-40' onClick={() => scrollToSection('Milk Tea')}>Milk Tea</button>
          <button className='p-2 hover:shadow-md w-40' onClick={() => scrollToSection('Tea')}>Tea</button>
          <button className='p-2 hover:shadow-md w-40' onClick={() => scrollToSection('Yogurt')}>Yogurt</button>
          <button className='p-2 hover:shadow-md w-40' onClick={() => scrollToSection('Other Drinks')}>Other Drinks</button>
          <Link to="/order" className='flex justify-center'>
            <button 
              className="CENTER bg-black text-white p-2 px-4 rounded-md hover:shadow-xl" 
              alt="Order button"
              >Place Order
            </button>
          </Link>
        </div>
        
    </nav>
  );
};

export default LeftNavBar;