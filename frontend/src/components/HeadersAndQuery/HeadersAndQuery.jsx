import { useState } from "react";
import "./HeadersAndQuery.css";

const HeadersAndQuery = ({ obj, type }) => {
  const array = Object.entries(obj);

  const [displayHeaders, setDisplayHeaders] = useState(false);

  const toggleHeaders = () => {
    setDisplayHeaders((prev) => !prev);
  };

  const copyHeaders = (event) => {
    event.stopPropagation();
    const headersText = array
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
    navigator.clipboard.writeText(headersText);
  };

  const handleCopyKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      copyHeaders(event);
    }
  };

  return (
    <div className="headers-and-query-container">
      <div className="headers-title">{type}</div>
      <div className="headers-display">
        <div className="headers-toggle" onClick={toggleHeaders}>
          <div>
            <span>{displayHeaders ? "▼" : "▶"}</span>({array.length}) headers
          </div>
          <span
            className="copy-link"
            onClick={copyHeaders}
            onKeyDown={handleCopyKeyDown}
            role="button"
            tabIndex="0"
          >
            copy
          </span>
        </div>
        {displayHeaders && (
          <div className="headers-list">
            {array.map((nestedArr, idx) => {
              return (
                <div key={idx} className="header-row">
                  <div className="header-header">{nestedArr[0]}:</div>
                  <div className="header-value">{nestedArr[1]}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeadersAndQuery;
