import axios from "../custom-axios/axios";

const CorpusService = {
  fetchCorpuses: () => {
    return axios.get("corpus");
  },

  fetchCorpus: (id, page, perPage) => {
    let pageUrl = "page=" + page;
    let perPageUrl = "&perPage=" + perPage;
    let url = `corpus/${id}?` + pageUrl + perPageUrl;
    
    return axios.get(url);
  },
};

export default CorpusService;
