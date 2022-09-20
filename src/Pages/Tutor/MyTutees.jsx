import urlcat from "urlcat";
import axios from "axios";
import { useEffect, useState } from "react";

const SERVER = import.meta.env.VITE_SERVER;
const url = urlcat(SERVER, "/tutee");

const MyTutees = ({ user }) => {
  const [myTutee, setMyTutee] = useState([]);
  const [pendingTutee, setPendingTutee] = useState([]);

  useEffect(() => {
    //get tutor details to see their subjects, class levels, and class types of specific tutor
    const urlTutorDetails = urlcat(SERVER, `/tutor/${user._id}`);
    axios
      .get(urlTutorDetails)
      .then(({ data }) => {
        console.log(data);
        setTutorDetails(data);
      })
      .catch((error) => {
        if (error.response.data.error === "Tutor not found.") {
          console.log(error);
        }
      });
  }, []);

  return (
    <>
      <div>
        <h1 style={{ fontSize: "30px" }}>my tutees</h1>
        {/* {myTutee.length === 0 ? (
          <div>You have no tutee</div>
        ) : (
          myTutee.map((tutee) => <p key={tutee._id}>{tutee.fullName}</p>)
        )} */}
        <p>tutor #1</p>
        <p>tutor #2</p>
      </div>
      <br />
      <div>
        <h1 style={{ fontSize: "30px" }}>pending tutees</h1>
        <p>tutor #3</p>
        <p>tutor #4</p>
      </div>
    </>
  );
};

export default MyTutees;
