const getFormDataAsObject = (form = document.createElement('form')) =>
  Array.from(new FormData(form).entries()).reduce(
    (obj, [key, value]) => Object.assign(obj, { [key]: value }),
    {}
  );

[
  { id: 'create-user', method: 'POST', url: '/users' },
  { id: 'add-exercise', method: 'POST', url: '/users/{userId}/exercises' }
].forEach(({ id, method, url }) => {
  document.getElementById(id).onsubmit = event => {
    event.preventDefault();
    const formData = getFormDataAsObject(event.target);

    console.log(formData);

    const checkStatus = response => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    };

    url = Object.entries(formData).reduce(
      (route, [key, value]) => route.replace(`{${key}}`, value),
      url
    );

    fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(checkStatus)
      .then(console.log)
      .catch(({ response }) => console.error(response));
  };
});
