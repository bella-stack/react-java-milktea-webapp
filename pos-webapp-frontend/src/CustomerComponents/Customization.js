import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import config from '../config'; 
import { CartContext } from './CartContext';

const Customization = () => {

    const { addToCart } = useContext(CartContext);

    const { drinkId } = useParams();
    const [drink, setDrink] = useState(null);
    const [iceLevel, setIceLevel] = useState('1');
    const [sweetnessLevel, setSweetnessLevel] = useState('1');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = () => {
        console.log("Submitting customization")
        const customizedDrink = {
        ...drink,
        iceLevel,
        sweetnessLevel,
        };
        addToCart(customizedDrink);
        setIsSubmitted(true);
    };
    
    useEffect(() => {
        if (isSubmitted) {
            const timeoutId = setTimeout(() => {
                setIsSubmitted(false);
            }, 1500); // (1.5 seconds in this add if needed to change)

            return () => clearTimeout(timeoutId);
        }
    }, [isSubmitted]);

    useEffect(() => {
        const fetchDrink = () => {
            fetch(`${config.REACT_APP_BACKEND_URL}/api/product/${drinkId}`)
                .then(response => response.json())
                .then(data => {
                    setDrink(data);
                })
                .catch(error => {
                    console.error("There was an error fetching the data", error);
                });
        };
        fetchDrink();
    }, [drinkId]);

    if (!drink) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center">             
        <div className="p-5 w-4/5">
            <div className="flex justify-start font-bold p-5 rounded-xl shadow-md">
                <Link to="/order" className='LINK'>{'< Return to Order'}</Link>
                <div></div>
            </div>
            <div className="border-b border-gray-300 mb-4">
                <div className="flex justify-center items-center pt-4 w-full">
                </div>
                <h1 className="font-semibold">{drink.name}</h1>
                <h3 className="text-gray-600">${drink.price}</h3>
            </div>
            <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-2">Ice Level</label>
                <select className="block w-full border border-gray-300 p-2 rounded" value={iceLevel} onChange={(e) => setIceLevel(e.target.value)}>
                    <option value="0">No Ice</option>
                    <option value="0.25">Less Ice</option>
                    <option value="1">Regular Ice</option>
                    <option value="1.5">Extra Ice</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-2">Sweetness Level</label>
                <select className="block w-full border border-gray-300 p-2 rounded" value={sweetnessLevel} onChange={(e) => setSweetnessLevel(e.target.value)}>
                    <option value="0">0% (Unsweetened)</option>
                    <option value="0.25">25% (Less Sweet)</option>
                    <option value="0.5">50% (Half)</option>
                    <option value="0.75">75% (Less Sugar)</option>
                    <option value="1">100% (Regular)</option>
                </select>
            </div>
                <button onClick={handleSubmit} className="bg-black text-white font-bold py-2 px-4 rounded-full">Submit</button>
                {isSubmitted && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="BLACKBG bg-white p-5 rounded-md">
                            <h1 className="text-xl font-semibold mb-2">Submitted to cart</h1>
                            <p>Your order has been added to the cart.</p>
                        </div>
                    </div>
                )}
            </div>
             
        </div>
    );
}

export default Customization;
