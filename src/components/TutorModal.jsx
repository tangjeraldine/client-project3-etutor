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
          style={{ backgroundColor: "lime" }}
          onClick={() => {
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

        {modalType === "pendingTutors" && (
          <div>
            {!inFav ? (
              <button
                style={{ backgroundColor: "lime" }}
                onClick={() => handleFavTutor(tutor)}
              >
                <AiOutlineStar />
              </button>
            ) : (
              <button
                style={{ backgroundColor: "lime" }}
                onClick={() => handleUnfavTutor(tutor)}
              >
                <AiFillStar />
              </button>
            )}

            <br />
            {inPending ? (
              <button
                onClick={() => {
                  handleRemoveFromPending(tutor)
                }}
                style={{ backgroundColor: "lime" }}
              >
                <TiCancel />
                Request
              </button>
            ) : (
              <button
                onClick={() => {
                  handleAddToPending(tutor);
                }}
                style={{ backgroundColor: "lime" }}
              >
                Send Request
              </button>
            )}
          </div>
        )}
        {modalType === "myTutors" && (
          <div>
            {!inFav ? (
              <button
                style={{ backgroundColor: "lime" }}
                onClick={() => handleFavTutor(tutor)}
              >
                <AiOutlineStar />
              </button>
            ) : (
              <button
                style={{ backgroundColor: "lime" }}
                onClick={() => handleUnfavTutor(tutor)}
              >
                <AiFillStar />
              </button>
            )}
          </div>
        )}
        {modalType === "favTutors" && (
          <div>
            {!inFav ? (
              <button
                style={{ backgroundColor: "lime" }}
                onClick={() => handleFavTutor(tutor)}
              >
                <AiOutlineStar />
              </button>
            ) : (
              <button
                style={{ backgroundColor: "lime" }}
                onClick={() => handleUnfavTutor(tutor)}
              >
                <AiFillStar />
              </button>
            )}

            <br />

            {inPending === 1 && (
              <div style={{ backgroundColor: "lime" }}>Your Tutor</div>
            )}

            {inPending === 0 && (
              <button
                onClick={() => {
                  handleAddToPending(tutor)
                }}
                style={{ backgroundColor: "lime" }}
              >
                Send Request
              </button>
            )}

            {inPending === 2 && (
              <button
                onClick={() => {
                  handleRemoveFromPending(tutor);
                }}
                style={{ backgroundColor: "lime" }}
              >
                <TiCancel />
                Request
              </button>
            )}
          </div>
        )}
        {modalType === "search" && (
          <div>
            {!inFav ? (
              <button
                style={{ backgroundColor: "lime" }}
                onClick={() => handleFavTutor(tutor)}
              >
                <AiOutlineStar />
              </button>
            ) : (
              <button
                style={{ backgroundColor: "lime" }}
                onClick={() => handleUnfavTutor(tutor)}
              >
                <AiFillStar />
              </button>
            )}

            <br />

            {inPending === 1 && (
              <div style={{ backgroundColor: "lime" }}>Your Tutor</div>
            )}

            {inPending === 0 && (
              <button
                onClick={() => {
                  handleAddToPending(tutor)
                }}
                style={{ backgroundColor: "lime" }}
              >
                Send Request
              </button>
            )}

            {inPending === 2 && (
              <button
                onClick={() => {
                  handleRemoveFromPending(tutor);
                }}
                style={{ backgroundColor: "lime" }}
              >
                <TiCancel />
                Request
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
