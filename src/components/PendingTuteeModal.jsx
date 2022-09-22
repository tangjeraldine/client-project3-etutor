import urlcat from "urlcat";
import axios from "axios";
import { useState } from "react";
const SERVER = import.meta.env.VITE_SERVER;
// const url = urlcat(SERVER, "/tutee");

const PendingTuteeModal = ({
  // user,
  open,
  tuteeDetails,
  setTuteeDetails,
  // tuteeDetails,
  // whatToOpen,
  tutorDetails,
  setIsOpen,
  setShowButton,
  showButton,
  setRenderTutees,
  renderTutees
}) => {
  if (!open) return null;

  const [updateTuteeSuccessful, setUpdateTuteeSuccessful] = useState(true);

  const url = urlcat(SERVER, `/tutee/updatetutee/acceptrejecttutee/${tuteeDetails.username}`);

  const handleAccept = () => {
    const updatedPendingTutors = tuteeDetails.pendingTutors.filter(
      (tutor) => tutor !== tutorDetails._id
    );

    const updatedTuteeDetails = tuteeDetails
    updatedTuteeDetails.pendingTutors = updatedPendingTutors;
    updatedTuteeDetails.myTutors = [
      ...updatedTuteeDetails.myTutors,
      tutorDetails._id,
    ];

    axios
      .put(url, updatedTuteeDetails)
      .then(({ data }) => {
        // setTuteeDetails(updatedTuteeDetails);
        setRenderTutees(!renderTutees)
        setUpdateTuteeSuccessful(true);
        setIsOpen(false);
      })
      .catch((error) => {
        if (
          error.response.data.error === "Unable to update Tutee." ||
          error.response.data.error === "Tutee not found."
        ) {
          setUpdateTuteeSuccessful(false);
        }
      });
    // send in updatedTuteeDetails as body findoneandupdate
  };

  const handleReject = () => {
    const updatedPendingTutors = tuteeDetails.pendingTutors.filter(
      (tutor) => tutor !== tutorDetails._id
    );

    const updatedTuteeDetails = tuteeDetails;
    updatedTuteeDetails.pendingTutors = updatedPendingTutors;

    axios
      .put(url, updatedTuteeDetails)
      .then(({ data }) => {
        setRenderTutees(!renderTutees)
        setUpdateTuteeSuccessful(true);
        setIsOpen(false);
      })
      .catch((error) => {
        if (
          error.response.data.error === "Unable to accept/reject Tutee." ||
          error.response.data.error === "Tutee not found."
        ) {
          setUpdateTuteeSuccessful(false);
        }
      });
  };

  const MODAL_STYLES = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#FFF",
    padding: "50px",
    zIndex: 1000,
  };

  const OVERLAY_STYLES = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,.7)",
    zIndex: 1000,
  };
  return (
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button
          class='block mt-2 px-4 py-2 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '
          onClick={() => {
            setShowButton(false);
            setIsOpen(false);
          }}>
          Close
        </button>
        <div className='font-bold' style={{ fontSize: "30px" }}>
          Tutee Details
        </div>
        <p className='font-bold'>Name: </p>
        <p>{tuteeDetails.fullName}</p>
        <p className='font-bold'>Class Level: </p>
        <p>{tuteeDetails.currentLevel}</p>
        <p className='font-bold'>Phone: </p>
        <p>{tuteeDetails.phone}</p>
        <p className='font-bold'>Region: </p>
        <p>{tuteeDetails.region}</p>
        <p className='font-bold'>Subjects: </p>
        <p>{tuteeDetails.subjects.join(", ")}</p>
        {showButton && (
          <>
            <button
              onClick={handleAccept}
              class='block mt-2 px-4 py-2 text-sm font-medium text-white transition bg-green-500 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '>
              Accept
            </button>
            <button
              onClick={handleReject}
              class='block mt-2 px-4 py-2 text-sm font-medium text-white transition bg-red-600 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '>
              Reject
            </button>
          </>
        )}

        {!updateTuteeSuccessful && <p>Unable to accept/reject Tutee.</p>}
      </div>
    </>
  );
};

export default PendingTuteeModal;
