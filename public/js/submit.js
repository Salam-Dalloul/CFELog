const select = selector => document.querySelector(selector);
const create = type => document.createElement(type);

const isRequired = (valueToCheck) => {
  if (!valueToCheck) {
    return true;
  }
  return false;
};

const createPopup = (msgContent, bgColor) => {
  const section = create('section');
  section.className = 'popup-section';
  const sectionMsg = create('h3');
  sectionMsg.className = 'popup-msg';
  sectionMsg.style.backgroundColor = bgColor;
  sectionMsg.textContent = msgContent;
  section.appendChild(sectionMsg);
  section.addEventListener('click', (e) => {
    e.preventDefault();
    select('body').removeChild(section);
  });
  select('body').appendChild(section);
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

const submit = () => {
  if (setRequired().length > 0) {
    const requiredArr = setRequired();
    requiredArr.forEach((element) => {
      if (!select(`#${element}`).className.includes('focus')) {
        select(`#${element}`).className += ' focus';
      }
    });
    createPopup('Some Fields Are Required!!', 'rgba(255, 0, 0, 0.75)');
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
    request('/add-member', reqObject, (err, res) => {
      if (err) {
        return alert(`Error: ${err}`);
      } else if (res === 'USER_ADDED') {
        return createPopup('Added Successfully, Thanks!');
      } else if (res.startsWith('ADDING_ERROR')) {
        return createPopup(res, 'rgba(255, 0, 0, 0.75)');
      }
      return createPopup('Error Occured, please try again.');
    });
  }
};
