import React, { useState } from "react";
import UploadCard from "./UploadCard";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import Swal from "sweetalert2";

const Upload = () => {
  const [isLoading, setLoading] = useState(false);

  const displayResponse = (response) => {
    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        html:
          '<pre style="text-align: left; white-space: pre-line;">' +
          response.message +
          "</pre>",
      });
    } else if (response.status === 500) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: response.message,
      });
    }
  };

  return isLoading ? (
    <LoadingAnimation />
  ) : (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <UploadCard
            title="Dataset"
            changeLoading={(isLoading) => setLoading(isLoading)}
            displayResponse={(response) => displayResponse(response)}
          />
        </div>
        <div className="col-md-6">
          <UploadCard
            title="Corpus"
            changeLoading={(isLoading) => setLoading(isLoading)}
            displayResponse={(response) => displayResponse(response)}
          />
        </div>
      </div>
      <div className="row">
        <div className="alert alert-warning col-12 mt-3 mb-0">
          All file types should be <b>.json</b>!
        </div>
        <div className="alert alert-warning col-12 mt-3 mb-0">
          Import datasets first, to successfully map relationships with the
          corpus!
        </div>
        <div className="alert alert-warning col-12 mt-3 mb-0">
          Attempting to upload an already existing dataset, results in an error!
        </div>
        <div className="alert alert-warning col-12 mt-3 mb-0">
          Attempting to upload a corpus file with an already existing name,
          results in an error!
        </div>
      </div>
    </div>
  );
};

export default Upload;
