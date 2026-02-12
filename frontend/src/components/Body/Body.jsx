import ReactJson from "@microlink/react-json-view";
import JSONPretty from "react-json-pretty";
import "../Body/Body.css";
import { useState } from "react";

const Body = ({ body }) => {
  const [jsonView, setJsonView] = useState("raw");

  const selectView = (view) => {
    setJsonView(view);
  };

  return (
    <div className="body-container">
      <div className="body-title">Body</div>
      <div className="body-display-container">
        <div className="body-toggle-container">
          <div
            className={`body-toggle ${jsonView === "raw" ? "selected" : ""}`}
            onClick={() => selectView("raw")}
          >
            RAW
          </div>
          <div
            className={`body-toggle ${jsonView === "pretty" ? "selected" : ""}`}
            onClick={() => selectView("pretty")}
          >
            PRETTY
          </div>
          <div
            className={`body-toggle ${jsonView === "structured" ? "selected" : ""}`}
            onClick={() => selectView("structured")}
          >
            STRUCTURED
          </div>
        </div>
        <div className="body-display">
          {jsonView === "raw" && <pre>{JSON.stringify(body)}</pre>}
          {jsonView === "pretty" && <JSONPretty data={body} />}
          {jsonView === "structured" && (
            <ReactJson
              src={body}
              collapsed={false}
              displayDataTypes={false}
              theme="monokai"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
