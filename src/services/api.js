import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

export function createData(token) {
    return { headers: { Authorization: `Bearer ${token}` } };
}

export function signin(body) {
    const promise = axios.post(`${URL}/`, body);
    return promise;
}

export function signup(body) {
    const promise = axios.post(`${URL}/cadastro`, body);
    return promise;
}

export function getTransactions(token) {
    const data = createData(token);
    const promise = axios.get(`${URL}/home`, data);
    return promise;
}

export function postTransactions(chooseOperation, body, token) {
    const data = createData(token);
    const promise = axios.post(`${URL}/nova-transacao/${chooseOperation}`, body, data);
    return promise;
}