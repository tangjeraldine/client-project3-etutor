import { useEffect } from "react";
import urlcat from "urlcat";
import axios from "axios";
import { useState } from "react";
import { Field, Formik, Form, useFormikContext } from "formik";
import classesValidation from "../../Validations/classesValidation";
import ClassModal from "../../components/ClassModal";
import { format, parseISO } from "date-fns";

const SERVER = import.meta.env.VITE_SERVER;

const MyClassesTutee = ({ user }) => {

  const [classes, setClasses] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [tuteeDetails, setTuteeDetails] = useState({});
  const [renderClasses, setRenderClasses] = useState(true);
  const [bookedClasses, setBookedClasses] = useState(false)
  const [anyAvailableClasses, setAnyAvailableClasses] = useState(false)
  const [loadClassesSuccessful, setLoadClassesSuccessful] = useState(true);
  const [loadAvailableClassesSuccessful, setLoadAvailableClassesSuccessful] = useState(true);
  const [addBookingSuccessful, setAddBookingSuccessful] = useState(true);
  const [removeBookingSuccessful, setRemoveBookingSuccessful] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [whatToOpen, setWhatToOpen] = useState("");

  useEffect(() => {
    //fetch current tutee's data
    const urlTuteeDetails = urlcat(
      SERVER,
      `/tutee/tuteedetails/${user._id}`
    );
    axios
      .get(urlTuteeDetails)
      .then(({ data }) => {
        console.log(data);
        setTuteeDetails(data);
      })
      .catch((error) => {
        if (error.response.data.error === "Tutee not found.") {
          console.log(error);
        }
      });
  }, []);

  
  useEffect(() => {
    if (tuteeDetails._id !== undefined) {
      const urlGetClasses = urlcat(
        SERVER,
        `/class/get-classes/tutee/${tuteeDetails._id}`
      );
      axios
        .get(urlGetClasses)
        .then(({ data }) => {
          if (data.length === 0) {
            setBookedClasses(false)
          } else {
            console.log(data)
            setClasses(data);
            setBookedClasses(true)
          }
        })
        .catch((error) => {
          if (error.response.data.error === "Unable to load classes.") {
            setLoadClassesSuccessful(false);
          }
        });
        
        const tutorIdArray = []
        tuteeDetails.myTutors.map(tutor => tutorIdArray.push(tutor._id))
        const urlGetAvailableClasses = urlcat(
          SERVER,
          `/class/get-available-classes/${tuteeDetails._id}/${tutorIdArray.join(' ')}`
        );
        axios
          .get(urlGetAvailableClasses)//only get avail classes that match tutee's level and subject..
          .then(({ data }) => {
            if (data.length === 0) {
              setAnyAvailableClasses(false)
            } else {
              console.log(data)
              setAvailableClasses(data);
              setAnyAvailableClasses(true)
            }
          })
          .catch((error) => {
            if (error.response.data.error === "Unable to load classes.") {
              setLoadAvailableClassesSuccessful(false);
            }
          });
    }

  }, [renderClasses, tuteeDetails]);

  //find and update the class's bookedby and group size
  const handleAddBooking = (id) => {
    const urlAddBooking = urlcat(
      SERVER,
      `/class/add-booking/${id}/${tuteeDetails._id}`
    );
    axios
      .put(urlAddBooking)
      .then(({ data }) => {
        console.log(data);
          setRenderClasses(!renderClasses);
      })
      .catch((error) => {
        if (
          error.response.data.error === "Class not found."
        ) {
          setAddBookingSuccessful(false);
        }
      });
  }

  const handleRemoveBooking = (id) => {
    const urlRemoveBooking = urlcat(
      SERVER,
      `/class/remove-booking/${id}/${tuteeDetails._id}`
    );
    axios
      .put(urlRemoveBooking)
      .then(({ data }) => {
        console.log(data);
          setRenderClasses(!renderClasses);
      })
      .catch((error) => {
        if (
          error.response.data.error === "Class not found."
        ) {
          setRemoveBookingSuccessful(false);
        }
      });
  };

  const handleModal = (index) => {
    setIsOpen(true);
    setWhatToOpen(index);
  };


  return (
    <>
      <h1 style={{ fontSize: "50px" }}>My Classes</h1>
      <div>
        {classes.map((eachClass, index) => {
          // const tutees = [];
          // eachClass.bookedBy.map((tutee) => tutees.push(tutee.fullName));
          const filledSlots = eachClass.bookedBy.length
          const timeDay = format(
            parseISO(eachClass.timeDay),
            "EEE, dd/MM/yyyy, hh:mm aaaa"
          );
          return (
            <div key={index}>
              <p>Class Title: {eachClass.classTitle}</p>
              <p>Date, Time: {timeDay}</p>
              <p>Class Type: {eachClass.classType}</p>
              <p>Subject: {eachClass.subject}</p>
              <p>Class Level: {eachClass.classLevel}</p>
              {/* <p>Tutees: {tutees.join(", ") || "none"}</p> */}
              <p>Group Size: {filledSlots}/{eachClass.groupSize}</p>
              <button
                style={{ backgroundColor: "lime" }}
                onClick={() => handleRemoveBooking(eachClass._id)}>
                remove class
              </button>

              <button
                style={{ backgroundColor: "lime" }}
                onClick={() => handleModal(index)}>
                details
              </button>
            </div>
          );
        })}
        {!bookedClasses && <p>No classes booked yet.</p>}
        {!loadClassesSuccessful && <p>Unable to load classes.</p>}
        {!removeBookingSuccessful && <p>Unable to remove booking.</p>}
        
      </div>

      <h1 style={{ fontSize: "50px" }}>Available Classes</h1>
      <div>
        {availableClasses.map((eachClass, index) => {
          const filledSlots = eachClass.bookedBy.length
          if (filledSlots === eachClass.groupSize) {
            return
          }
          const timeDay = format(
            parseISO(eachClass.timeDay),
            "EEE, dd/MM/yyyy, hh:mm aaaa"
          );

          return (
            <div key={index}>
              <p>Class Title: {eachClass.classTitle}</p>
              <p>Date, Time: {timeDay}</p>
              <p>Class Type: {eachClass.classType}</p>
              <p>Subject: {eachClass.subject}</p>
              <p>Class Level: {eachClass.classLevel}</p>
              {/* <p>Tutees: {tutees.join(", ") || "none"}</p> do we wanna show tutees? so idk lol tutees can see if their friends booked or not or smtg idk lol*/}
              <p>Group Size: {filledSlots}/{eachClass.groupSize}</p>
              <button
                style={{ backgroundColor: "lime" }}
                onClick={() => handleAddBooking(eachClass._id)}>
                book class
              </button>

              <button
                style={{ backgroundColor: "lime" }}
                onClick={() => handleModal(index)}>
                details
              </button>
            </div>
          );
        })}
        {!anyAvailableClasses && <p>No available classes yet.</p>}
        {!loadAvailableClassesSuccessful && <p>Unable to load available classes.</p>}
        {!addBookingSuccessful && <p>Unable to add booking.</p>}
      </div>

      {/* <ClassModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        eachClass={classes[whatToOpen]}
        tuteeDetails={tuteeDetails}
      /> */}

    </>
  );
};

export default MyClassesTutee;
