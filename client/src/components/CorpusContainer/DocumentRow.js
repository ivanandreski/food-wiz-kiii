import React from 'react'
import { Link } from 'react-router-dom'

import ValidationButton from './ValidationButton'

function DocumentRow ({ i, document, fetchDocuments }) {
  return (
    <tr>
      <th scope='row'>{i + 1}</th>
      <td>
        <Link
          to={`/document/${document.id}`}
          className='btn btn-primary'
          style={{ width: '150px' }}
        >
          {document.id}
        </Link>
      </td>
      <td className='text-capitalize font-weight-bold'>{document.status}</td>
      <td className='text-capitalize font-weight-bold'>
        <ValidationButton document={document} fetchDocuments={fetchDocuments} />
      </td>
    </tr>
  )
}

export default DocumentRow
