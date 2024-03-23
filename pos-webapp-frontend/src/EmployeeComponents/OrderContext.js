import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderInfo, setOrderInfo] = useState({
    drinkName: '',
    drinkId: '',
    drinkPrice: 0,
    iceLevel: 'Regular',
    sweetnessLevel: '100',
  });

  return (
    <OrderContext.Provider value={{ orderInfo, setOrderInfo }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  return useContext(OrderContext);
};
