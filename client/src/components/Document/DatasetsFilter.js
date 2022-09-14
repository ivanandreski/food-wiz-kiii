import React, { useEffect, useState } from "react";

import DatasetService from "../../repository/DatasetService";

const DatasetsFilter = ({
  documentId,
  datasetString,
  setDatasetString,
  datasets,
  checkedDatasets,
  setCheckedDatasets,
}) => {
  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.checked;

    let temp = { ...checkedDatasets };
    temp[key] = value;

    let str = "";
    Object.keys(temp).forEach((key) => {
      if (temp[key]) {
        str += key + ",";
      }
    });
    setDatasetString(str);
    setCheckedDatasets(temp);
  };

  const renderSelects = () => {
    return datasets.map((dataset, i) => (
      <span key={i} className="mr-2">
        <input
          id={dataset.id}
          className="mr-1"
          type="checkbox"
          name="datasets"
          //   checked={checkedDatasets[dataset.id]}
          defaultChecked={true}
          onChange={handleChange}
        />
        <span className="text-capitalize"> {dataset.title}</span>
      </span>
    ));
  };

  return (
    <div className="col-12">
      Active Annotation Datasets: {renderSelects()}
      <hr />
    </div>
  );
};

export default DatasetsFilter;
