export const BASE_URL = 'https://api.oksanakam.nomoreparties.sbs';
//export const BASE_URL = 'http://localhost:3000';

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${res.status}`);
}

function request(endpoint, options) {
  return fetch(`${BASE_URL}/${endpoint}`, options).then(checkResponse);
}

export const register = (email, password) => {
  return request(`signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  });
};

export const login = (email, password) => {
    return request(`signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
};

export const checkToken = (token) => {
    return request(`users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(data => data);
};