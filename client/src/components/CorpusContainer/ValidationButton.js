import React from 'react'

import DocumentService from '../../repository/DocumentService'

function ValidationButton ({ fetchDocuments, document }) {
  const changeDocumentValidation = (e) => {
    const documentId = e.target.value
    DocumentService.validateDocument(documentId)
      .then((response) => {
        fetchDocuments()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return document.status === 'validated'
    ? (
      <button
        className='btn btn-success'
        value={document.id}
        onClick={(e) => changeDocumentValidation(e)}
      >
        Validated
      </button>
      )
    : (
      <button
        className='btn btn-danger'
        value={document.id}
        onClick={(e) => changeDocumentValidation(e)}
      >
        Not Validated
      </button>
      )
}

export default ValidationButton
