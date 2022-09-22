import urlcat from "urlcat";
import axios from "axios";
import { useState } from "react";
const SERVER = import.meta.env.VITE_SERVER;
const url = urlcat(SERVER, "/tutee");

const TutorModal = ({
  open,
  tutor,
  setIsOpen,
  setShowCancelButton,
  showCancelButton,
  tuteeDetails,
  whatToOpen,
  setTuteeDetails,
  addPendingButton,
  setAddPendingButton,
  user,
  setTutor,
  handleAddToPending,
  addmyTutor,
  showFavButton,
}) => {
  if (!open) return null;
  console.log(tutor);
  const updateTutorURL = urlcat(url, "/updatePendingTutee");
  const [updateTuteeSuccessful, setUpdateTuteeSuccessful] = useState(true);

  const handleReject = (tutor) => {
    console.log(tutor);
    const updatedPendingTutee = tuteeDetails.pendingTutors.filter(
      (tutor) => tutor === tuteeDetails.pendingTutors[whatToOpen]._id
    );
    console.log(updatedPendingTutee);

    console.log(tuteeDetails);
    const updatedTuteeDetails = tuteeDetails.pendingTutors.splice(0, 1);
    console.log(updatedTuteeDetails);

    axios
      .put(updateTutorURL, tuteeDetails)
      .then(({ data }) => {
        setTuteeDetails(tuteeDetails);
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
            setAddPendingButton(false);
            setShowCancelButton(false);
            setIsOpen(false);
          }}
        >
          close Modal
        </button>
        <div style={{ fontSize: "50px" }}>Tutor modal</div>
        <p>Name: {tutor.fullName}</p>
        <p>Class Level: {tutor.classLevel.join(", ")}</p>
        <p>Region: {tutor.region}</p>
        <p>Class Type: {tutor.classType.join(", ")}</p>
        <p>Rates: {tutor.rates}</p>
        <p>Subjects: {tutor.subjects.join(", ")}</p>
        <p>Education Background: {tutor.educationBackground}</p>
        <p> Teaching Experience: {tutor.teachingExperience}</p>

        {showFavButton && (
          <button
            style={{ backgroundColor: "lime" }}
            onClick={() => {
              setIsOpen(false);
              addmyTutor(tutor);
            }}
          >
            Add fav tutor
          </button>
        )}

        <br />

        {showCancelButton && (
          <>
            <button
              onClick={() => {
                setIsOpen(false);
                handleReject();
              }}
              style={{ backgroundColor: "red" }}
            >
              cancel
            </button>
          </>
        )}

        {addPendingButton && (
          <>
            <button
              onClick={() => {
                setIsOpen(false);
                handleAddToPending(tutor);
              }}
              style={{ backgroundColor: "lime" }}
            >
              add to pending
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default TutorModal;
