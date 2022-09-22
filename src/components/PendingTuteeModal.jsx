import urlcat from "urlcat";
import axios from "axios";
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
}) => {
  if (!open) return null;
  console.log(eachTuteeDetails);
  console.log(user);

  /// Tutor Karen, pending tutee is sarah. if i accept sarah as my tutee, remove from pending, move to my tutees
  // find sarah in the database, remove karen from pendingtutors and add to  mytutors
  // fetch that will update tutee database, remove
  const handleAccept = () => {
    const updatedPendingTutors = eachTuteeDetails.pendingTutors.filter(
      (tutor) => tutor !== tutorDetails._id
    );
    console.log(updatedPendingTutors);

    // eachTuteeDetails.pendingTutors = updatedPendingTutors;

    const updatedTuteeDetails = [...tuteeDetails];
    updatedTuteeDetails[whatToOpen].pendingTutors = updatedPendingTutors;
    updatedTuteeDetails[whatToOpen].myTutors = [
      ...updatedTuteeDetails[whatToOpen].myTutors,
      tutorDetails._id,
    ];

    // send in updatedTuteeDetails as body findoneandupdate
    console.log(updatedTuteeDetails);
    setTuteeDetails(updatedTuteeDetails);

    setIsOpen(false);
  };

  const handleReject = () => {
    const updatedPendingTutors = eachTuteeDetails.pendingTutors.filter(
      (tutor) => tutor !== tutorDetails._id
    );
    console.log(updatedPendingTutors);
    const updatedTuteeDetails = [...tuteeDetails];
    updatedTuteeDetails[whatToOpen].pendingTutors = updatedPendingTutors;
    setTuteeDetails(updatedTuteeDetails);

    setIsOpen(false);
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
          onClick={onClose}>
          Close
        </button>
        <div className='font-bold' style={{ fontSize: "30px" }}>
          Tutee Details
        </div>
        <p className='font-bold'>Name: </p>
        <p>{eachTuteeDetails.fullName}</p>
        <p className='font-bold'>Class Level: </p>
        <p>{eachTuteeDetails.currentLevel}</p>
        <p className='font-bold'>Phone: </p>
        <p>{eachTuteeDetails.phone}</p>
        <p className='font-bold'>Region: </p>
        <p>{eachTuteeDetails.region}</p>
        <p className='font-bold'>Subjects: </p>
        <p>{eachTuteeDetails.subjects.join(", ")}</p>
        <button
          onClick={handleAccept}
          class='block mt-2 px-4 py-2 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '>
          Accept
        </button>
        <button
          onClick={handleReject}
          class='block mt-2 px-4 py-2 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '>
          Reject
        </button>
      </div>
    </>
  );
};

export default PendingTuteeModal;
