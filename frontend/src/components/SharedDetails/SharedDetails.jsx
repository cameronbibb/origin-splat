import helpers from "../../services";
import "./SharedDetails.css";

const SharedDetails = ({ request }) => {
  return (
    <>
      <div className="shared-details">
        <div className="shared-details-type">HTTP REQUEST</div>
        <div>{request.date.toJSON()}</div>
      </div>
      <div className="shared-details-details">
        <div className="title">Details</div>
        <div
          className={`method method-${request.payload.method.toLowerCase()}`}
        >
          {request.payload.method}
        </div>
        <div className="path">
          {helpers.removeBinFromPath(request.payload.path)}
        </div>
      </div>
    </>
  );
};

export default SharedDetails;
