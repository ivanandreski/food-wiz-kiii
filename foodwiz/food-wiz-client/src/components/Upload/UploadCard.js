import React, { useState } from "react";

import UploadService from "../../repository/UploadService";

const UploadCard = (props) => {
  const { title, changeLoading, displayResponse } = props;
  let text;
  let multiple;
  if (title.startsWith("C")) {
    text = "your corpus file";
    multiple = false;
  } else {
    text = "your multiple dataset files";
    multiple = true;
  }
  const [selectedFiles, setSelectedFiles] = useState();
  const [disabled, setDisabled] = useState(true);
  const [btnClass, setBtnClass] = useState("btn btn-primary disabled");
  let message = "";

  const onFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
    if (files.length > 0) {
      setDisabled(false);
      setBtnClass("btn btn-primary");
    } else {
      setDisabled(true);
      setBtnClass("btn btn-primary disabled");
    }
  };

  const submitFiles = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let i = 0; i < selectedFiles.length; i++)
      data.append("file[]", selectedFiles[i]);
    changeLoading(true);
    UploadService.upload(title, data)
      .then((res) => {
        changeLoading(false);
        message = { message: res.data, status: res.status };
      })
      .catch((error) => {
        changeLoading(false);
        console.log(error);
        message = { message: error.message, status: 500 };
      })
      .finally(() => {
        displayResponse(message);
      });
  };

  const getSelectedFiles = () => {
    if (selectedFiles) {
      return Array.from(selectedFiles).map((f, i) => (
        <li key={i} className="list-group-item bg-light text-dark">
          {f.name}
        </li>
      ));
    }
    return (
      <li className="list-group-item bg-light text-dark">No files selected</li>
    );
  };

  return (
    <div className="card" style={{ marginTop: "10px" }}>
      <div className="card-body bg-secondary text-white">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Import {text}</p>
      </div>
      <ul className="list-group list-group-flush">{getSelectedFiles()}</ul>
      <div className="card-body bg-light">
        <div className="row">
          <div className=" col-6">
            <label className="btn btn-secondary" style={{ width: "100%" }}>
              Select File
              <input
                type="file"
                multiple={multiple}
                onChange={onFileChange}
                hidden
              />
            </label>
          </div>
          <div className=" col-6">
            <label className={btnClass} style={{ width: "100%" }}>
              Upload
              <input
                type="submit"
                disabled={disabled}
                onClick={submitFiles}
                hidden
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCard;
