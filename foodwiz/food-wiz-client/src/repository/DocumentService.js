import axios from "../custom-axios/axios";

const DocumentService = {
  fetchDocument: (id, datasetString, sourceString) => {
    if (datasetString === undefined) datasetString = "";
    if (sourceString === undefined) sourceString = "";
    return axios.get(
      `document/${id}?datasets=${datasetString}&sources=${sourceString}`
    );
  },

  validateDocument: (documentId) => {
    return axios.put(`/document/${documentId}/validate`);
  },

  fetchSources: () => {
    return axios.get(`document/sources`);
  },
};

export default DocumentService;
