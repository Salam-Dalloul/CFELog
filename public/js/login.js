const select = selector => document.querySelector(selector);
const create = type => document.createElement(type);


const username = select('.username').value;
const password = select('.password').value;
const loginBtn = select('.button');
// const request = (url, reqObject, cb) => {

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  request('/login', { data: { username, password }, method: 'POST' }, (loginError, trueLogin) => {
    if (loginError) {
      return console.log(`${loginError}`);
    }
    return console.log('confirmed');
  });
});
