import axios from '../custom-axios/axios'

const CorpusService = {
  fetchCorpuses: () => {
    return axios.get('corpus/')
  },

  fetchCorpus: (id, page, perPage) => {
    const pageUrl = 'page=' + page
    const perPageUrl = '&perPage=' + perPage
    const url = `corpus/${id}?` + pageUrl + perPageUrl

    return axios.get(url)
  }
}

export default CorpusService
