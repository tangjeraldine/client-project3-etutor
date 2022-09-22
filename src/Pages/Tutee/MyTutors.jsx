import urlcat from "urlcat";
import axios from "axios";
import { useEffect, useState } from "react";
import TutorModal from "../../components/TutorModal";

const SERVER = import.meta.env.VITE_SERVER;

const MyTutors = ({ user, favTutors, setFavTutors }) => {
  const [tutors, setTutors] = useState("");
  const [myTutors, setMyTutors] = useState([]);
  const [pendingTutors, setPendingTutors] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [whatToOpen, setWhatToOpen] = useState("");
  const [tuteeDetails, setTuteeDetails] = useState({});
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [addPendingButton, setAddPendingButton] = useState(false);
  const url = urlcat(SERVER, "/tutee");
  const currentUserId = user._id;

  useEffect(() => {
    const myTutorsURL = urlcat(url, `/myTutors?username=${currentUserId}`);
    axios.get(myTutorsURL).then((response) => {
      setMyTutors(response.data.myTutors);
      setPendingTutors(response.data.pendingTutors);
      setFavTutors(response.data.favTutors);
      console.log(response.data);
      setTuteeDetails(response.data);
    });
  }, []);

  const deletefavTutor = (tutorID) => {
    const favUrl = urlcat(
      SERVER,
      `tutee/deleteFavList/?username=${currentUserId}`
    );
    axios.put(favUrl, { tutorID }).then((response) => {
      console.log(response);
      setFavTutors(response.data.favTutors);
    });
  };

  const handleModal = (string, index) => {
    if (string === "pendingTutors") {
      setTutors(tuteeDetails.pendingTutors);
    } else if (string === "myTutors") {
      setTutors(tuteeDetails.myTutors);
    } else if (string === "favTutors") {
      setTutors(tuteeDetails.favTutors);
    }
    setIsOpen(true);
    setWhatToOpen(index);
  };

  return (
    <>
      <div>
        <h1 style={{ fontSize: "30px" }}>my tutors</h1>
        {tuteeDetails?.myTutors?.length === 0 ? (
          <div>You have no tutor</div>
        ) : (
          tuteeDetails?.myTutors?.map((tutor, index) => (
            <>
              <div key={index} onClick={() => handleModal("myTutors", index)}>
                <p>{tutor.fullName}</p>
              </div>
            </>
          ))
        )}
      </div>
      <br />
      <div>
        <h1 style={{ fontSize: "30px" }}>pending tutors</h1>
        {tuteeDetails?.pendingTutors?.length === 0 ? (
          <div>You have no pending tutor</div>
        ) : (
          tuteeDetails?.pendingTutors?.map((tutor, index) => (
            <>
              <div
                onClick={() => {
                  setShowButton(true);
                  handleModal("pendingTutors", index);
                }}
                key={index}
              >
                <p>{tutor.fullName}</p>
              </div>
            </>
          ))
        )}
      </div>

      <br />
      <div>
        <h1 style={{ fontSize: "30px" }}>Fav Tutor</h1>
        {tuteeDetails?.favTutors?.length === 0 ? (
          <div>You have no favorite tutor</div>
        ) : (
          tuteeDetails?.favTutors?.map((tutor, index) => (
            <>
              <div key={tutor._id}>
                <p onClick={() => handleModal("favTutors", index)}>
                  {tutor.fullName}
                </p>
                <button onClick={() => deletefavTutor(tutor._id)}>
                  Delete
                </button>
              </div>
            </>
          ))
        )}
        <div>
          <TutorModal
            user={user}
            whatToOpen={whatToOpen}
            open={isOpen}
            setIsOpen={setIsOpen}
            tutor={tutors[whatToOpen]}
            setShowCancelButton={setShowCancelButton}
            showCancelButton={showCancelButton}
            tuteeDetails={tuteeDetails}
            setTuteeDetails={setTuteeDetails}
            addPendingButton={addPendingButton}
            setAddPendingButton={setAddPendingButton}
          />
        </div>
      </div>
    </>
  );
};

export default MyTutors;
