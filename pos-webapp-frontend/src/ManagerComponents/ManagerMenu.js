import React, { useState, useEffect } from 'react';
import config from '../config';
import ErrorPopup from '../CustomerComponents/ErrorPopup';

const ManagerMenu = () => {
    const [drinks, setDrinks] = useState([]);
    const [items, setItems] = useState([]);

    const [editeddrinks, setEditeddrinks] = useState({});
    const [loading, setLoading] = useState(true);
    const [newProduct, setNewProduct] = useState({ name: '', price: 0, items: [] });

    const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleError = (message) => {
        setErrorMessage(message);
        setIsErrorPopupOpen(true);
    };

    useEffect(() => {
        fetchDrinks();
    }, []);

        const fetchDrinks = () => {
            setLoading(true);
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/inventory`)
            .then(response => response.json())
            .then(data => {
                setItems(data);
            })
            .catch(error => {
                console.error("There was an error fetching the data", error);
            });
            fetch(`${config.REACT_APP_BACKEND_URL}/api/product`)
                .then(response => response.json())
                .then(data => {
                    setDrinks(data);
                    const maxId = data.reduce((max, product) => {
                        const numericPart = parseInt(product.id.replace('p_', ''), 10);
                        return Math.max(max, isNaN(numericPart) ? 0 : numericPart);
                    }, 0);
                    setNewProduct({ id: `p_${maxId + 1}`, name: '', price: 0, items: [] });
                    setLoading(false);
          })
          .catch (error => {
            console.error("There was an error fetching the data", error);
            setLoading(false);
        });
    };    

    const handlePriceChange = (event, id) => {
        const newPrice = parseFloat(event.target.value, 10);
        if (!isNaN(newPrice)) {
            setEditeddrinks(prevdrinks => ({
                ...prevdrinks,
                [id]: { ...prevdrinks[id], price: newPrice },
            }));
        }
    };

    const saveChanges = () => {
        const updatePromises = Object.entries(editeddrinks).map(([id, data]) =>
            fetch(`${config.REACT_APP_BACKEND_URL}/api/product/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
        );

        Promise.all(updatePromises)
            .then(() => {
                fetchDrinks();
                setEditeddrinks({});
            })
            .catch(error => console.error('There was an error updating the drinks', error));
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    

    const handleAddnewProduct = async (e) => {
        e.preventDefault();
    
        // User error handling
        if (!newProduct.name || newProduct.name.trim() === '') {
            console.error('Error: Name is required');
            handleError('Error: Name is required');
            return;
        }
        if (newProduct.price === null || newProduct.price < 0) {
            console.error('Error: Price must be a non-negative number');
            handleError('Error: Price must be a non-negative number');
            return;
        }
    
        try {
            // Add the new product
            const productResponse = await fetch(`${config.REACT_APP_BACKEND_URL}/api/product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });
    
            if (!productResponse.ok) {
                throw new Error('Failed to add the product');
            }
            console.log('Number of ingredients to add:', newProduct.items.length);

            // After successfully adding the product, add each ingredient
            for (const ingredientId of newProduct.items) {
                console.log('Adding:', ingredientId);
                const nextIdResponse = await fetch(`${config.REACT_APP_BACKEND_URL}/api/productdefault/nextId`);
                const nextId = await nextIdResponse.text();
        
                const requestBody = {
                    id: nextId,
                    product_id: newProduct.id,
                    ingredient_id: ingredientId,
                };

                console.log('Request body:', requestBody)
    
                const ingredientResponse = await fetch(`${config.REACT_APP_BACKEND_URL}/api/productdefault`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });
    
                if (!ingredientResponse.ok) {
                    throw new Error('Failed to add an ingredient to the product');
                }
            }
    
            console.log('Product and ingredients added successfully');
            setNewProduct({ name: '', price: 0, items: [] }); // Reset form
            fetchDrinks(); // Refresh the list
        } catch (error) {
            console.error('There was an error adding the product or ingredients', error);
            handleError('Error: Could not add the product or ingredients');
        }
    };         

    const handleDeleteProduct = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
          // First, delete all Productdefault entries associated with the product
          fetch(`${config.REACT_APP_BACKEND_URL}/api/productdefault/product/${id}`, {
            method: 'DELETE',
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to delete the product details');
            }
            return response.text().then(text => text ? JSON.parse(text) : {});          })
          .then(() => {
            console.log('Product details deleted successfully');
      
            // Now, delete the product itself
            console.log('Trying to delete product', id);
            return fetch(`${config.REACT_APP_BACKEND_URL}/api/product/${id}`, {
              method: 'DELETE',
            });
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to delete the product');
            }
            return response.text().then(text => text ? JSON.parse(text) : {});
          })
          .then(() => {
            console.log('Product deleted successfully');
            fetchDrinks(); // Refresh the list
          })
          .catch(error => {
            console.error('There was an error deleting the product', error);
            handleError('Error: Could not delete the product');
          });
        }
      };      

  return (
    <div className="flex flex-col items-center my-2">
    <button className="bg-tiger-gray font-bold text-yellow-200 px-4 py-2 mb-4 rounded block mx-auto" onClick={saveChanges} disabled={loading || Object.keys(editeddrinks).length === 0}>
            Save Changes
        </button>
        <table className="table-auto border-collapse border border-gray-200">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-gray-600">ID</th>
                    <th className="border border-gray-300 px-4 py-2 text-gray-600">Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-gray-600">Price</th>
                    <th className="border border-gray-300 px-4 py-2 text-gray-600">Delete</th>
                </tr>
            </thead>
            <tbody>
                {drinks.map(drink => (
                    <tr key={drink.id}>
                        <td className="border border-gray-300 px-4 py-2">{drink.id}</td>
                        <td className="border border-gray-300 px-4 py-2">{drink.name}</td>
                        <td className="border border-gray-300 px-4 py-2">
                            <input
                                type="number"
                                value={editeddrinks[drink.id]?.price ?? drink.price}
                                onChange={(event) => handlePriceChange(event, drink.id)}
                                className="w-full px-2 py-1 border border-gray-300 rounded"
                            />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                            <button onClick={() => handleDeleteProduct(drink.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                            Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className="max-w-lg mx-auto p-4">
                <h2 className="font-bold mb-2 flex justify-center">ADD MENU ITEM</h2>
                <form onSubmit={handleAddnewProduct} className="">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4">
                    <div>
                        <label className="block font-medium text-gray-700">ID</label>
                        <input 
                            type="text" 
                            placeholder="ID" 
                            value={newProduct.id} 
                            readOnly 
                            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Name</label>
                        <input 
                            type="text" 
                            placeholder="Name" 
                            value={newProduct.name} 
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Price</label>
                        <input 
                            type="number" 
                            placeholder="Price" 
                            value={newProduct.price} 
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    </div>
                    <div className="mt-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2">
                        {items.map(item => (
                            <div key={item.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={newProduct.items.includes(item.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setNewProduct({ ...newProduct, items: [...newProduct.items, item.id] });
                                        } else {
                                            setNewProduct({ ...newProduct, items: newProduct.items.filter(id => id !== item.id) });
                                        }
                                    }}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor={`checkbox-${item.id}`} className="ml-2 text-gray-900">
                                    {item.name}
                                </label>
                            </div>
                        ))}
                    </div>
                    <button 
                        type="submit" 
                        className="bg-tiger-gray font-bold mt-4 text-yellow-200 px-4 py-2 mb-4 rounded block mx-auto"
                    >
                        Add Product
                    </button>  
                </form>
            </div>
        <ErrorPopup
            isOpen={isErrorPopupOpen}
            message={errorMessage}
            onClose={() => setIsErrorPopupOpen(false)}
        />
    </div>
  )
}

export default ManagerMenu