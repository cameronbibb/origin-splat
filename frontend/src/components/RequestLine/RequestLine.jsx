import helpers from "../../services";
import "./RequestLine.css";

const RequestLine = ({ request, setSelectedRequest }) => {
  // const path = helpers.removeBinFromPath(request.http_path);
  const method = request.http_method;
  const time = request.received_at;

  function convertDbTimetoDateObj(databaseTime) {
    databaseTime =
      databaseTime.slice(0, 10) + "T" + databaseTime.slice(11, 23) + "Z";
    return new Date(databaseTime);
  }

  const onClick = async (event) => {
    event.preventDefault();
    const req = await helpers.getRequest(request.id);
    req.date = convertDbTimetoDateObj(time);
    setSelectedRequest(req);
  };

  return (
    <a href="#" onClick={onClick}>
      <li className="request_line">
        <span className="request_line_time">
          {convertDbTimetoDateObj(time).toLocaleTimeString()}
        </span>{" "}
        <span className="request_line_method">{method}</span>
      </li>
    </a>
  );
};

export default RequestLine;
