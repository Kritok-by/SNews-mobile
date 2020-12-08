import { useSelector } from 'react-redux';

export function serviceFetch(url: string, method: string, token: string) {
  fetch(url, {
    method: method,
    body: JSON.stringify({}),
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
