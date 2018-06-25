const getFormDataAsObject = (form = document.createElement('form')) =>
  Array.from(new FormData(form).entries()).reduce(
    (obj, [key, value]) => Object.assign(obj, { [key]: value }),
    {}
  );

[
  { id: 'create-user', method: 'POST', url: '/users' },
  { id: 'add-exercise', method: 'POST', url: '/users/{userId}/exercises' },
  { id: 'get-exercises', method: 'GET', url: '/users/{userId}/exercises' }
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

    fetch(
      url,
      method === 'GET'
        ? {}
        : {
            method,
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
          }
    )
      .then(checkStatus)
      .then(res => res.json())
      .then(console.log)
      .catch(error =>
        error.response.json().then(json => console.error(json || error))
      );
  };
});
