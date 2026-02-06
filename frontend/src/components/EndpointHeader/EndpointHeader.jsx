import "./EndpointHeader.css";

const EndpointHeader = ({ binPath }) => {
  const endpoint = `${import.meta.env.VITE_API_URL}/api/endpoints/${binPath}`;

  const copyHandler = () => {
    navigator.clipboard.writeText(endpoint);
  };

  return (
    <div className="endpoint-header">
      <div className="endpoint-right">
        <div className="endpoint-container">
          <div className="endpoint-title">Endpoint</div>
          <div className="endpoint">{endpoint}</div>
        </div>
        <button onClick={copyHandler}>Copy</button>
      </div>
    </div>
  );
};

export default EndpointHeader;
