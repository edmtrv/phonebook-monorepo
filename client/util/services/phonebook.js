import axios from 'axios';

const baseUrl = '/api/contacts';

const create = (newContact) => {
  const request = axios.post(baseUrl, newContact);
  return request.then((response) => response.data);
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const updateContact = (id, newData) => {
  const request = axios.put(`${baseUrl}/${id}`, newData);
  return request.then((response) => response.data);
};

const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then();
};

export default { create, getAll, updateContact, deleteContact };
