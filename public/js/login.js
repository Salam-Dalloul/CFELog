const select = selector => document.querySelector(selector);
const create = type => document.createElement(type);


const username = select('.username');
const password = select('.password');
const loginBtn = select('.button');
// const request = (url, reqObject, cb) => {

loginBtn.addEventListener('click', (e) => {
  console.log(username);
  e.preventDefault();
  request('/login', {
    data: {
      username: username.value,
      password: password.value,
    },
    method: 'POST',
  }, (loginError, trueLogin) => {
    if (loginError) {
      return console.log(`${loginError}`);
    }
    return console.log('confirmed');
  });
});
