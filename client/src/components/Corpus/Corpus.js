import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import CorpusService from '../../repository/CorpusService'

import './Corpus.css'

const Corpus = () => {
  const [corpus, setCorpus] = useState([])

  useEffect(() => {
    fetchCorpus()
  }, [])

  const fetchCorpus = () => {
    CorpusService.fetchCorpuses().then((resp) => {
      setCorpus(resp.data)
    })
  }

  return (
    <div className='row' style={{ width: '100vw', margin: 0 }}>
      <div className='col-12' style={{ padding: 20 }}>
        <div className='col corpus-table'>
          <div
            className='row table-header align-items-center'
            style={{ height: '30px' }}
          >
            <div className='col-1'>ID</div>
            <div className='col-3'>Title</div>
            <div className='col-3'>Link</div>
            <div className='col-5'>Description</div>
          </div>
          <div className='col table-rows' style={{ padding: 0 }}>
            {corpus.sort().map((c) => (
              <Link key={c.id} to={`/corpus/${c.id}`}>
                <div className='row table-row'>
                  <div className='col-1'>{c.id}</div>
                  <div className='col-3'>{c.title}</div>
                  <div className='col-3'>{c.link}</div>
                  <div className='col-5'>{c.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Corpus
