import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { TiCancel } from "react-icons/ti";

const TutorModal = ({
  open,
  setIsOpen,
  tutor,
  tuteeDetails,
  handleAddToPending,
  handleRemoveFromPending,
  handleFavTutor,
  handleUnfavTutor,
  favUnfavSuccessful,
  updatePendingSuccessful,
  modalType,
}) => {
  if (!open) return null;

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

  let inFav = false;
  let inPending = false;
  if (modalType === " myTutors") {
    tuteeDetails?.favTutors?.map((favTutor) => {
      if (favTutor._id === tutor._id) {
        inFav = true;
      }
    });
  } else if (modalType === "pendingTutors") {
    tuteeDetails?.favTutors?.map((favTutor) => {
      if (favTutor._id === tutor._id) {
        inFav = true;
      }
    });
    tuteeDetails?.pendingTutors?.map((pendingTutor) => {
      if (pendingTutor._id === tutor._id) {
        inPending = true;
      }
    });
  } else {
    inPending = 0;
    tuteeDetails.pendingTutors.map((pendingTutor) => {
      if (pendingTutor._id === tutor._id) {
        inPending = 2;
      }
    });
    tuteeDetails.myTutors.map((myTutor) => {
      if (myTutor._id === tutor._id) {
        inPending = 1;
      }
    });
    tuteeDetails?.favTutors?.map((favTutor) => {
      if (favTutor._id === tutor._id) {
        inFav = true;
      }
    });
  }

  return (
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button
          class='block mt-2 px-4 py-2 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '
          onClick={() => {
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

        {modalType === "pendingTutors" && (
          <div>
            {!inFav ? (
              <button
                class='block mt-3 px-12 py-2 text-sm font-medium text-white transition bg-rose-600 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '
                onClick={() => handleFavTutor(tutor)}>
                <AiOutlineStar /> Favourite
              </button>
            ) : (
              <button
                class='block mt-3 px-12 py-2 text-sm font-medium text-white transition bg-gray-800 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '
                onClick={() => handleUnfavTutor(tutor)}>
                <AiFillStar /> Un-Favourite
              </button>
            )}

            <br />
            {inPending ? (
              <button
                onClick={() => {
                  handleRemoveFromPending(tutor);
                }}
                class='block mt-3 px-12 py-2 text-sm font-medium text-white transition bg-gray-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '>
                <TiCancel />
                Cancel Request
              </button>
            ) : (
              <button
                onClick={() => {
                  handleAddToPending(tutor);
                }}
                class='block mt-3 px-12 py-2 text-sm font-medium text-white transition bg-blue-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '>
                Send Request
              </button>
            )}
          </div>
        )}
        {modalType === "myTutors" && (
          <div>
            {!inFav ? (
              <button
                class='block mt-3 px-12 py-2 text-sm font-medium text-white transition bg-rose-600 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '
                onClick={() => handleFavTutor(tutor)}>
                <AiOutlineStar /> Favourite
              </button>
            ) : (
              <button
                class='block mt-3 px-12 py-2 text-sm font-medium text-white transition bg-gray-800 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '
                onClick={() => handleUnfavTutor(tutor)}>
                <AiFillStar /> Un-Favourite
              </button>
            )}
          </div>
        )}
        {modalType === "favTutors" && (
          <div>
            {!inFav ? (
              <button
                class='block mt-3 px-12 py-2 text-sm font-medium text-white transition bg-rose-600 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '
                onClick={() => handleFavTutor(tutor)}>
                <AiOutlineStar /> Favourite
              </button>
            ) : (
              <button
                class='block mt-3 px-12 py-2 text-sm font-medium text-white transition bg-gray-800 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '
                onClick={() => handleUnfavTutor(tutor)}>
                <AiFillStar /> Un-Favourite
              </button>
            )}

            <br />

            {inPending === 1 && (
              <div class='block mt-3 px-12 py-2 text-sm font-medium text-black transition bg-yellow-400 border border-black-600 rounded-md shrink-0 '>
                Your Tutor
              </div>
            )}

            {inPending === 0 && (
              <button
                onClick={() => {
                  handleAddToPending(tutor);
                }}
                class='block mt-3 px-12 py-2 text-sm font-medium text-white transition bg-blue-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '>
                Send Request
              </button>
            )}

            {inPending === 2 && (
              <button
                onClick={() => {
                  handleRemoveFromPending(tutor);
                }}
                class='block mt-3 px-12 py-2 text-sm font-medium text-white transition bg-gray-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '>
                <TiCancel />
                Cancel Request
              </button>
            )}
          </div>
        )}
        {modalType === "search" && (
          <div>
            {!inFav ? (
              <button
                class='block mt-3 px-12 py-2 text-sm font-medium text-white transition bg-rose-600 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '
                onClick={() => handleFavTutor(tutor)}>
                <AiOutlineStar /> Favourite
              </button>
            ) : (
              <button
                class='block mt-3 px-12 py-2 text-sm font-medium text-white transition bg-gray-800 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '
                onClick={() => handleUnfavTutor(tutor)}>
                <AiFillStar /> Un-Favourite
              </button>
            )}

            <br />

            {inPending === 1 && (
              <div class='block mt-3 px-12 py-2 text-sm font-medium text-black transition bg-yellow-400 border border-black-600 rounded-md shrink-0 '>
                Your Tutor!
              </div>
            )}

            {inPending === 0 && (
              <button
                onClick={() => {
                  handleAddToPending(tutor);
                }}
                class='block mt-3 px-12 py-2 text-sm font-medium text-white transition bg-blue-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '>
                Send Request
              </button>
            )}

            {inPending === 2 && (
              <button
                onClick={() => {
                  handleRemoveFromPending(tutor);
                }}
                class='block mt-3 px-12 py-2 text-sm font-medium text-white transition bg-gray-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '>
                <TiCancel />
                Cancel Request
              </button>
            )}
          </div>
        )}

        {!favUnfavSuccessful && <p>Unable to fav/unfav tutor.</p>}
        {!updatePendingSuccessful && <p>Unable to send/cancel request.</p>}
      </div>
    </>
  );
};

export default TutorModal;
