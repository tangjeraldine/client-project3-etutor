const TutorModal = ({ open, tutor, onClose }) => {
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
  return (
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div style={{ fontSize: "50px" }}>Tutor modal</div>
        <p>Name: {tutor.fullName}</p>
        <p> Class Level: {tutor.classLevel.join(", ")}</p>
        <p>Region: {tutor.region}</p>
        <p>Class Type: {tutor.classType}</p>
        <p>Rates: {tutor.rates}</p>
        <p>Subjects: {tutor.subjects}</p>
        <p>Education Background: {tutor.educationBackground}</p>
        <p> Teaching Experience: {tutor.teachingExperience}</p>

        <button style={{ backgroundColor: "lime" }} onClick={onClose}>
          close Modal
        </button>
      </div>
    </>
  );
};

export default TutorModal;
