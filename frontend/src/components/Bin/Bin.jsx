import { socket } from "../../socket";
import EndpointHeader from "../EndpointHeader/EndpointHeader";
import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    socket.emit("joinBinRoom", bin_path);

    (async () => {
      const list = await helpers.getRequestList(bin_path);
      const converted = list.map((request) => ({
        ...request,
        received_at: helpers.convertDbTimetoDateObj(request.received_at),
      }));
      setRequestList(converted);
    })();

    // ----- Socket Event Handlers ----------------------- //
    const handleNewRequest = (newRequest) => {
      const newRequestMod = {
        ...newRequest,
        received_at: helpers.convertDbTimetoDateObj(newRequest.received_at),
      };
      setRequestList((prev) => [newRequestMod, ...prev]);
    };

    const handleRequestDeleted = (requestId) => {
      setRequestList((prev) =>
        prev.filter((req) => req.id !== Number(requestId)),
      );
      setSelectedRequestID((prev) => {
        if (prev === Number(requestId)) {
          setSelectedRequest(null);
          return null;
        }
        return prev;
      });
    };

    const handleAllRequestsDeleted = () => {
      setRequestList([]);
      setSelectedRequest(null);
      setSelectedRequestID(null);
    };
    // ------------------------------------------------ //

    socket.on("newRequest", handleNewRequest);
    socket.on("requestDeleted", handleRequestDeleted);
    socket.on("allRequestsDeleted", handleAllRequestsDeleted);

    return () => {
      socket.off("newRequest", handleNewRequest);
      socket.off("requestDeleted", handleRequestDeleted);
      socket.off("allRequestsDeleted", handleAllRequestsDeleted);
      socket.emit("leaveBinRoom", bin_path);
    };
  }, [bin_path]);

  useEffect(() => {
    const selectFirstRequest = async () => {
      if (requestList.length > 0 && !selectedRequest) {
        const req = await helpers.getRequest(requestList[0].id);
        req.date = requestList[0].received_at;
        setSelectedRequest(req);
        setSelectedRequestID(requestList[0].id);
      }
    };

    selectFirstRequest();
  }, [requestList, selectedRequest]);

  const groupedRequests = useMemo(() => {
    const filteredRequestList = requestList.filter((request) => {
      return (
        helpers
          .removeBinFromPath(request.http_path)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        request.http_method.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    return helpers.groupRequestsByDate(filteredRequestList);
  }, [requestList, searchTerm]);

  return (
    <>
      <div className="bin_page">
        <header className="banner">
          <img src={banner_logo} alt="Origin*" className="logo_banner" />
        </header>
        <EndpointHeader binPath={bin_path} />
        <div className="bin_container">
          <RequestList
            requests={groupedRequests}
            setSelectedRequest={setSelectedRequest}
            setSelectedRequestID={setSelectedRequestID}
            selectedRequestID={selectedRequestID}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            binPath={bin_path}
          />
          <main className="bin_details">
            {!selectedRequest && (
              <div className="get-started-instructions">
                <h3>No requests yet</h3>
                <p>Send a request to your endpoint to get started:</p>
                <code>
                  curl -X POST {import.meta.env.VITE_API_URL}
                  /api/endpoints/{bin_path}
                </code>
                <p>Requests will appear here in real time.</p>
              </div>
            )}
            {selectedRequest && <RequestDetails request={selectedRequest} />}
          </main>
        </div>
      </div>
    </>
  );
};

export default Bin;
