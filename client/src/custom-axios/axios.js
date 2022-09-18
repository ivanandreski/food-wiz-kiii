import axios from 'axios'

const { REACT_APP_BACKEND_URL } = process.env

const instance = axios.create({
  // baseURL: 'http://localhost:5000',
  // baseURL: 'http://wp.finki.ukim.mk/fbw/',
  baseURL: `${REACT_APP_BACKEND_URL}/api`,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

export default instance
