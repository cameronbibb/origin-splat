import "./EndpointHeader.css";

const EndpointHeader = ({ binPath }) => {
  const endpoint = `${import.meta.env.VITE_API_URL}/api/endpoints/${binPath}`;

  const copyHandler = () => {
    navigator.clipboard.writeText(endpoint);
  };

  return (
    <div className="endpoint-header">
      <h3> Endpoint: </h3>
      <span className="endpoint_container">{endpoint}</span>
      <button className="copy_button" onClick={copyHandler}>
        Copy
      </button>
    </div>
  );
};

export default EndpointHeader;
