import React from 'react';
import CustomizationCard from './CustomCard';
import { useOrder } from './OrderContext';

const CustomizeOrderComponent = ({ isHighContrast }) => {
    const { orderInfo, setOrderInfo } = useOrder();

    const handleCustomizationCardClick = (category, type) => {
        if (category === 'Ice') {
            setOrderInfo({ ...orderInfo, iceLevel: type });
        } else {
            setOrderInfo({ ...orderInfo, sweetnessLevel: type });
        }
    };

    const generateCustomizationCards = (category, types) => {
        return types.map((type, index) => (
            <CustomizationCard 
                key={index} 
                category={category} 
                type={type}
                onClick={() => handleCustomizationCardClick(category, type)}
                isSelected={
                    (category === 'Ice' && orderInfo.iceLevel === type) ||
                    (category === 'Sweetness' && orderInfo.sweetnessLevel === type)
                }
                isHighContrast={isHighContrast}
            />
          ));
    }

    return (
        <div className="flex gap-7">
            <div id="CustomizeIce" className="w-1/3 border-r">
                <h2 className='font-semibold'>ICE LEVEL</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 h-full'>
                    {generateCustomizationCards('Ice', ['Extra', 'Regular', 'Less', 'No'])}
                </div>
            </div>
            <div id="CustomizeSweetness" className="w-1/2">
                <h2 className='font-semibold'>SWEETNESS LEVEL</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 h-full'>
                    {generateCustomizationCards('Sweetness', ['100', '75', '50', '25', '0'])}
                </div>
            </div>
        </div>
    );
};

export default CustomizeOrderComponent;