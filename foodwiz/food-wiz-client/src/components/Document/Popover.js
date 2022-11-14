import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Swal from "sweetalert2";

import AddTagSelector from "./AddTagSelector";
import DatasetTagService from "../../repository/DatasetTagService";

const BasicPopover = ({
  token,
  tokens,
  datasetTags,
  documentId,
  datasetString,
  setDatasetString,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function getClass() {
    return token.tags.length > 0 ? " badge text-bg-success" : "";
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleAdd = (tagId) => {
    if (sessionStorage.getItem("token") === null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must be logged in for this feature",
      });
    } else {
      let formData = new FormData();
      formData.append("start", token.start);
      formData.append("text", token.text);
      formData.append("documentId", documentId);

      DatasetTagService.addTag(tagId, formData)
        .then((response) => {
          const temp = datasetString;
          setDatasetString("");
          setDatasetString(temp);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleDelete = (tagId) => {
    if (sessionStorage.getItem("token") === null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must be logged in for this feature",
      });
    } else {
      let formData = new FormData();
      formData.append("start", token.start);
      formData.append("text", token.text);
      formData.append("documentId", documentId);

      DatasetTagService.markDelete(tagId, formData)
        .then((response) => {
          const temp = datasetString;
          setDatasetString("");
          setDatasetString(temp);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <span
        className={getClass()}
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        {token.text}
      </span>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="text-body " style={{ width: 400, height: 560 }}>
          <div
            className="p-1"
            style={{ width: "100%", backgroundColor: "lightgrey" }}
          >
            <b>{token.text}</b>
          </div>
          <div className="p-1">
            <b>Datasets:</b>
            <div className="row-12 mb-1 " style={{ width: "100%" }}>
              {token.tags.map((it, ix) => (
                <div
                  key={ix}
                  className={
                    it.removed
                      ? "badge m-1 text-bg-danger"
                      : "badge m-1 text-bg-secondary"
                  }
                  title={`Dataset: ${it.dataset}, Source: ${it.source}, ${
                    it.removed ? "Removed by: " + it.removedBy : ""
                  }`}
                >
                  [{it.link}] {it.token}{" "}
                  <i
                    className="fa fa-fw fa-remove clickable"
                    onClick={() => handleDelete(it.link)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="p-2">
            {Object.keys(datasetTags).map((key) => (
              <AddTagSelector
                datasetTags={datasetTags}
                k={key}
                key={key}
                handleAdd={handleAdd}
              />
            ))}
          </div>
        </div>
      </Popover>
    </>
  );
};

export default BasicPopover;
