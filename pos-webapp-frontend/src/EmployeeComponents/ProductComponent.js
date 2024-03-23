import React, { useState, useEffect } from 'react';
import config from '../config';
import EmployeeProductCard from './ProductCard';
import { useOrder } from './OrderContext';

const ProductCategory = ({ isHighContrast }) => {
  const { orderInfo, setOrderInfo } = useOrder();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [drinks, setDrinks] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);

  const handleProductCardClick = (drink) => {
    setSelectedDrink(drink);

    setOrderInfo({
      ...orderInfo,
      drinkName: drink.name,
      drinkPrice: drink.price,
      drinkId: drink.id,
    });
  };

  const categorizeDrink = (name) => {
    const lastWord = name.trim().split(' ').pop().toLowerCase();
    if (lastWord.includes('milk')) {
      return 'Milk';
    } else if (lastWord.includes('tea')) {
      return 'Tea';
    } else if (lastWord.includes('yogurt')) {
      return 'Yogurt';
    } else {
      return 'Other';
    }
  };

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await fetch(`${config.REACT_APP_BACKEND_URL}/api/product`);
        const data = await response.json();
        const categorizedDrinks = data.map((drink) => ({
          ...drink,
          category: categorizeDrink(drink.name),
        }));
        setDrinks(categorizedDrinks);
      } catch (error) {
        console.error('There was an error fetching the data', error);
      }
    };

    fetchDrinks();
  }, []);

  const filterDrinksByCategory = (category) => {
    if (category === 'All') {
      return drinks;
    }
    return drinks.filter((drink) => drink.category === category);
  };

  return (
    <div className="flex flex-col mb-10">
      <div className="sticky top-0 my-4 flex font-bold space-x-4 justify-center">
        <button 
          onClick={() => setSelectedCategory('All')} 
          className={selectedCategory === 'All' ? 'bg-tiger-gray font-bold text-yellow-200 px-4 py-2 rounded' : 'bg-white shadow-md px-4 py-2 rounded'}>
          ALL
        </button>
        <button 
          onClick={() => setSelectedCategory('Milk')} 
          className={selectedCategory === 'Milk' ? 'bg-tiger-gray text-yellow-200 px-4 py-2 rounded' : 'bg-white shadow-md px-4 py-2 rounded'}>
          MILK
        </button>
        <button 
          onClick={() => setSelectedCategory('Yogurt')} 
          className={selectedCategory === 'Yogurt' ? 'bg-tiger-gray text-yellow-200 px-4 py-2 rounded' : 'bg-white shadow-md px-4 py-2 rounded'}>
          YOGURT
        </button>
        <button 
          onClick={() => setSelectedCategory('Tea')} 
          className={selectedCategory === 'Tea' ? 'bg-tiger-gray text-yellow-200 px-4 py-2 rounded' : 'bg-white shadow-md px-4 py-2 rounded'}>
          TEA
        </button>
        <button 
          onClick={() => setSelectedCategory('Other')} 
          className={selectedCategory === 'Tea' ? 'bg-tiger-gray text-yellow-200 px-4 py-2 rounded' : 'bg-white shadow-md px-4 py-2 rounded'}>
          OTHER
        </button>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 w-4/5 px-5 pb-20">
          {filterDrinksByCategory(selectedCategory).map((drink, index) => (
            <div className="overflow-hidden p-4" key={index}>
              <EmployeeProductCard
                isHighContrast={isHighContrast}
                drink={drink}
                onClick={handleProductCardClick}
                isSelected={selectedDrink && selectedDrink.id === drink.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
