import React, { useEffect, useState } from 'react'

import DatasetService from '../../repository/DatasetService'

const SourceFilter = ({
  setSourceString,
  sources,
  checkedSources,
  setCheckedSources
}) => {
  const handleChange = (e) => {
    const key = e.target.id
    const value = e.target.checked

    const temp = { ...checkedSources }
    temp[key] = value

    let str = ''
    Object.keys(temp).forEach((key) => {
      if (temp[key]) {
        str += key + ','
      }
    })
    setSourceString(str)
    setCheckedSources(temp)
  }

  const renderSelects = () => {
    return sources.map((source, i) => (
      <span key={i} className='mr-2'>
        <input
          id={source}
          className='mr-1'
          type='checkbox'
          name='datasets'
          //   checked={checkedDatasets[dataset.id]}
          defaultChecked
          onChange={handleChange}
        />
        <span className='text-capitalize'> {source}</span>
      </span>
    ))
  }

  return (
    <div className='col-12'>
      Active Annotation Sources: {renderSelects()}
      <hr />
    </div>
  )
}

export default SourceFilter
