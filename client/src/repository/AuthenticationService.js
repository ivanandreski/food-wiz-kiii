import axios from '../custom-axios/axios'

const AuthenticationService = {
  signup: (email, password, fullName) => {
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    formData.append('fullName', fullName)

    return axios.post('users/signup', formData)
  },

  login: (email, password) => {
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    return axios.post('users/login', formData)
  },

  getUserEmail: () => {
    return axios.get('users/getEmail')
  },

  setAuthToken: (token) => {
    if (token !== null) axios.defaults.headers.common['x-access-token'] = token
    else delete axios.defaults.headers.common['x-access-token']
  }
}

export default AuthenticationService
