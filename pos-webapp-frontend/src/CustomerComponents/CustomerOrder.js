import React, { useState, useEffect, useContext } from 'react';
import DrinkCard from './DrinkCard';
import config from '../config';
import { CartContext } from './CartContext';
import { formatDate, formatTime } from './Time';
import InfoPopup from './InfoPopup';
import ErrorPopup from './ErrorPopup';

const CustomerOrder = ({ isHighContrast }) => {

  const { cart, removeFromCart } = useContext(CartContext);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [drinks, setDrinks] = useState([]);

  const [popupMessage, setPopupMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckout = async () => {
    console.log("Checkout clicked");
    const totalSale = calculateTotal();

    if(totalSale === 0) { 
      handleError('Cannot checkout with an empty cart!');
      return;
    }

    const now = new Date();

    const requestData = {
      sale: totalSale,
      created_Time: formatTime(now),
      created_Date: formatDate(now),
      employee_Id: "e_1"
    };
    
    console.log("Request body:", requestData);

    // Post to OrderHistory
    try {
        const orderHistoryResponse = await fetch(`${config.REACT_APP_BACKEND_URL}/api/orderhistory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });

        if (!orderHistoryResponse.ok) {
          console.error("API response error:", orderHistoryResponse.status, orderHistoryResponse.statusText);
        }

        const orderHistoryData = await orderHistoryResponse.json();

        if (orderHistoryResponse.ok) {
            const orderHistoryId = orderHistoryData.id;
            console.log("Order history ID:", orderHistoryId);
            // Post each item in the cart to OrderItem
            for (const item of cart) {
                console.log("Original Ice Level:", item.iceLevel);
                console.log("Original Sweetness Level:", item.sweetnessLevel);
                const orderItemResponse = {
                  order_Id: orderHistoryId,
                  ice_Level: parseFloat(item.iceLevel),
                  product_Id: item.id,
                  sugar_Level: parseFloat(item.sweetnessLevel)
                };

                console.log("fetching items for product...");
                const productResponse = await fetch(`${config.REACT_APP_BACKEND_URL}/api/productdefault/pd/${item.id}`);
                const productDefault = await productResponse.json(); // Added 'await' here
                for(const prod of productDefault) {
                  console.log(prod);
                  try {
                    const decrementResponse = await fetch(`${config.REACT_APP_BACKEND_URL}/api/inventory/decrement/${prod}`, {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    });
            
                    if (!decrementResponse.ok) {
                      console.error("Failed to decrement inventory for item:", prod);
                      handleError('Failed to decrement inventory for item: ' + prod);
                      return;
                    }
                  } catch (error) {
                    console.error("Error in decrementing inventory for item:", item.id, error);
                  }
                  
                }
              
                console.log("Posting to OrderItem:", orderItemResponse);
                await fetch(`${config.REACT_APP_BACKEND_URL}/api/orderitem`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderItemResponse)
                });
            }
            setPopupMessage(`Your order has been processed successfully! Order ID: ${orderHistoryId}`);
            setIsPopupOpen(true);
            removeFromCart();
            console.log("Order processed successfully.");
            
        } else {
            console.error("Failed to post to OrderHistory:", orderHistoryData);
        }
    } catch (error) {
        console.error("There was an error processing the order:", error);
    }
  };

  const categorizeDrink = (name) => {
    const lastWord = name.trim().split(" ").pop().toLowerCase(); // Get the last word and convert to lowercase
    if (lastWord.includes("milk")) {
      return "Milk";
    } else if (lastWord.includes("tea")) {
      return "Tea";
    } else if (lastWord.includes("yogurt")) {
      return "Yogurt";
    } else {
      return "Other";
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

  useEffect(() => {
    console.log("Cart updated:", cart);
  }, [cart]);

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupMessage('');
  };

  const handleError = (message) => {
    setErrorMessage(message);
    setIsErrorPopupOpen(true);
  };

  const filterDrinksByCategory = (category) => {
    if (category === 'All') {
      return drinks;
    }
    return drinks.filter((drink) => drink.category === category);
  };

  return (
    <div>
      
      <div className="w-4/6 mx-auto p-5">
          <h2 className="pb-2 font-bold text-center">YOUR CART</h2>
          <div className="border-2 rounded p-3">
              {cart.map((item, index) => (
                  <div className="flex justify-between items-center p-2" key={index}>
                  <span>
                    {item.name} - Ice: {item.iceLevel}, Sweetness: {item.sweetnessLevel}, Price: ${item.price}
                  </span>
                  <button 
                    onClick={() => removeFromCart(index)}
                    className="px-2 py-1 rounded-xl hover:bg-red-400 text-white bg-red-300"
                  >
                    REMOVE
                  </button>
                </div>
              ))}
          </div>
          <div className="text-center p-2 font-semibold">Total Price: ${calculateTotal().toFixed(2)}</div>
          <button onClick={handleCheckout} className="bg-tiger-gray font-bold text-yellow-200 px-4 py-2 rounded block mx-auto">CHECKOUT</button>
      </div>

      <div className="my-4 flex justify-center">
        <h2 className="font-bold">DRINK MENU</h2>
      </div>

      <div className="my-4 flex font-bold space-x-4 justify-center">
        <button onClick={() => setSelectedCategory('All')} className={selectedCategory === 'All' ? 'bg-tiger-gray font-bold text-yellow-200 px-4 py-2 rounded' : 'bg-white shadow-md px-4 py-2 rounded'}>
          ALL
        </button>
        <button onClick={() => setSelectedCategory('Milk')} className={selectedCategory === 'Milk' ? 'bg-tiger-gray text-yellow-200 px-4 py-2 rounded' : 'bg-white shadow-md px-4 py-2 rounded'}>
          MILK
        </button>
        <button onClick={() => setSelectedCategory('Yogurt')} className={selectedCategory === 'Yogurt' ? 'bg-tiger-gray text-yellow-200 px-4 py-2 rounded' : 'bg-white shadow-md px-4 py-2 rounded'}>
          YOGURT
        </button>
        <button onClick={() => setSelectedCategory('Tea')} className={selectedCategory === 'Tea' ? 'bg-tiger-gray text-yellow-200 px-4 py-2 rounded' : 'bg-white shadow-md px-4 py-2 rounded'}>
          TEA
        </button>
        <button onClick={() => setSelectedCategory('Other')} className={selectedCategory === 'Other' ? 'bg-tiger-gray text-yellow-200 px-4 py-2 rounded' : 'bg-white shadow-md px-4 py-2 rounded'}>
          OTHER
        </button>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 w-4/5">
            {filterDrinksByCategory(selectedCategory).map((drink, index) => (
                <div className="overflow-hidden">
                    <DrinkCard 
                      key={index} 
                      drink={drink} 
                      isHighContrast={isHighContrast}
                    />
                </div>
            ))}
        </div>
      </div>
      <InfoPopup isOpen={isPopupOpen} message={popupMessage} onClose={closePopup} />
      <ErrorPopup
            isOpen={isErrorPopupOpen}
            message={errorMessage}
            onClose={() => setIsErrorPopupOpen(false)}
      />
    </div>
  );
};

export default CustomerOrder;

