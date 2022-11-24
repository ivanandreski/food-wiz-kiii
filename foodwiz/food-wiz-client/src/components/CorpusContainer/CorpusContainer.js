import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

import CorpusService from "../../repository/CorpusService";
import DocumentRow from "./DocumentRow";

const CorpusContainer = () => {
  const [documents, setDocuments] = useState([]);
  const [pageCount, setPageCount] = useState();
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [page, setPage] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    fetchDocuments();
  }, [page, itemsPerPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchDocuments = () => {
    CorpusService.fetchCorpus(id, page, itemsPerPage).then((resp) => {
      setDocuments(resp.data.content);
      setPageCount(resp.data.totalPages - 1);
      setPage(resp.data.number);
    });
  };

  const renderDocuments = () => {
    return documents
      .sort()
      .map((document, i) => (
        <DocumentRow
          key={i}
          i={i}
          document={document}
          fetchDocuments={fetchDocuments}
          changeStatus={changeStatus}
        />
      ));
  };

  const changeStatus = (document) => {
    const newDocuments = [];
    for (let i = 0; i < documents.length; i++) {
      if (documents[i].id === document.id) {
        newDocuments.push(document);
      } else {
        newDocuments.push(documents[i]);
      }
    }
    setDocuments(newDocuments);
  };

  const handlePerPageChange = (e) => {
    const p = e.target.value;
    setItemsPerPage(p);
    setPage(1);
  };

  const handlePageClick = (e) => {
    const p = e.selected + 1;
    setPage(p);
  };

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="mr-2">
          <select
            className="form-control"
            onChange={(e) => handlePerPageChange(e)}
            value={itemsPerPage}
          >
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="48">48</option>
          </select>
        </div>
        <div className="mr-2">
          <ReactPaginate
            forcePage={page - 1}
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="Previous"
            renderOnZeroPageCount={null}
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            activeClassName="active"
          />
        </div>
      </div>

      <div className="row">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Status</th>
              <th scope="col">Validation</th>
            </tr>
          </thead>
          <tbody>{renderDocuments()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default CorpusContainer;
