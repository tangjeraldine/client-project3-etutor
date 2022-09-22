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
          class='block mt-2 px-4 py-2 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '
          onClick={() => {
            setAddPendingButton(false);
            setShowCancelButton(false);
            setIsOpen(false);
          }}>
          Close This Window
        </button>
        <div style={{ fontSize: "30px" }} className='font-bold text-black mt-3'>
          Tutor Details
        </div>
        <p className='font-bold mt-2'>Name: </p>
        <p>{tutor.fullName}</p>
        <p className='font-bold mt-2'>Class Level(s): </p>
        <p>{tutor.classLevel.join(", ")}</p>
        <p className='font-bold mt-2'>Region: </p>
        <p>{tutor.region}</p>
        <p className='font-bold mt-2'>Class Type(s): </p>
        <p>{tutor.classType.join(", ")}</p>
        <p className='font-bold mt-2'>Rate per lesson: </p>
        <p>${tutor.rates}</p>
        <p className='font-bold mt-2'>Subject(s): </p>
        <p>{tutor.subjects.join(", ")}</p>
        <p className='font-bold mt-2'>Education Background: </p>
        <p>{tutor.educationBackground}</p>
        <p className='font-bold mt-2'>Teaching Experience: </p>
        <p>{tutor.teachingExperience}</p>

        {showFavButton && (
          <button
            class='block mt-2 px-4 py-2 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '
            onClick={() => {
              setIsOpen(false);
              addmyTutor(tutor);
            }}>
            Save Tutor To Favourites
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
              class='block mt-2 px-6 py-4 text-sm font-medium font-bold text-white transition bg-red-500 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '>
              Cancel Request To Tutor!
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
              class='block mt-2 px-4 py-2 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '>
              Send Contact Request To Tutor
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default TutorModal;
