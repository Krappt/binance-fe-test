import { API_BASE } from '../config';

export default function request(url) {
  return fetch(`${API_BASE}/${url}`)
    .then((response) => response.json())
    .then((data) => data);
}
