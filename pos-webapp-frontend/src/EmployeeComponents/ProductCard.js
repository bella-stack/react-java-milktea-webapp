import React from 'react';

const EmployeeProductCard = ({ drink, onClick, isSelected, isHighContrast }) => {

    return (
        <div
            className={`EmployeeProductCard w-full h-full p-4 border rounded m-4 cursor-pointer hover:bg-slate-300 flex flex-col items-center 
            ${isSelected ? 
                (isHighContrast ? 'bg-teal-300 text-black' : 'bg-slate-300' )
                : ''}
            ${isHighContrast ? 'hover:bg-teal-300 border-teal-300 hover:text-black' : ''}
            
            `}
            onClick={() => onClick(drink)}
        >
            <div className="flex mt-5">
            <img
                src={`drink_default.png`}
                alt={drink.name}
                className="w-32 h-32 object-cover rounded"
            />
            </div>
            <h2 className="CENTERTEXT font-semibold m-4">{drink.name}</h2>
            <p>Price: ${drink.price.toFixed(2)}</p>
        </div>
  );
};

export default EmployeeProductCard;