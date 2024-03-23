import React, { useState } from 'react';
import './Restock.css'; // Make sure to create a Restock.css file

const Restock = () => {
    const [restockItems, setRestockItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRestockList = () => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/inventory/restock`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setRestockItems(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching restock list:', error);
                setLoading(false);
            });
    };
    
    return (
        <div className="restock-container flex justify-center gap-5">
            <button onClick={fetchRestockList} disabled={loading} className='fetch-button bg-tiger-gray font-bold text-yellow-200 px-4 py-2 rounded'>
                {loading ? 'Loading...' : 'Fetch Restock List'}
            </button>
            {restockItems.length > 0 ? (
                <ul className="restock-list">
                    {restockItems.map(item => (
                        <li key={item.id} className="restock-item">
                            <span className="item-name">{item.name}</span> - 
                            <span className="item-quantity">Quantity: {item.quantity}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                !loading && <p>No items to restock or fetch the list.</p>
            )}
        </div>
    );
};

export default Restock;
