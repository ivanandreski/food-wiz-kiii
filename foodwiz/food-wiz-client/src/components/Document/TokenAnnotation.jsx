import React from "react";
import { useParams } from "react-router-dom";

const TokenAnnotation = (props) => {
  const documentId = useParams().id;
  const token = props.token;

  if (!token) return <></>;

  const tags = token.tags?.map((it, ix) => (
    <span key={ix} className="badge text-bg-secondary" title={it.dataset}>
      [{it.link}] {it.token}{" "}
      <i
        className="fa fa-fw fa-remove clickable"
        onClick={() => onTagRemove(it.dataset, it.link)}
      />
    </span>
  ));

  return (
    <span
      className="text-body"
      style={{
        clear: "both",
        float: "left",
        width: "300px",
        minHeight: "150px",
        position: "absolute",
        padding: "3px",
        border: "1px solid #eee",
        marginTop: "5px",
        backgroundColor: "white",
        textAlign: "left",
        color: "black",
      }}
    >
      <b>{token.text}:</b>
      <div>{tags}</div>
      <p>
        For each dataset linked to the corpus, we need to display a combo with
        the tags. Ex:
      </p>
      <div>
        Hansard:{" "}
        <select>
          <option>A.01.h FOOD</option>
          <option>A.01.g Beverage</option>
        </select>
      </div>
    </span>
  );

  function onTagSelect(datasetId, tagLink) {
    console.log(datasetId, tagLink);
  }

  function onTagRemove(datasetId, tagLink) {
    // console.log(datasetId, tagLink);
  }
};

export default TokenAnnotation;
