const select = selector => document.querySelector(selector);
const create = type => document.createElement(type);

const buildDom = (arrayOfMembers) => {
  const container = create('container');
  container.className = 'container';
  const body = select('body');
  arrayOfMembers.forEach((member) => {
    const onePersonArticle = create('article');
    onePersonArticle.className = 'one-person';
    const content = ` <label class='info-labels' for="name">NAME: </label><label id='name' class='data-labels'>${member.name}</label>
        <label class='info-labels' for="phone">PHONE: </label><label id='phone' class='data-labels'>${member.phone}</label>
        <label class='info-labels' for="code-wars">CODEWARS: </label><label id='code-wars' class='data-labels'>${member.cwb} - ${member.cwa}</label>
        <label class='info-labels' for="free-code-camp">FREECODECAMP: </label><label id='free-code-camp' class='data-labels'>${member.fccb} - ${member.fcca}</label>
        <label class='info-labels' for="notes">NOTES: </label><label id='notes' class='data-labels'>${member.notes}</label>
        <span class="person-buttons"><button type="button" name="button" class="button delete-button">⌘</button>
        <button type="button" name="button" class="button edit-button">✎</button></span>`;
    onePersonArticle.innerHTML = content;
    container.appendChild(onePersonArticle);
  });
  body.appendChild(container);
};

const getReport = () => {
  request('/get-data', { method: 'GET' }, (err, res) => {
    if (err) {
      return console.log(err);
    }
    buildDom(JSON.parse(res));
  });
};

getReport();
