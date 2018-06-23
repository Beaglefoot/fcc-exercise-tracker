import isValid from 'date-fns/is_valid';

const isValidDate = (date: string): boolean => {
  if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) return false;
  return isValid(new Date(date));
};

export default isValidDate;
