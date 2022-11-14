import axios from "../custom-axios/axios";

const DatasetService = {
  fetchDatasets: () => {
    return axios.get("dataset/");
  },

  fetchByCorpusId: (documentId) => {
    return axios.get(`corpus/${documentId}/datasets`);
  },
};

export default DatasetService;
