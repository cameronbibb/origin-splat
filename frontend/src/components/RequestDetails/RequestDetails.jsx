import SharedDetails from "../SharedDetails/SharedDetails";
import Headers from "../Headers/Headers";
import QueryParams from "../QueryParams/QueryParams";
import Body from "../Body/Body";
import "./RequestDetails.css";

const RequestDetails = ({ request }) => {
  // console.log(Object.entries(request.payload));

  /*

Shared details component(Method Path Time)
Header component
QueryParams component (if exists)
Body component (if exists)

*/

  return (
    <div className="request-details-container">
      <SharedDetails request={request} />
      <Headers type={"Headers"} obj={request.payload.headers} />
      {request.payload.query && (
        <QueryParams type={"Query Parameters"} obj={request.payload.query} />
      )}
      {request.payload.body && <Body body={request.payload.body} />}
    </div>
  );
};

export default RequestDetails;
