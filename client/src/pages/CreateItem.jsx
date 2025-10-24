import React, { useState, useEffect } from 'react';
import { getAllWheels } from '../services/wheelsAPI';
import { getAllExteriors } from '../services/exteriorsAPI';
import { createCustomItem } from '../services/customItemsAPI';
import { calculateTotalPrice, isValidCombo } from '../utilities/calcPrice';  // Note: import both utils
import { useNavigate } from 'react-router-dom';

const CreateItem = () => {
  const [wheels, setWheels] = useState([]);
  const [exteriors, setExteriors] = useState([]);
  const [selectedWheels, setSelectedWheels] = useState(null);
  const [selectedExterior, setSelectedExterior] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getAllWheels().then(setWheels);
    getAllExteriors().then(setExteriors);
  }, []);

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
      await createCustomItem({
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
      <h1>Create Custom Car</h1>
      <form onSubmit={handleSubmit}>
        <label>Wheels:
          <select onChange={(e) => setSelectedWheels(wheels.find(w => w.id === parseInt(e.target.value)))} required>
            <option value="">Select...</option>
            {wheels.map(w => <option key={w.id} value={w.id}>{w.name} (+${w.price})</option>)}
          </select>
        </label>
        <label>Exterior:
          <select onChange={(e) => setSelectedExterior(exteriors.find(eo => eo.id === parseInt(e.target.value)))} required>
            <option value="">Select...</option>
            {exteriors.map(eo => <option key={eo.id} value={eo.id}>{eo.name} (+${eo.price})</option>)}
          </select>
        </label>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <p>Total Price: ${totalPrice}</p>
        {selectedExterior && (
          <img src={selectedExterior.image_url} alt={selectedExterior.name} style={{width: '300px'}} />
        )}  {/* Visual update on exterior select */}
        <button type="submit">Create Car</button>
      </form>
    </div>
  );
};

export default CreateItem;