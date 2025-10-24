const API_BASE = 'http://localhost:3001/api';  // Change to Render URL later

export const getAllCustomItems = async () => {
  const response = await fetch(`${API_BASE}/custom-items`);
  if (!response.ok) throw new Error('Failed to fetch items');
  return response.json();
};

export const getCustomItemById = async (id) => {
  const response = await fetch(`${API_BASE}/custom-items/${id}`);
  if (!response.ok) throw new Error('Failed to fetch item');
  return response.json();
};

export const createCustomItem = async (item) => {
  const response = await fetch(`${API_BASE}/custom-items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create item');
  }
  return response.json();
};

export const updateCustomItem = async (id, item) => {
  const response = await fetch(`${API_BASE}/custom-items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  if (!response.ok) throw new Error('Failed to update item');
  return response.json();
};

export const deleteCustomItem = async (id) => {
  const response = await fetch(`${API_BASE}/custom-items/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete item');
  return response.json();
};