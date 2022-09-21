import urlcat from "urlcat";
import axios from "axios";
import { useEffect, useState } from "react";
import TutorModal from "../../components/TutorModal";

const SERVER = import.meta.env.VITE_SERVER;

const MyTutors = ({ user, favTutors, setFavTutors }) => {
  const [myTutors, setMyTutors] = useState([]);
  const [pendingTutors, setPendingTutors] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [whatToOpen, setWhatToOpen] = useState("");
  const handleModal = (index) => {
    setIsOpen(true);
    setWhatToOpen(index);
  };

  const url = urlcat(SERVER, "/tutee");
  const currentUserId = user._id;

  useEffect(() => {
    const myTutorsURL = urlcat(url, `/myTutors?username=${currentUserId}`);
    axios.get(myTutorsURL).then((response) => {
      setMyTutors(response.data.myTutors);
      setPendingTutors(response.data.pendingTutors);
      setFavTutors(response.data.favTutors);
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

  return (
    <>
      <div>
        <h1 style={{ fontSize: "30px" }}>my tutors</h1>
        {myTutors.length === 0 ? (
          <div>You have no tutor</div>
        ) : (
          myTutors.map((tutor, index) => (
            <>
              <div key={index}>
                <p>{tutor.fullName}</p>
              </div>
              {/* <TutorModal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                tutor={myTutors[whatToOpen]}
              /> */}
            </>
          ))
        )}
      </div>
      <br />
      <div>
        <h1 style={{ fontSize: "30px" }}>pending tutors</h1>
        {pendingTutors.length === 0 ? (
          <div>You have no pending tutor</div>
        ) : (
          pendingTutors.map((tutor, index) => (
            <>
              <div onClick={() => handleModal(index)} key={index}>
                <p>{tutor.fullName}</p>
              </div>
              <TutorModal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                tutor={pendingTutors[whatToOpen]}
              />
            </>
          ))
        )}
      </div>

      <br />
      <div>
        <h1 style={{ fontSize: "30px" }}>Fav Tutor</h1>
        {favTutors.length === 0 ? (
          <div>You have no favorite tutor</div>
        ) : (
          favTutors?.map((tutor) => (
            <>
              <div key={tutor._id}>
                <p>{tutor.fullName}</p>
                <button onClick={() => deletefavTutor(tutor._id)}>
                  Delete
                </button>
              </div>
            </>
          ))
        )}
      </div>
    </>
  );
};

export default MyTutors;
