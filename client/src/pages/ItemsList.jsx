import React, { useState, useEffect } from 'react';
import { getAllCustomItems, deleteCustomItem } from '../services/customItemsAPI';
import { Link } from 'react-router-dom';

const ItemsList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAllCustomItems().then(setItems);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this item?')) {
      await deleteCustomItem(id);
      setItems(items.filter(item => item.id !== id));
    }
  };

  return (
    <div>
      <h1>All Custom Cars</h1>
      <Link to="/create">Create New</Link>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.wheels_name} + {item.exterior_name} - ${item.total_price}
            <Link to={`/item/${item.id}`}>View</Link>
            <Link to={`/edit/${item.id}`}>Edit</Link>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsList;