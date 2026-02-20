import RequestLine from "../RequestLine/RequestLine";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { useState } from "react";
import "./RequestList.css";
import helpers from "../../services";
import { FaTrash } from "react-icons/fa";

const RequestList = ({
  requests,
  setSelectedRequest,
  setSelectedRequestID,
  selectedRequestID,
  searchTerm,
  setSearchTerm,
  binPath,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleConfirmDelete = () => {
    helpers.deleteAllRequests(binPath);
    setShowDeleteModal(false);
  };

  return (
    <div className="request-nav">
      <div className="request-options">
        <input
          type="search"
          name="requestSearch"
          className="request-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type to search..."
          aria-label="Search requests"
        />
      </div>
      <ul className="request-list">
        {requests.map((reqGroup) => {
          const requestDate = helpers.getRequestDate(reqGroup.dateReceived);
          return (
            <div key={reqGroup.dateReceived}>
              <div className="request-header">{requestDate}</div>
              {reqGroup.requests.map((req) => {
                return (
                  <RequestLine
                    key={req.id}
                    request={req}
                    setSelectedRequest={setSelectedRequest}
                    setSelectedRequestID={setSelectedRequestID}
                    selectedRequestID={selectedRequestID}
                    binPath={binPath}
                  />
                );
              })}
            </div>
          );
        })}
      </ul>
      {requests.length > 0 && (
        <>
          <div
            className="delete-all-button"
            onClick={() => setShowDeleteModal(true)}
          >
            <FaTrash /> DELETE ALL
          </div>

          <ConfirmModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleConfirmDelete}
            title="Delete All Requests?"
            message="Are you sure you want to delete all requests? This action cannot be undone."
            confirmButtonTitle="Delete All"
          />
        </>
      )}
    </div>
  );
};

export default RequestList;
