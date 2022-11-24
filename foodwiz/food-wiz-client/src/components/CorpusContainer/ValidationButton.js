import React from "react";

import DocumentService from "../../repository/DocumentService";

function ValidationButton({ fetchDocuments, document, changeStatus }) {
  const changeDocumentValidation = (e) => {
    const documentId = e.target.value;
    DocumentService.validateDocument(document.id)
      .then((response) => {
        changeStatus(response.data);
        // fetchDocuments();
        // document.status = response.data.status;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return document.status.toLowerCase() === "validated" ? (
    <button
      className="btn btn-success"
      value={document.id}
      onClick={(e) => changeDocumentValidation(e)}
    >
      Validated
    </button>
  ) : (
    <button
      className="btn btn-danger"
      value={document.id}
      onClick={(e) => changeDocumentValidation(e)}
    >
      Not Validated
    </button>
  );
}

export default ValidationButton;
