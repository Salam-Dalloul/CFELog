const select = selector => document.querySelector(selector);
const create = type => document.createElement(type);


const username = select('.username');
const password = select('.password');
const loginBtn = select('.button');

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  request('/login', {
    data: {
      username: username.value,
      password: password.value,
    },
    method: 'POST',
  }, (loginError, trueLogin) => {
    if (loginError) {
      select('.login-msg').textContent = 'Login Failed!';
      return select('.login-msg').style.color = 'Red';
    }
    return window.location.pathname = '/report';
  });
});
