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

  const closeBtn = create('button');
  closeBtn.name = 'close-form';
  closeBtn.className = 'close-form';
  closeBtn.textContent = 'Close';
  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    select('body').removeChild(container);
  });

  container.appendChild(personObj.name);
  container.appendChild(personObj.phone);
  container.appendChild(personObj.codeWarsBfr);
  container.appendChild(personObj.codeWarsAft);
  container.appendChild(personObj.freeCodeCampBfr);
  container.appendChild(personObj.freeCodeCampAft);
  container.appendChild(personObj.notes);
  container.appendChild(submitBtn);
  container.appendChild(closeBtn);
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

const createHistoryBtn = (memberId) => {
  const historyBtn = create('button');
  historyBtn.className = 'history-button button';
  historyBtn.textContent = '📰';
  historyBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const requestObj = {
      data: memberId,
      method: 'POST',
    };
    request('/get-member-history', requestObj, (historyFetchError, memberHistory) => {
      if (historyFetchError) {
        return createPopup('Failed to Fetch History..', 'red');
      }
      return console.log(memberHistory);
    });
  });
  return historyBtn;
};

const createArticle = (member) => {
  const onePersonArticle = create('article');
  onePersonArticle.className = 'row-x';


  const dataDivs = {
    name: create('div'),
    phone: create('div'),
    codeWars: create('div'),
    freeCodeCamp: create('div'),
    notes: create('div'),
  };
  const dataLabels = {
    name: create('label'),
    phone: create('label'),
    codeWars: create('label'),
    freeCodeCamp: create('label'),
    notes: create('label'),
  };

  dataDivs.name.className = 'column-y';
  dataDivs.phone.className = 'column-y';
  dataDivs.codeWars.className = 'column-y cw';
  dataDivs.freeCodeCamp.className = 'column-y fcc';
  dataDivs.notes.className = 'column-y';

  dataLabels.name.className = 'column-labels';
  dataLabels.phone.className = 'column-labels';
  dataLabels.codeWars.className = 'column-labels';
  dataLabels.freeCodeCamp.className = 'column-labels';
  dataLabels.notes.className = 'column-labels notes';

  dataLabels.name.textContent = `${member.name}`;
  dataLabels.phone.textContent = `${member.phone}`;
  dataLabels.codeWars.textContent = `${member.cwb} - ${member.cwa}`;
  dataLabels.freeCodeCamp.textContent = `${member.fccb} - ${member.fcca}`;
  dataLabels.notes.textContent = `${member.notes}`;

  const btnsDiv = create('div');
  btnsDiv.className = 'column-y btns';
  const editBtn = createEditBtn(member);
  const deleteBtn = createDeleteBtn(member.id);
  const historyBtn = createHistoryBtn(member.id);

  dataDivs.name.appendChild(dataLabels.name);
  dataDivs.phone.appendChild(dataLabels.phone);
  dataDivs.codeWars.appendChild(dataLabels.codeWars);
  dataDivs.freeCodeCamp.appendChild(dataLabels.freeCodeCamp);
  dataDivs.notes.appendChild(dataLabels.notes);

  btnsDiv.appendChild(editBtn);
  btnsDiv.appendChild(deleteBtn);
  btnsDiv.appendChild(historyBtn);

  onePersonArticle.appendChild(dataDivs.name);
  onePersonArticle.appendChild(dataDivs.phone);
  onePersonArticle.appendChild(dataDivs.codeWars);
  onePersonArticle.appendChild(dataDivs.freeCodeCamp);
  onePersonArticle.appendChild(dataDivs.notes);
  onePersonArticle.appendChild(btnsDiv);

  return onePersonArticle;
};

const buildDom = (arrayOfMembers) => {
  const container = select('.metadata');
  arrayOfMembers.forEach((member) => {
    const memberArticle = createArticle(member);
    container.appendChild(memberArticle);
  });
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
