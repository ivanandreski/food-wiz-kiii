import React, { useState } from "react";
import Select from "react-select";

const AddTagSelector = ({ datasetTags, k, handleAdd, datasets }) => {
  const [selectedTag, setSelectedTag] = useState("");
  const [options, setOptions] = useState(
    datasetTags[k].slice(0, 60).map((tag) => {
      return {
        value: tag.id,
        label: tag.tagId + ": " + tag.tagName,
      };
    })
  );
  const onInputChange = (e) => {
    setOptions(
      datasetTags[k]
        .filter((option) => {
          return option.tagId.includes(e) || option.tagName.includes(e);
        })
        .slice(0, 100)
        .map((option) => {
          return {
            value: option.id,
            label: option.tagId + ": " + option.tagName,
          };
        })
    );
  };

  return (
    <div key={k} className="row">
      <div className="col-md-8">
        {datasets.filter((d) => d.id == k)[0]?.title || ""}:
        <Select
          name={k}
          onChange={(value) => setSelectedTag(value.value)}
          onInputChange={onInputChange}
          defaultValue={datasetTags[0]}
          options={options}
        />
      </div>
      <div className="col-4">
        <button
          disabled={selectedTag === ""}
          className="btn btn-primary w-100"
          style={{ marginTop: "24px" }}
          onClick={() => handleAdd(selectedTag)}
        >
          Add Tag
        </button>
      </div>
    </div>
  );
};

export default AddTagSelector;
