import React, { useState, useEffect } from 'react';
import config from '../config'; 
import ErrorPopup from '../CustomerComponents/ErrorPopup';

function InventoryList() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editedItems, setEditedItems] = useState({});
    const [newItem, setNewItem] = useState({ name: '', quantity: 0, cost: 0, price: 0, isaddon: false });

    const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleError = (message) => {
        setErrorMessage(message);
        setIsErrorPopupOpen(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        fetch(`${config.REACT_APP_BACKEND_URL}/api/inventory`)
            .then(response => response.json())
            .then(data => {
                setItems(data);
                const maxId = data.reduce((max, item) => {
                    const numericPart = parseInt(item.id.replace('in_', ''), 10);
                    return Math.max(max, isNaN(numericPart) ? 0 : numericPart);
                }, 0);
                setNewItem({ id: `in_${maxId + 1}`, name: '', quantity: 0, cost: 0, price: 0, isaddon: false });
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the data", error);
                setLoading(false);
            });
    };    

    const handleQuantityChange = (event, id) => {
        const newQuantity = parseInt(event.target.value, 10);
        if (!isNaN(newQuantity)) {
            setEditedItems(prevItems => ({
                ...prevItems,
                [id]: { ...prevItems[id], quantity: newQuantity },
            }));
        }
    };

    const handleAddNewItem = (e) => {
        e.preventDefault();

        // user error handling
        if (!newItem.name || newItem.name.trim() === '') {
            console.error('Error: Name is required');
            handleError('Error: Name is required');
            return;
        }
        if (newItem.quantity === null || newItem.quantity < 0) {
            console.error('Error: Quantity must be a non-negative number');
            handleError('Error: Quantity must be a non-negative number');
            return;
        }
        if (newItem.cost === null || newItem.cost < 0) {
            console.error('Error: Cost must be a non-negative number');
            handleError('Error: Cost must be a non-negative number');
            return;
        }
        if (newItem.price === null || newItem.price < 0) {
            console.error('Error: Price must be a non-negative number');
            handleError('Error: Price must be a non-negative number');
            return;
        }

        fetch(`${config.REACT_APP_BACKEND_URL}/api/inventory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        })
        .then(() => {
            setNewItem({ name: '', quantity: 0, cost: 0, price: 0, isaddon: false }); // Reset form
            console.log('Item added successfully');
            fetchData(); // Refresh the list
            console.log('Item added; refresh');
        })
        .catch(error => console.error('There was an error adding the item', error));
    };

    const handleDeleteInventoryItem = (id) => {
        if (window.confirm("Are you sure you want to delete this inventory item?")) {
          fetch(`${config.REACT_APP_BACKEND_URL}/api/inventory/${id}`, {
            method: 'DELETE',
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to delete the inventory item');
            }
            console.log('Inventory item deleted successfully');
            fetchData();
          })
          .catch(error => {
            console.error('There was an error deleting the inventory item', error);
            handleError('Error: Could not delete the inventory item');
          });
        }
      };
      

    const saveChanges = () => {
        alert("Saved changes!");
        const updatePromises = Object.entries(editedItems).map(([id, data]) =>
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/inventory/${id}`, {
                method: 'PUT',//HERE is where calling backend API
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
        );

        Promise.all(updatePromises)
            .then(() => {
                fetchData(); 
                setEditedItems({}); 
            })
            .catch(error => console.error('There was an error updating the items', error));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center my-2">
            <button className="bg-tiger-gray font-bold text-yellow-200 px-4 py-2 mb-4 rounded block mx-auto" onClick={saveChanges} disabled={loading || Object.keys(editedItems).length === 0}>
                Save Changes
            </button>
            <table className="table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-gray-600">ID</th>
                            <th className="border border-gray-300 px-4 py-2 text-gray-600">Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-gray-600">Quantity</th>
                            <th className="border border-gray-300 px-4 py-2 text-gray-600">Cost</th>
                            <th className="border border-gray-300 px-4 py-2 text-gray-600">Price</th>
                            <th className="border border-gray-300 px-4 py-2 text-gray-600">Is Addon?</th>
                            <th className="border border-gray-300 px-4 py-2 text-gray-600">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="number"
                                        value={editedItems[item.id]?.quantity ?? item.quantity}
                                        onChange={(event) => handleQuantityChange(event, item.id)}
                                        className="w-full px-2 py-1 border border-gray-300 rounded"
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{item.cost}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.price}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.isaddon ? 'Yes' : 'No'}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button onClick={() => handleDeleteInventoryItem(item.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                                    Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="max-w-lg mx-auto p-4">
                <h2 className="text-2xl font-bold mb-2">ADD INVENTORY ITEM</h2>
                <form onSubmit={handleAddNewItem} className="">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4">
                    <div>
                        <label className="block font-medium text-gray-700">ID</label>
                        <input 
                            type="text" 
                            placeholder="ID" 
                            value={newItem.id} 
                            readOnly 
                            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Name</label>
                        <input 
                            type="text" 
                            placeholder="Name" 
                            value={newItem.name} 
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Quantity</label>
                        <input 
                            type="number" 
                            placeholder="Quantity" 
                            value={newItem.quantity} 
                            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Cost</label>
                        <input 
                            type="number" 
                            placeholder="Cost" 
                            value={newItem.cost} 
                            onChange={(e) => setNewItem({ ...newItem, cost: e.target.value })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Price</label>
                        <input 
                            type="number" 
                            placeholder="Price" 
                            value={newItem.price} 
                            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="flex items-center">
                        <input 
                            type="checkbox" 
                            checked={newItem.isaddon} 
                            onChange={(e) => setNewItem({ ...newItem, isaddon: e.target.checked })}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-gray-700">Is Addon?</label>
                    </div>
                    </div>
                    <button 
                        type="submit" 
                        className="bg-tiger-gray font-bold mt-4 text-yellow-200 px-4 py-2 mb-4 rounded block mx-auto"
                    >
                        Add Item
                    </button>  
                </form>
                </div>
            <ErrorPopup
                isOpen={isErrorPopupOpen}
                message={errorMessage}
                onClose={() => setIsErrorPopupOpen(false)}
            />
        </div>
    );
}

export default InventoryList;
