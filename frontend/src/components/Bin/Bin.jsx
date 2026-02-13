import { socket } from "../../socket";
import EndpointHeader from "../EndpointHeader/EndpointHeader";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import helpers from "../../services";
import RequestList from "../RequestList/RequestList";
import RequestDetails from "../RequestDetails/RequestDetails";
import "./Bin.css";
import banner_logo from "../../assets/origin_logo_white.svg";

const Bin = () => {
  const { bin_path } = useParams();
  const [requestList, setRequestList] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedRequestID, setSelectedRequestID] = useState(null);

  useEffect(() => {
    socket.emit("joinBinRoom", bin_path);

    const requestDetails = async () => {
      const list = await helpers.getRequestList(bin_path);
      await setRequestList(list);
    };
    requestDetails();

    const handleNewRequest = (newRequest) => {
      setRequestList((prev) => [...prev, newRequest]);
    };

    socket.on("newRequest", handleNewRequest);

    return () => {
      socket.off("newRequest", handleNewRequest);
      socket.emit("leaveBinRoom", bin_path);
    };
  }, [bin_path]);

  useEffect(() => {
    const selectFirstRequest = async () => {
      if (requestList.length > 0 && !selectedRequest) {
        const req = await helpers.getRequest(requestList[0].id);
        req.date = helpers.convertDbTimetoDateObj(requestList[0].received_at);
        setSelectedRequest(req);
        setSelectedRequestID(requestList[0].id);
      }
    };

    selectFirstRequest();
  }, [requestList, selectedRequest]);

  return (
    <>
      <div className="bin_page">
        <div className="banner">
          <img src={banner_logo} alt="Origin*" className="logo_banner" />
        </div>
        <EndpointHeader binPath={bin_path} />
        <div className="bin_container">
          <RequestList
            requests={requestList}
            setSelectedRequest={setSelectedRequest}
            setSelectedRequestID={setSelectedRequestID}
            selectedRequestID={selectedRequestID}
          />
          <div className="bin_details">
            {selectedRequest && <RequestDetails request={selectedRequest} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Bin;
