const select = selector => document.querySelector(selector);
const create = type => document.createElement(type);

const isRequired = (valueToCheck) => {
  if (!valueToCheck) {
    return true;
  }
  return false;
};

const setRequired = () => {
  const inputFields = document.querySelectorAll('input');
  const requiredArray = [];
  inputFields.forEach((inputField) => {
    if (isRequired(inputField.value) && inputField.id !== 'notes') {
      requiredArray.push(inputField.id);
    }
  });
  return requiredArray || false;
};

const submit = () => {
  console.log(setRequired().length);
  if (setRequired().length > 0) {
    const requiredArr = setRequired();
    requiredArr.forEach((element) => {
      select(`#${element}`).className += ' focus';
    });
    const requiredErrorMsg = create('h3');
    requiredErrorMsg.className = 'required-error-msg';
    requiredErrorMsg.textContent = 'Some Fields Are Required';
    const errorSection = create('section');
    errorSection.className = 'error-section';
    errorSection.appendChild(requiredErrorMsg);
    errorSection.addEventListener('click', (e) => {
      e.preventDefault();
      select('body').removeChild(errorSection);
    });
    select('body').appendChild(errorSection);
  } else {
    const personObj = {
      name: select('#name').value,
      phone: select('#phone').value,
      codeWarsBfr: select('#code-wars-before').value,
      codeWarsAft: select('#code-wars-after').value,
      freeCodeCampBfr: select('#free-code-camp-before').value,
      freeCodeCampAft: select('#free-code-camp-after').value,
      notes: select('#notes').value,
    };
    const reqObject = {
      method: 'POST',
      data: personObj,
    };


    request('/newPerson', reqObject, (err, res) => {
      if (err) {
        return alert(`Error: ${err}`);
      }
      return res;
    });
  }
};
