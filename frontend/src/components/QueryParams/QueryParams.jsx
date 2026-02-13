import { useState } from "react";
import "./QueryParams.css";

const QueryParams = ({ obj, type }) => {
  const array = Object.entries(obj);

  const [displayQueryParams, setDisplayQueryParams] = useState(false);

  const toggleQueryParams = () => {
    setDisplayQueryParams((prev) => !prev);
  };

  const copyQueryParams = (event) => {
    event.stopPropagation();
    const queryParamsText = array
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
    navigator.clipboard.writeText(queryParamsText);
  };

  const handleCopyKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      copyQueryParams(event);
    }
  };

  return (
    <div className="query-params-container">
      <div className="query-params-title">{type}</div>
      <div className="query-params-display">
        <div className="query-params-toggle" onClick={toggleQueryParams}>
          <div>
            <span>{displayQueryParams ? "▼" : "▶"}</span>({array.length}) query
            parameters
          </div>
          <span
            className="copy-link"
            onClick={copyQueryParams}
            onKeyDown={handleCopyKeyDown}
            role="button"
            tabIndex="0"
          >
            copy
          </span>
        </div>
        {displayQueryParams && (
          <div className="query-params-list">
            {array.map((nestedArr, idx) => {
              return (
                <div key={idx} className="query-params-row">
                  <div className="query-params-header">{nestedArr[0]}:</div>
                  <div className="query-params-value">{nestedArr[1]}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryParams;
