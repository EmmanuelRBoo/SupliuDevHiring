import axios from 'axios';

const url = 'https://tiao.supliu.com.br/api'

export const api = axios.create({
  baseURL: url
});