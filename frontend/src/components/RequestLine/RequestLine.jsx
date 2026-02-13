import helpers from "../../services";
import "./RequestLine.css";

const RequestLine = ({
  request,
  setSelectedRequest,
  setSelectedRequestID,
  selectedRequestID,
}) => {
  const path = helpers.removeBinFromPath(request.http_path);
  const method = request.http_method;
  const time = request.received_at;

  const onClick = async (event) => {
    event.preventDefault();
    const req = await helpers.getRequest(request.id);
    req.date = helpers.convertDbTimetoDateObj(time);
    setSelectedRequest(req);
    setSelectedRequestID(request.id);
  };

  return (
    <li>
      <a
        href="#"
        onClick={onClick}
        className={`request_line ${selectedRequestID === request.id ? "selected" : ""}`}
      >
        <div className="request_line_time">
          {helpers.convertDbTimetoDateObj(time).toLocaleTimeString()}
        </div>
        <div className={`request_line_method method-${method.toLowerCase()}`}>
          {method}
        </div>
        <div className="request_line_path">{path}</div>
      </a>
    </li>
  );
};

export default RequestLine;
