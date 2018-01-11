
select('.submit-button').addEventListener('click', (event) => {
  event.preventDefault();
  const username = select('#username').value;
  const role = select('#role').value;
  const password = select('#password').value;
  const confirmPassword = select('#passwordValidation').value;
  if (!password || !confirmPassword || !username || !role) {
    createPopup('all fields must be Filled', 'red');
  } else if (username.length < 4) {
    createPopup('username length must be more than 4', 'red');
  } else if (password !== confirmPassword) {
    createPopup('passwords must be the same', 'red');
  } else if (password.length < 8) {
    createPopup('passwords must be 8 or more', 'red');
  } else {
    const body = {
      username,
      role,
      password,
    };
    const headers = {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    };
    fetch('/add-user', headers)
      .then(res => res.json())
      .then(res => console.log(res))
      .then(err => console.log(err));
  }
});


// const select = selector => document.querySelector(selector);
//
//

// const addUser = () => {
//   if (select('#passwordValidation').value == select('#password').value) {
//     userObj = {
//       username: select('#username').value,
//       password: select('#password').value,
//       role: 'admin',
//     };
//     if (!userObj.username || !userObj.password || !userObj.role) {
//       createPopup('All Fields Must Be Filled!', 'red');
//     } else if (userObj.username.length < 4) {
//       createPopup('Username must be at least 4 letters!', 'red');
//     } else if (userObj.password.length < 8) {
//       createPopup('Password must be at least 8 characters!', 'red');
//     } else {
//       request('/add-new-user', {
//         data: userObj,
//         method: 'POST',
//       }, (addUserError, userAddedSuccessfully) => {
//         if (addUserError) {
//           return createPopup(`${addUserError}`, 'red');
//         }
//         select('#username').value = '';
//         select('#password').value = '';
//         select('#passwordValidation').value = '';
//         return createPopup('User is now added, thanks!', 'green');
//       });
//     }
//   } else {
//     createPopup('Passwords must match!', 'red');
//   }
// };
//
// select('.submit-button').addEventListener('click', (e) => {
//   e.preventDefault();
//   addUser();
// });
