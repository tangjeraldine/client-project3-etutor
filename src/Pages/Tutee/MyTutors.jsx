import urlcat from "urlcat";
import axios from "axios";
import { useEffect, useState } from "react";

const SERVER = import.meta.env.VITE_SERVER;

const MyTutors = ({ user, favTutors, setFavTutors }) => {
  const [myTutors, setMyTutors] = useState([]);
  const [pendingTutors, setPendingTutors] = useState([]);

  const url = urlcat(SERVER, "/tutee");
  const currentUserId = user._id;

  useEffect(() => {
    const myTutorsURL = urlcat(url, `/myTutors?username=${currentUserId}`);
    console.log(myTutorsURL);
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
          myTutors.map((tutor) => <p key={tutor._id}>{tutor.fullName}</p>)
        )}
      </div>
      <br />
      <div>
        <h1 style={{ fontSize: "30px" }}>pending tutors</h1>
        {pendingTutors.length === 0 ? (
          <div>You have no pending tutor</div>
        ) : (
          pendingTutors.map((tutor) => <p key={tutor._id}>{tutor.fullName}</p>)
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
              <div>
                <p key={tutor._id}>{tutor.fullName}</p>
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
