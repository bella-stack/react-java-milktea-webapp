import React, { useState } from 'react';
import InventoryList from './InventoryList';
import ManagerMenu from './ManagerMenu';
import Restock from './Restock';

const ManagerView = () => {
  const [activeView, setActiveView] = useState('menu');
  const [isSelected, setIsSelected] = useState('menu');

  const handleButtonClick = (view) => {
    setIsSelected(view);
    setActiveView(view);
  };

  return (
    <div>
      <div className="my-4">
        <div className="flex justify-center space-x-4 mb-10">
          <button 
            className={
                isSelected === 'menu' ? 
                'bg-tiger-gray font-bold text-yellow-200 px-4 py-2 rounded' 
                : 'bg-white font-bold shadow-md px-4 py-2 rounded'}
            onClick={() => handleButtonClick('menu')}>
            MENU
          </button>
          <button 
            className={
                isSelected === 'inventory' ? 
                'bg-tiger-gray font-bold text-yellow-200 px-4 py-2 rounded' 
                : 'bg-white font-bold shadow-md px-4 py-2 rounded'}
            onClick={() => handleButtonClick('inventory')}>
            INVENTORY
          </button>
          <button 
            className={
                isSelected === 'restock' ? 
                'bg-tiger-gray font-bold text-yellow-200 px-4 py-2 rounded' 
                : 'bg-white font-bold shadow-md px-4 py-2 rounded'}
            onClick={() => handleButtonClick('restock')}>
            RESTOCK REPORT
          </button>
        </div>

        {/* Render the active view based on the state */}
        {activeView === 'menu' && (
          <div>
            <h2 className="text-2xl font-bold flex justify-center">MENU</h2>
            <ManagerMenu />
          </div>
        )}
        {activeView === 'inventory' && (
          <div>
            <h2 className="text-2xl font-bold flex justify-center">INVENTORY</h2>
            <InventoryList />
          </div>
        )}
        {activeView === 'restock' && (
          <div>
            <h2 className="text-2xl font-bold flex justify-center">RESTOCK</h2>
            <Restock />
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerView;
