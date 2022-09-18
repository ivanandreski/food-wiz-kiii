import axios from '../custom-axios/axios'

const UploadService = {
  upload: (type, data) => {
    return axios.post(`${type.toLowerCase()}/convert`, data)
  }
}

export default UploadService
