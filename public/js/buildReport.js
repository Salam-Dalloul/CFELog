const select = selector => document.querySelector(selector);
const create = type => document.createElement(type);

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
    window.location.pathname = '/report';
  });
  select('body').appendChild(section);
};

const updateMember = (memberId) => {
  const personObj = {
    data: {
      id: memberId,
      name: select('#name').value,
      phone: select('#phone').value,
      codeWarsBfr: select('#code-wars-before').value,
      codeWarsAft: select('#code-wars-after').value,
      freeCodeCampBfr: select('#free-code-camp-before').value,
      freeCodeCampAft: select('#free-code-camp-after').value,
      notes: select('#notes').value,
    },
    method: 'POST',
  };
  request('/update-member', personObj, (err, response) => {
    if (err || response === 'UPDATING_MEMBER_FAILED') {
      return createPopup('Failed to Update..', 'red');
    }
    return createPopup('Updated Successfylly');
  });
};

const createEditSection = (member) => {
  const container = create('section');
  container.className = 'edit-container';

  const personObj = {
    name: create('input'),
    phone: create('input'),
    codeWarsBfr: create('input'),
    codeWarsAft: create('input'),
    freeCodeCampBfr: create('input'),
    freeCodeCampAft: create('input'),
    notes: create('input'),
  };
  personObj.name.placeholder = 'Name';
  personObj.name.id = 'name';
  personObj.name.type = 'text';
  personObj.name.name = 'name';
  personObj.name.className = 'input-fields';
  personObj.name.value = member.name;

  personObj.phone.placeholder = 'Phone Number';
  personObj.phone.id = 'phone';
  personObj.phone.type = 'text';
  personObj.phone.name = 'phone';
  personObj.phone.className = 'input-fields';
  personObj.phone.value = member.phone;

  personObj.codeWarsBfr.placeholder = 'CodeWars Before';
  personObj.codeWarsBfr.id = 'code-wars-before';
  personObj.codeWarsBfr.type = 'text';
  personObj.codeWarsBfr.name = 'code-wars';
  personObj.codeWarsBfr.className = 'input-fields';
  personObj.codeWarsBfr.value = member.cwb;

  personObj.codeWarsAft.placeholder = 'CodeWars After';
  personObj.codeWarsAft.id = 'code-wars-after';
  personObj.codeWarsAft.type = 'text';
  personObj.codeWarsAft.name = 'code-wars';
  personObj.codeWarsAft.className = 'input-fields';
  personObj.codeWarsAft.value = member.cwa;

  personObj.freeCodeCampBfr.placeholder = 'FreeCodeCamp Before';
  personObj.freeCodeCampBfr.id = 'free-code-camp-before';
  personObj.freeCodeCampBfr.type = 'text';
  personObj.freeCodeCampBfr.name = 'free-code-camp';
  personObj.freeCodeCampBfr.className = 'input-fields';
  personObj.freeCodeCampBfr.value = member.fccb;

  personObj.freeCodeCampAft.placeholder = 'FreeCodeCamp After';
  personObj.freeCodeCampAft.id = 'free-code-camp-after';
  personObj.freeCodeCampAft.type = 'text';
  personObj.freeCodeCampAft.name = 'free-code-camp';
  personObj.freeCodeCampAft.className = 'input-fields';
  personObj.freeCodeCampAft.value = member.fcca;

  personObj.notes.placeholder = 'Notes';
  personObj.notes.id = 'notes';
  personObj.notes.type = 'text';
  personObj.notes.name = 'notes';
  personObj.notes.className = 'input-fields';
  personObj.notes.value = member.notes;

  const submitBtn = create('button');
  submitBtn.name = 'submit-form';
  submitBtn.className = 'submit-button';
  submitBtn.textContent = 'Submit';
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    updateMember(member.id);
  });
  container.appendChild(personObj.name);
  container.appendChild(personObj.phone);
  container.appendChild(personObj.codeWarsBfr);
  container.appendChild(personObj.codeWarsAft);
  container.appendChild(personObj.freeCodeCampBfr);
  container.appendChild(personObj.freeCodeCampAft);
  container.appendChild(personObj.notes);
  container.appendChild(submitBtn);
  return container;
};

const createEditBtn = (member) => {
  const editBtn = create('button');
  editBtn.className = 'edit-button button';
  editBtn.textContent = '🖉';
  editBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const editContainer = createEditSection(member);
    select('body').appendChild(editContainer);
  });
  return editBtn;
};

const createDeleteBtn = (memberId) => {
  const deleteBtn = create('button');
  deleteBtn.className = 'delete-button button';
  deleteBtn.textContent = '✖';
  deleteBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const confirmDelete = confirm('Are You Sure About This?');
    if (confirmDelete) {
      const requestObj = {
        data: memberId,
        method: 'POST',
      };
      request('/delete-member', requestObj, (errorDeleting, successfulDeleting) => {
        if (errorDeleting) {
          return createPopup('Failed to Update..', 'red');
        }
        return createPopup('Deleted Successfylly', 'red');
      });
    }
  });
  return deleteBtn;
};
const createArticle = (member) => {
  const onePersonArticle = create('article');
  onePersonArticle.className = 'one-person';

  const infoLables = {
    id: create('label'),
    name: create('label'),
    phone: create('label'),
    codeWars: create('label'),
    freeCodeCamp: create('label'),
    notes: create('label'),
  };
  const dataLabels = {
    id: create('label'),
    name: create('label'),
    phone: create('label'),
    codeWars: create('label'),
    freeCodeCamp: create('label'),
    notes: create('label'),
  };

  infoLables.name.className = 'info-labels';
  infoLables.phone.className = 'info-labels';
  infoLables.codeWars.className = 'info-labels';
  infoLables.freeCodeCamp.className = 'info-labels';
  infoLables.notes.className = 'info-labels';

  dataLabels.name.className = 'data-labels';
  dataLabels.phone.className = 'data-labels';
  dataLabels.codeWars.className = 'data-labels';
  dataLabels.freeCodeCamp.className = 'data-labels';
  dataLabels.notes.className = 'data-labels';

  infoLables.name.textContent = 'Name';
  infoLables.phone.textContent = 'Phone';
  infoLables.codeWars.textContent = 'CodeWars';
  infoLables.freeCodeCamp.textContent = 'FreeCodeCamp';
  infoLables.notes.textContent = 'Notes';

  dataLabels.name.textContent = `${member.name}`;
  dataLabels.phone.textContent = `${member.phone}`;
  dataLabels.codeWars.textContent = `${member.cwb} - ${member.cwa}`;
  dataLabels.freeCodeCamp.textContent = `${member.fccb} - ${member.fcca}`;
  dataLabels.notes.textContent = `${member.notes}`;

  const editBtn = createEditBtn(member);
  const deleteBtn = createDeleteBtn(member.id);

  onePersonArticle.appendChild(infoLables.name);
  onePersonArticle.appendChild(dataLabels.name);
  onePersonArticle.appendChild(infoLables.phone);
  onePersonArticle.appendChild(dataLabels.phone);
  onePersonArticle.appendChild(infoLables.codeWars);
  onePersonArticle.appendChild(dataLabels.codeWars);
  onePersonArticle.appendChild(infoLables.freeCodeCamp);
  onePersonArticle.appendChild(dataLabels.freeCodeCamp);
  onePersonArticle.appendChild(infoLables.notes);
  onePersonArticle.appendChild(dataLabels.notes);
  onePersonArticle.appendChild(editBtn);
  onePersonArticle.appendChild(deleteBtn);

  return onePersonArticle;
};

const buildDom = (arrayOfMembers) => {
  const container = create('container');
  container.className = 'container';
  const body = select('body');
  arrayOfMembers.forEach((member) => {
    const memberArticle = createArticle(member);
    container.appendChild(memberArticle);
  });
  body.appendChild(container);
  select('#total-count').innerHTML = arrayOfMembers.length;
};

const getReport = () => {
  request('/get-data', { method: 'GET' }, (err, res) => {
    if (err) {
      createPopup('Something went wrong', 'red');
    }
    buildDom(JSON.parse(res));
  });
};

getReport();
