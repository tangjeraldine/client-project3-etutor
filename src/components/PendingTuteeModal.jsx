import urlcat from "urlcat";
import axios from "axios";
import { useState } from "react";
const SERVER = import.meta.env.VITE_SERVER;
const url = urlcat(SERVER, "/tutee");

const PendingTuteeModal = ({
  open,
  eachTuteeDetails,
  onClose,
  user,
  setTuteeDetails,
  tuteeDetails,
  whatToOpen,
  tutorDetails,
  setIsOpen,
  setShowButton,
  showButton,
}) => {
  if (!open) return null;

  const [updateTuteeSuccessful, setUpdateTuteeSuccessful] = useState(true);

  const updateTutorURL = urlcat(url, "/updatePendingTutee");
  const handleAccept = () => {
    const updatedPendingTutors = eachTuteeDetails.pendingTutors.filter(
      (tutor) => tutor !== tutorDetails._id
    );
    console.log(updatedPendingTutors);

    const updatedTuteeDetails = [...tuteeDetails];
    updatedTuteeDetails[whatToOpen].pendingTutors = updatedPendingTutors;
    updatedTuteeDetails[whatToOpen].myTutors = [
      ...updatedTuteeDetails[whatToOpen].myTutors,
      tutorDetails._id,
    ];
    console.log(updatedTuteeDetails);

    axios
      .put(updateTutorURL, updatedTuteeDetails[whatToOpen])
      .then(({ data }) => {
        console.log(data);
        console.log(updatedTuteeDetails);
        setTuteeDetails(updatedTuteeDetails);
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
    // send in updatedTuteeDetails as body findoneandupdate
  };

  const handleReject = () => {
    const updatedPendingTutors = eachTuteeDetails.pendingTutors.filter(
      (tutor) => tutor !== tutorDetails._id
    );
    console.log(updatedPendingTutors);
    const updatedTuteeDetails = [...tuteeDetails];
    updatedTuteeDetails[whatToOpen].pendingTutors = updatedPendingTutors;

    axios
      .put(updateTutorURL, updatedTuteeDetails[whatToOpen])
      .then(({ data }) => {
        console.log(data);
        console.log(updatedTuteeDetails);
        setTuteeDetails(updatedTuteeDetails);
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
    backgroundColor: "rgba(0,0,0,.7",
    zIndex: 1000,
  };
  return (
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button
          style={{ backgroundColor: "lime" }}
          onClick={() => {
            setShowButton(false);
            setIsOpen(false);
          }}
        >
          close Modal
        </button>
        <div style={{ fontSize: "30px" }}>Pending Tutees</div>
        <p>Name: {eachTuteeDetails.fullName}</p>
        <p> Class Level: {eachTuteeDetails.currentLevel}</p>
        <p>Phone: {eachTuteeDetails.phone}</p>
        <p>Region: {eachTuteeDetails.region}</p>
        <p>Subjects: {eachTuteeDetails.subjects.join(", ")}</p>
        <br />
        <br />
        {showButton && (
          <>
            <button onClick={handleAccept} style={{ backgroundColor: "lime" }}>
              accept
            </button>
            <button onClick={handleReject} style={{ backgroundColor: "red" }}>
              reject
            </button>
          </>
        )}

        {!updateTuteeSuccessful && <p>Unable to accept/reject Tutee.</p>}
      </div>
    </>
  );
};

export default PendingTuteeModal;
