const select = selector => document.querySelector(selector);
const create = type => document.createElement(type);

select('.submit-button').addEventListener('click', (e) => {
  e.preventDefault();
  addUser();
});

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

const addUser = () => {
  userObj = {
    username: select('#username').value,
    password: select('#password').value,
    role: select('#role').value,
  };
  if (!userObj.username || !userObj.password || !userObj.role) {
    createPopup('All Fields Must Be Filled!', 'red');
  } else if (userObj.username.length < 4) {
    createPopup('Username must be at least 4 letters!', 'red');
  } else if (userObj.password.length < 8) {
    createPopup('Password must be at least 8 characters!', 'red');
  } else {
    request('/add-new-user', {
      data: userObj,
      method: 'POST',
    }, (addUserError, userAddedSuccessfully) => {
      if (addUserError) {
        console.log(addUserError);
        return createPopup('Something went wrong!!', 'red');
      }
      console.log(userAddedSuccessfully);
      return createPopup('User is now added, thanks!', 'green');
    });
  }
};