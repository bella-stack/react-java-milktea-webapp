import React, { useState, useEffect } from 'react';

function InventoryList() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL); 

        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/inventory`)
            .then(response => response.json())
            .then(data => {
                setItems(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the data", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Inventory Items</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Cost</th>
                        <th>Price</th>
                        <th>Is Addon?</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.cost}</td>
                            <td>{item.price}</td>
                            <td>{item.isaddon ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InventoryList;
