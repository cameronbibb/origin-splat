import ReactJson from "@microlink/react-json-view";
import JSONPretty from "react-json-pretty";

const Body = ({ body }) => {
  return (
    <>
      <b>{"Body"}</b>
      <pre>{JSON.stringify(body)}</pre>
      <ReactJson
        src={body}
        collapsed={false}
        displayDataTypes={false}
        theme="monokai"
      />

      <JSONPretty data={body} />
    </>
  );
};

export default Body;
