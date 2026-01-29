const EndpointHeader = ({ binPath }) => {
  const endpoint = `${import.meta.env.VITE_API_URL}/api/endpoints/${binPath}`;

  const copyHandler = () => {
    navigator.clipboard.writeText(endpoint);
  };

  return (
    <div className="endpoint-header">
      <button className="copy_style" onClick={copyHandler}>
        Copy{" "}
      </button>
      <span> Endpoint: {endpoint}</span>
    </div>
  );
};

export default EndpointHeader;
