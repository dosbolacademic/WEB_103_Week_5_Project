export const isValidCombo = (wheels, exterior) => {
  return !(wheels?.name === 'Gold Wheels' && exterior?.name === 'Red');
};