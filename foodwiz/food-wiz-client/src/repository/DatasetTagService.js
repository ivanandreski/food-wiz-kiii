import axios from "../custom-axios/axios";

const DatasetTagService = {
  fetchDatasetTags: (datasetString) => {
    return axios.get(`/datasetTag?datasets=${datasetString}`);
  },

  addTag: (tagId, formData) => {
    return axios.put(`/annotationSpanDatasetTag/${tagId}`, formData);
  },

  markDelete: (tagId, formData) => {
    return axios.put(`/annotationSpanDatasetTag/markDelete/${tagId}`, formData);
  },
};

export default DatasetTagService;
