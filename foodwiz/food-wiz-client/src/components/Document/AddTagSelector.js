import React, { useState } from "react";
import Select from "react-select";

const AddTagSelector = ({ datasetTags, k, handleAdd }) => {
  const [selectedTag, setSelectedTag] = useState("");
  const [options, setOptions] = useState(
    datasetTags[k].slice(0, 60).map((tag) => {
      return {
        value: tag.id,
        label: tag.id + ": " + tag.tag_name,
      };
    })
  );
  const onInputChange = (e) => {
    setOptions(
      datasetTags[k]
        .filter((option) => {
          if (option.id.includes(e) || option.tag_name.includes(e)) return true;
        })
        .slice(0, 100)
        .map((option) => {
          return {
            value: option.id,
            label: option.id + ": " + option.tag_name,
          };
        })
    );
  };

  return (
    <div key={k} className="row">
      <div className="col-md-8">
        {k}:
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
