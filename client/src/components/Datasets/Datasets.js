import React, { useEffect, useState } from "react";

import DatasetService from "../../repository/DatasetService";

import "./Datasets.css";

const Datasets = () => {
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    fetchDatasets();
  }, []);

  const fetchDatasets = () => {
    DatasetService.fetchDatasets().then((resp) => {
      setDatasets(resp.data);
    });
  };

  return (
    <div className="row" style={{ width: "100vw", margin: 0 }}>
      <div className="col-12" style={{ padding: 20 }}>
        <div className="col datasets-table">
          <div
            className="row table-header align-items-center"
            style={{ height: "30px" }}
          >
            <div className="col-1">ID</div>
            <div className="col-3">Title</div>
            <div className="col-3">Link</div>
            <div className="col-5">Description</div>
          </div>
          <div className="col table-rows" style={{ padding: 0 }}>
            {datasets.sort().map((d) => (
              <div key={d.id} className="row table-row">
                <div className="col-1">{d.id}</div>
                <div className="col-3">{d.title}</div>
                <div className="col-3">{d.link}</div>
                <div className="col-5">{d.description}</div>
              </div>
            ))}
          </div>
          <div>
            <h1>Helm test 1</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Datasets;
