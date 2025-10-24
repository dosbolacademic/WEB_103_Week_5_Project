import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCustomItemById, deleteCustomItem } from '../services/customItemsAPI';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCustomItemById(id).then(setItem);
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Delete?')) {
      await deleteCustomItem(id);
      navigate('/items');
    }
  };

  if (!item) return <p>Loading...</p>;

  return (
    <div>
      <h1>Car Details</h1>
      <p>Wheels: {item.wheels_name}</p>
      <p>Exterior: {item.exterior_name}</p>
      <p>Price: ${item.total_price}</p>
      <Link to={`/edit/${id}`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>
      <Link to="/items">Back to List</Link>
    </div>
  );
};

export default ItemDetail;