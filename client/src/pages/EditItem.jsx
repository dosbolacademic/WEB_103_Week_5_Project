import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllWheels } from '../services/wheelsAPI';
import { getAllExteriors } from '../services/exteriorsAPI';
import { getCustomItemById, updateCustomItem } from '../services/customItemsAPI';
import { calculateTotalPrice } from '../utilities/calcPrice';
import { isValidCombo } from '../utilities/validateCombo';

const EditItem = () => {
  const [wheels, setWheels] = useState([]);
  const [exteriors, setExteriors] = useState([]);
  const [selectedWheels, setSelectedWheels] = useState(null);
  const [selectedExterior, setSelectedExterior] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAllWheels().then(setWheels);
    getAllExteriors().then(setExteriors);
  }, []);

  useEffect(() => {
    if (id) {
      getCustomItemById(id)
        .then((itemData) => {
          const prefillWheels = wheels.find(w => w.id === itemData.wheels_id);
          const prefillExterior = exteriors.find(e => e.id === itemData.exterior_id);
          setSelectedWheels(prefillWheels);
          setSelectedExterior(prefillExterior);
          setTotalPrice(itemData.total_price);
        })
        .catch((err) => setError('Failed to load item: ' + err.message));
    }
  }, [id, wheels, exteriors]);  // Depend on fetched options

  useEffect(() => {
    if (selectedWheels && selectedExterior) {
      setTotalPrice(calculateTotalPrice(selectedWheels, selectedExterior));
      setError(isValidCombo(selectedWheels, selectedExterior) ? '' : 'Invalid combo detected (client check)');
    }
  }, [selectedWheels, selectedExterior]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidCombo(selectedWheels, selectedExterior)) {
      setError('Invalid combo: Gold wheels incompatible with red exterior');
      return;
    }
    try {
      await updateCustomItem(id, {
        wheels_id: selectedWheels.id,
        exterior_id: selectedExterior.id,
        total_price: totalPrice
      });
      navigate('/items');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Edit Custom Car</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Wheels:
          <select 
            value={selectedWheels?.id || ''} 
            onChange={(e) => setSelectedWheels(wheels.find(w => w.id === parseInt(e.target.value)))}
            required
          >
            <option value="">Select...</option>
            {wheels.map(w => (
              <option key={w.id} value={w.id}>
                {w.name} (+${w.price})
              </option>
            ))}
          </select>
        </label>
        <label>
          Exterior:
          <select 
            value={selectedExterior?.id || ''} 
            onChange={(e) => setSelectedExterior(exteriors.find(eo => eo.id === parseInt(e.target.value)))}
            required
          >
            <option value="">Select...</option>
            {exteriors.map(eo => (
              <option key={eo.id} value={eo.id}>
                {eo.name} (+${eo.price})
              </option>
            ))}
          </select>
        </label>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <p>Total Price: ${totalPrice}</p>
        {selectedExterior && (
          <img src={selectedExterior.image_url} alt={selectedExterior.name} style={{width: '300px'}} />
        )}
        <button type="submit">Update Car</button>
      </form>
      <button onClick={() => navigate('/items')}>Cancel</button>
    </div>
  );
};

export default EditItem;