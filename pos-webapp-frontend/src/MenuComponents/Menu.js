import React, { useState, useEffect } from 'react';
import config from '../config';
import MenuDrinkCard from './MenuDrinkCard';
import LeftNavBar from './LeftNavBar';

import './Menu.css';

const Menu = () => {

    const [drinks, setDrinks] = useState([]);

    const categorizeDrink = (name) => {
        const lastWord = name.trim().split(" ").pop().toLowerCase(); // Get the last word and convert to lowercase
        if (lastWord.includes("milk")) {
          return "Milk Tea";
        } else if (lastWord.includes("tea")) {
          return "Tea";
        } else if (lastWord.includes("yogurt")) {
          return "Yogurt";
        } else {
          return "Other Drinks";
        }
      };
    
      useEffect(() => {
        const fetchDrinks = async () => {
          try {
            const response = await fetch(`${config.REACT_APP_BACKEND_URL}/api/product`);
            const data = await response.json();
            const categorizedDrinks = data.map(drink => ({
              ...drink,
              category: categorizeDrink(drink.name) // Categorize each drink
            }));
            setDrinks(categorizedDrinks); // Set the fetched and categorized drinks into state
          } catch (error) {
            console.error("There was an error fetching the data", error);
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

      const DrinkSection = ({ title, category, drinks }) => (
        <section id={category}>
          <h1>{title}</h1>
          <hr />
          <div className="flex justify-left">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 w-full aspect-w-1">
              {drinks.map((drink, index) => (
                <div className="overflow-hidden" key={index}>
                  <MenuDrinkCard drink={drink} />
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    return (
        <div className='flex'>
            <LeftNavBar/>
            <div className='Menu'>
                {['Milk Tea', 'Tea', 'Yogurt', 'Other Drinks'].map((category, index) => (
                <DrinkSection
                    key={index}
                    title={category.toUpperCase()}
                    category={category}
                    drinks={filterDrinksByCategory(category)}
                />
                ))}
            </div>
        </div>
    );
}

export default Menu;