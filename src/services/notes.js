import axios from "axios";
const baseUrl = `http://localhost:${process.env.PORT || 3001}/notes`;

const getAll = () => {
  const req = axios.get(baseUrl);

  return req.then(res => res.data);
}

const create = newObject => {
  const req = axios.post( baseUrl, newObject );
  return req.then( res => res.data );
}

const update = (id, newObject) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject);
  return req.then( res => res.data );
}

const dltNote = (id) => {
  
}

const noteService = { getAll, create, update };

export default noteService;