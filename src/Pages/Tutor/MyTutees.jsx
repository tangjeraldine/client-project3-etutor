import urlcat from "urlcat";
import axios from "axios";
import { useEffect, useState } from "react";
import TuteeModal from "../../components/TuteeModal";

const SERVER = import.meta.env.VITE_SERVER;
const url = urlcat(SERVER, "/tutee");

const MyTutees = ({ user }) => {
  const [myTutee, setMyTutee] = useState([]);
  const [pendingTutee, setPendingTutee] = useState([]);
  const [tutorDetails, setTutorDetails] = useState([]);
  const [tuteeDetails, setTuteeDetails] = useState([]);

  // use the tutor's user_id to find tutees

  // pending tutors
  // pressing accept, -> delete tutee from pendingtutors and add tutee to myTutors
  // pressing reject -> delete tutee from pending tutors only
  // when tutors

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

  useEffect(() => {
    //access tutees database and find all tutees of this tutor
    const urlTuteeDetails = urlcat(
      SERVER,
      `/tutee/myTutees/${tutorDetails?._id}`
    );
    axios
      .get(urlTuteeDetails)
      .then(({ data }) => {
        console.log(data);
        setTuteeDetails(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [tutorDetails]);

  return (
    <>
      <div>
        <h1 style={{ fontSize: "30px" }}>my tutees</h1>
        {tuteeDetails.length === 0 ? (
          <div>You have no tutees</div>
        ) : (
          tuteeDetails?.map((tutee) => {
            if (tutee.myTutors.includes(tutorDetails._id)) {
              return <p key={tutee._id}>{tutee.fullName}</p>;
            }
          })
        )}
      </div>
      <br />
      <div>
        <h1 style={{ fontSize: "30px" }}>pending tutees</h1>
        {tuteeDetails.length === 0 ? (
          <div>You have no pending tutees</div>
        ) : (
          tuteeDetails?.map((tutee, index) => {
            if (tutee.pendingTutors.includes(tutorDetails._id)) {
              return (
                <div key={index} onClick={() => console.log("")}>
                  <p key={tutee._id}>{tutee.fullName}</p>
                  {/* <button style={{ backgroundColor: "lime" }}>accept</button>
                  <button style={{ backgroundColor: "red" }}>reject</button> */}
                </div>
              );
            }
          })
        )}
        <div>
          <TuteeModal />
        </div>
      </div>
    </>
  );
};

export default MyTutees;
