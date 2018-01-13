select('.submit-button').addEventListener('click', (event) => {
  event.preventDefault();
  const body = {
    name: select('#name').value,
    phone: select('#phone').value,
    gender: select('#gender').value,
    cwb: select('#code-wars-before').value,
    cwa: select('#code-wars-after').value,
    fccb: select('#free-code-camp-before').value,
    fcca: select('#free-code-camp-after').value,
    notes: select('#notes').value,
  };
  const headers = {
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  };

  fetch('/add-member', headers)
    .then(res => res.json())
    .then((res) => {
      if (res.responseText === 'Member Already Exists') {
        createPopup('Member Already Exists', 'red');
      } else if (res.responseText === 'Insert Unsuccessful') {
        createPopup('Insert Unsuccessful', 'red');
      } else if (res.responseText === 'Insert Successful') {
        createPopup('Insert is Successful', 'green');
      } else {
        createPopup(res);
      }
    })
    .catch((err) => {
      createPopup('Something Went Wrong', 'red');
    });
});
