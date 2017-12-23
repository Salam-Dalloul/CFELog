
const isRequired = (valueToCheck) => {
  if (!valueToCheck) {
    return true;
  }
  return false;
};
const inputFields = document.querySelectorAll('input');
const requiredArray = [];
const setRequired = () => {
  if (requiredArray.length > 0) {
    requiredArray.length = 0;
  }
  inputFields.forEach((inputField) => {
    if (isRequired(inputField.value) && inputField.id !== 'notes') {
      requiredArray.push(inputField.id);
    }
  });
  return requiredArray || false;
};
