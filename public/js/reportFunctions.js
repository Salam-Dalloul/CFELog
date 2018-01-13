function deleteMember(element) {
  const confirmation = confirm('Are You Sure About Deleting This Member?');
  if (confirmation) {
    const body = {
      id: element.parentElement.parentElement.children[0].children[0].id,
    };
    const headers = {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    };

    fetch('/delete-member', headers)
      .then(res => res.json())
      .then((res) => {
        if (res.responseText === 'Deleting History Failed' || res.responseText === 'Deleting Member Failed') {
          createPopup('Deleting Member Failed', 'red');
        } else if (res.responseText === 'Deleted Successfully') {
          element.parent;
          window.location.pathname = '/report';
        }
      })
      .catch((err) => {
        createPopup('Something Went Wrong', 'red');
      });
  }
}

function updateMember(element) {
  const container = create('section');
  container.className = 'edit-container';
  const parentElement = element.parentElement.parentElement;

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
  personObj.name.value = parentElement.children[0].children[0].textContent;

  personObj.phone.placeholder = 'Phone Number';
  personObj.phone.id = 'phone';
  personObj.phone.type = 'text';
  personObj.phone.name = 'phone';
  personObj.phone.className = 'input-fields';
  personObj.phone.value = parentElement.children[1].children[0].textContent;

  personObj.codeWarsBfr.placeholder = 'CodeWars Before';
  personObj.codeWarsBfr.id = 'code-wars-before';
  personObj.codeWarsBfr.type = 'text';
  personObj.codeWarsBfr.name = 'code-wars';

  personObj.codeWarsBfr.className = 'input-fields';
  personObj.codeWarsBfr.value = parentElement.children[2].children[0].textContent.split(' - ')[0];

  personObj.codeWarsAft.placeholder = 'CodeWars After';
  personObj.codeWarsAft.id = 'code-wars-after';
  personObj.codeWarsAft.type = 'text';
  personObj.codeWarsAft.name = 'code-wars';
  personObj.codeWarsAft.className = 'input-fields';
  personObj.codeWarsAft.value = parentElement.children[2].children[0].textContent.split(' - ')[1];

  personObj.freeCodeCampBfr.placeholder = 'FreeCodeCamp Before';
  personObj.freeCodeCampBfr.id = 'free-code-camp-before';
  personObj.freeCodeCampBfr.type = 'text';
  personObj.freeCodeCampBfr.name = 'free-code-camp';
  personObj.freeCodeCampBfr.className = 'input-fields';
  personObj.freeCodeCampBfr.value = parentElement.children[3].children[0].textContent.split(' - ')[0];

  personObj.freeCodeCampAft.placeholder = 'FreeCodeCamp After';
  personObj.freeCodeCampAft.id = 'free-code-camp-after';
  personObj.freeCodeCampAft.type = 'text';
  personObj.freeCodeCampAft.name = 'free-code-camp';
  personObj.freeCodeCampAft.className = 'input-fields';
  personObj.freeCodeCampAft.value = parentElement.children[3].children[0].textContent.split(' - ')[1];

  personObj.notes.placeholder = 'Notes';
  personObj.notes.id = 'notes';
  personObj.notes.type = 'text';
  personObj.notes.name = 'notes';
  personObj.notes.className = 'input-fields';
  personObj.notes.value = parentElement.children[4].children[0].textContent;

  const submitBtn = create('button');
  submitBtn.name = 'submit-form';
  submitBtn.className = 'submit-button';
  submitBtn.textContent = 'Submit';
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const newPersonObj = {
      id: element.parentElement.parentElement.children[0].children[0].id,
      name: personObj.name.value,
      phone: personObj.phone.value,
      cwb: personObj.codeWarsBfr.value,
      cwa: personObj.codeWarsAft.value,
      fccb: personObj.freeCodeCampBfr.value,
      fcca: personObj.freeCodeCampAft.value,
      notes: personObj.notes.value,

    };
    const headers = {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(newPersonObj),
    };

    fetch('/update-member', headers)
      .then(res => res.json())
      .then((res) => {
        if (res.responseText === 'Error Inserting History' || res.responseText === 'Error updating Member') {
          createPopup('Error updating Member', 'red');
        } else if (res.responseText === 'Updated Successfully') {
          createPopup('Updated Successfully', 'green');
        }
      })
      .catch((err) => {
        createPopup('Something Went Wrong', 'red');
      });
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
  select('body').appendChild(container);
}

function viewHistory(element) {
  const body = {
    id: element.parentElement.parentElement.children[0].children[0].id,
  };
  const headers = {
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  };

  fetch('/view-history', headers)
    .then(res => res.json())
    .then((res) => {
      if (res.responseText === 'There Is No History') {
        createPopup('Empty History', 'red');
      }
      const memberName = element.parentElement.parentElement.children[0].children[0].textContent;
      const container = create('section');
      container.className = 'history-container';

      const headInfo = create('div');
      headInfo.className = 'head-info';

      const nameLabel = create('label');
      nameLabel.textContent = `Name: ${memberName}`;

      const headArticle = create('article');
      headArticle.className = 'row-head';

      headInfo.appendChild(nameLabel);
      headArticle.appendChild(headInfo);
      const closeBtn = create('button');
      closeBtn.name = 'close-form';
      closeBtn.className = 'close-form';
      closeBtn.textContent = 'Close';
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        select('body').removeChild(container);
      });
      container.appendChild(headArticle);

      res.forEach((member) => {
        const headDivs = {
          cw: create('div'),
          fcc: create('div'),
          notes: create('div'),
          date: create('div'),
        };

        headDivs.cw.className = 'column-y cw';
        headDivs.fcc.className = 'column-y fcc';
        headDivs.notes.className = 'column-y';
        headDivs.date.className = 'column-y';

        const divsLabels = {
          cw: create('label'),
          fcc: create('label'),
          notes: create('label'),
          date: create('label'),
        };

        divsLabels.cw.className = 'column-labels';
        divsLabels.fcc.className = 'column-labels';
        divsLabels.notes.className = 'column-labels';
        divsLabels.date.className = 'column-labels';

        divsLabels.cw.textContent = `${member.cwb}-${member.cwa}`;
        divsLabels.fcc.textContent = `${member.fccb}-${member.fcca}`;
        divsLabels.notes.textContent = member.notes;
        divsLabels.date.textContent = member.date;

        headDivs.cw.appendChild(divsLabels.cw);
        headDivs.fcc.appendChild(divsLabels.fcc);
        headDivs.notes.appendChild(divsLabels.notes);
        headDivs.date.appendChild(divsLabels.date);

        const historyArticle = create('article');
        historyArticle.className = 'row-x';

        historyArticle.appendChild(headDivs.cw);
        historyArticle.appendChild(headDivs.fcc);
        historyArticle.appendChild(headDivs.notes);
        historyArticle.appendChild(headDivs.date);

        container.appendChild(historyArticle);
        select('body').appendChild(container);
      });
      container.appendChild(closeBtn);
    })
    .catch((err) => {
      createPopup('Something Went Wrong', 'red');
    });
}
