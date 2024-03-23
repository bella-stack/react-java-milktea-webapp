import React from 'react';
import CustomizeOrderComponent from './CustomComponent';
import ProductCategory from './ProductComponent';
import OrderComponent from './OrderComponent';
import { OrderProvider } from './OrderContext';
import '../HighContrast.css';

function EmployeeView({ isHighContrast }) {
    return (
        <OrderProvider>
            <div className='BLACKBG'>
                <div className='BLACKBG fixed w-full h-full'>
                    <div className='flex h-full'>
                        <div id="Order" className='h-full w-1/3 border-r'>
                            <OrderComponent/>
                        </div>
                        <div id="Product" className='w-full flex flex-col'>
                            <div id="ProductCategory" className='flex-1 overflow-y-auto h-1/2'>
                                <ProductCategory
                                    isHighContrast = {isHighContrast}
                                />
                            </div>
                            <div 
                                id="ProductCustomization" 
                                className='BLACKBG sticky bottom-0 h-1/3 p-4 bg-white m-4 border-t flex'>
                                <CustomizeOrderComponent
                                    isHighContrast = {isHighContrast}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </OrderProvider> 
    );
}

export default EmployeeView;