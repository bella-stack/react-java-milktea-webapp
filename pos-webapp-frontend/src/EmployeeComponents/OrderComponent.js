import React, { useState } from 'react';
import { useOrder } from './OrderContext';
import { formatDate, formatTime } from '../CustomerComponents/Time';
import config from '../config';

const OrderComponent = () => {
  const { orderInfo } = useOrder();
  const [orderHistory, setOrderHistory] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleOrderButtonClick = () => {
    if (!orderInfo.drinkName) {
      alert("Please select a drink before adding to the order.");
      return;
    }

    setOrderHistory([...orderHistory, orderInfo]);

    setButtonClicked(true);
  };

  const handleRemoveItemClick = (indexToRemove) => {
    const updatedOrderHistory = [...orderHistory];
    updatedOrderHistory.splice(indexToRemove, 1);
    setOrderHistory(updatedOrderHistory);
  };

  const clearOrderHistory = () => {
    setOrderHistory([]);
  };

  const calculateTotal = () => {
    return orderHistory.reduce((sum, order) => sum + parseFloat(order.drinkPrice), 0);
  };

  const handleCheckout = async () => {
    console.log("Checkout clicked");
    const totalSale = calculateTotal();
  
    if (totalSale === 0) {
      alert('Cannot checkout with an empty cart!');
      return;
    }
  
    const now = new Date();
  
    const requestData = {
      sale: totalSale,
      created_Time: formatTime(now),
      created_Date: formatDate(now),
      employee_Id: "e_1",
    };
  
    console.log("Request body:", requestData);

    const parseIceLevel = (iceLevel) => {
      switch (iceLevel) {
        case 'No':
          return parseFloat('0.0');
        case 'Less':
          return parseFloat('0.25');
        case 'Regular':
          return parseFloat('1');
        case 'Extra':
          return parseFloat('1.5');
        default:
          console.log('Error with parsing ice level, iceLevel = ', iceLevel);
      }
    };
  
    // Post to OrderHistory
    try {
      const orderHistoryResponse = await fetch(`${config.REACT_APP_BACKEND_URL}/api/orderhistory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (!orderHistoryResponse.ok) {
        console.error("API response error:", orderHistoryResponse.status, orderHistoryResponse.statusText);
      }
  
      const orderHistoryData = await orderHistoryResponse.json();
  
      if (orderHistoryResponse.ok) {
        const orderHistoryId = orderHistoryData.id;
        console.log("Order history ID:", orderHistoryId);
        // Post each item in the cart to OrderItem
        for (const orderInfo of orderHistory) {
          console.log("Original Ice Level:", orderInfo.iceLevel);
          console.log("Original Sweetness Level:", orderInfo.sweetnessLevel);
          const orderItemResponse = {
            order_Id: orderHistoryId,
            ice_Level: parseIceLevel(orderInfo.iceLevel),
            product_Id: orderInfo.drinkId,
            sugar_Level: parseFloat(orderInfo.sweetnessLevel)/100.0,
          };
  
          console.log("fetching items for product...");
          const productResponse = await fetch(`${config.REACT_APP_BACKEND_URL}/api/productdefault/pd/${orderInfo.id}`);
          const productDefault = await productResponse.json();
          for (const prod of productDefault) {
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
                return;
              }
            } catch (error) {
              console.error("Error in decrementing inventory for item:", orderInfo.id, error);
            }
          }
  
          console.log("Posting to OrderItem:", orderItemResponse);
          await fetch(`${config.REACT_APP_BACKEND_URL}/api/orderitem`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderItemResponse),
          });
        }
  
        // Display success message
        alert("Payment successful! Order ID: " + orderHistoryId);
  
        // Clear the cart
        clearOrderHistory();
  
        console.log("Order processed successfully.");
      } else {
        console.error("Failed to post to OrderHistory:", orderHistoryData);
      }
    } catch (error) {
      console.error("There was an error processing the order:", error);
    }
  };

  return (
    <div>
      {buttonClicked && (
        <div id="OrderList" style={{ maxHeight: '550px', overflowY: 'auto' }}>
          {orderHistory.map((order, index) => (
            <div key={index}>
              <div className="grid grid-cols-2">
                <div className='text-left'>
                  <h1 className='font-semibold pl-5 pt-5'>{order.drinkName}</h1>
                  <div className='pl-10'>
                    <p>+ Ice Level: {order.iceLevel}</p>
                    <p>+ Sweetness: {order.sweetnessLevel}%</p>
                  </div>
                </div>
                <div className='text-right'>
                  <h1 className='font-semibold p-5'>{Number(order.drinkPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h1>
                  <button className='mr-5 bg-red-600 p-1 rounded-xl text-white hover:bg-red-800 border-2' onClick={() => handleRemoveItemClick(index)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className='fixed bottom-10 left-10'>
        <div id="OrderPrice" className="flex gap-4 mb-5">
          <h2 className="font-bold text-left">TOTAL</h2>
          <h2 className="font-bold text-right">{Number(calculateTotal()).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h2>
        </div>
        <div id="OrderButtons" className="flex gap-4 flex-wrap w-48">
          <button 
            className='font-semibold border p-3 rounded-xl hover:shadow-md bg-yellow-400'
            onClick={handleOrderButtonClick}
          >
            Add to Order
          </button>
          <button 
            className='font-semibold border p-3 rounded-xl hover:shadow-md bg-green-500'
            onClick={handleCheckout}
          >
            Pay
          </button>
          <button
            className='font-semibold border p-3 rounded-xl hover:shadow-md bg-gray-200'
            onClick={clearOrderHistory}
          >
            Clear Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderComponent;
