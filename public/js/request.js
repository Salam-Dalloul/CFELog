const request = (url, reqObject, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb(null, xhr.responseText);
      } else {
        cb(xhr.responseText);
      }
    }
  };
  if (reqObject.method === 'GET') {
    xhr.open('GET', url, true);
    xhr.send();
  } else if (reqObject.method === 'POST') {
    xhr.open('POST', url, true);
    xhr.send(JSON.stringify(reqObject.data));
  }
};
