export const calculateTotalPrice = (wheels, exterior) => {
  return (wheels?.price || 0) + (exterior?.price || 0);
};