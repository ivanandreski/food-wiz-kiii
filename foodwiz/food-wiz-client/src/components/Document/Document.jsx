import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BasicPopover from "./Popover";
import DocumentService from "../../repository/DocumentService";
import DatasetService from "../../repository/DatasetService";
import DatasetsFilter from "./DatasetsFilter";
import DatasetTagService from "../../repository/DatasetTagService";
import SourceFilter from "./SourceFilter";

const Document = () => {
  const { id } = useParams();
  const [document, setDocument] = useState({});
  const [tokens, setTokens] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [datasetString, setDatasetString] = useState("empty");
  const [checkedDatasets, setCheckedDatasets] = useState({});
  const [datasetTags, setDatasetTags] = useState({});
  const [sources, setSources] = useState([]);
  const [sourceString, setSourceString] = useState("empty");
  const [checkedSources, setCheckedSources] = useState({});

  useEffect(() => {
    fetchDocument();
    fetchDatasets();
    fetchDatasetTags();
    fetchSources();
  }, [datasetString, sourceString]);

  const fetchDocument = () => {
    DocumentService.fetchDocument(id, datasetString, sourceString).then(
      (resp) => {
        setDocument(resp.data.document);
        setTokens(JSON.parse(resp.data.tokens));
      }
    );
  };

  const fetchDatasets = () => {
    DatasetService.fetchByCorpusId(id).then((resp) => {
      setDatasets(resp.data.datasets);
      let temp = {};
      for (let i = 0; i < resp.data.datasets.length; i++) {
        temp[resp.data.datasets[i].id] = true;
      }

      if (datasetString === "empty") {
        setDatasetString(resp.data.datasetString);
        setCheckedDatasets(temp);
      }
    });
  };
  const fetchSources = () => {
    DocumentService.fetchSources().then((resp) => {
      setSources(resp.data);
      let temp = {};
      let tempString = "";
      for (let i = 0; i < resp.data.length; i++) {
        temp[resp.data[i]] = true;
        tempString += resp.data[i] + ",";
      }
      if (sourceString === "empty") {
        setSourceString(tempString);
        setCheckedSources(temp);
      }
    });
  };

  const fetchDatasetTags = () => {
    console.log(datasetString);
    DatasetTagService.fetchDatasetTags(datasetString)
      .then((response) => {
        setDatasetTags(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const tokenSpans = tokens.map((t, ix) => (
    <BasicPopover
      key={ix}
      token={t}
      datasetTags={datasetTags}
      documentId={id}
      datasetString={datasetString}
      setDatasetString={setDatasetString}
    />
  ));

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 pt-1">
          <h1>Document: {id}</h1>
          <DatasetsFilter
            documentId={id}
            datasetString={datasetString}
            setDatasetString={setDatasetString}
            datasets={datasets}
            checkedDatasets={checkedDatasets}
            setCheckedDatasets={setCheckedDatasets}
          />
          <SourceFilter
            setSourceString={setSourceString}
            sources={sources}
            checkedSources={checkedSources}
            setCheckedSources={setCheckedSources}
          />
          <div style={{ textAlign: "left" }}>{tokenSpans}</div>
        </div>
      </div>
    </div>
  );
};

export default Document;
