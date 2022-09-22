import { useEffect, useState } from "react";
import urlcat from "urlcat";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  const [bookedClasses, setBookedClasses] = useState(false);
  const [anyAvailableClasses, setAnyAvailableClasses] = useState(true);
  const [loadClassesSuccessful, setLoadClassesSuccessful] = useState(true);
  const [loadAvailableClassesSuccessful, setLoadAvailableClassesSuccessful] =
    useState(true);
  const [addBookingSuccessful, setAddBookingSuccessful] = useState(true);
  const [removeBookingSuccessful, setRemoveBookingSuccessful] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [whatToOpen, setWhatToOpen] = useState("");
  const [openAvail, setOpenAvail] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    //fetch current tutee's data
    const urlTuteeDetails = urlcat(SERVER, `/tutee/tuteedetails/${user._id}`);
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
            setBookedClasses(false);
          } else {
            console.log(data);
            setClasses(data);
            setBookedClasses(true);
          }
        })
        .catch((error) => {
          if (error.response.data.error === "Unable to load classes.") {
            setLoadClassesSuccessful(false);
          }
        });

      let tutorIdArray=[]
      if (tuteeDetails.myTutors.length !== 0) {
        tuteeDetails.myTutors.map((tutor) => tutorIdArray.push(tutor._id));
        tutorIdArray =`?tutoridarray=${tutorIdArray.join(" ")}`
      } else {
        tutorIdArray = ''
      }

      const tuteeSubjectArray = [];
      tuteeDetails.subjects.map((subject) => tuteeSubjectArray.push(subject));
      const urlGetAvailableClasses = urlcat(
        SERVER,
        `/class/get-available-classes/${tuteeDetails._id}/${tuteeSubjectArray.join(" ")}/${tuteeDetails.currentLevel}${tutorIdArray}`
      );
      axios
        .get(urlGetAvailableClasses) //only get avail classes that match tutee's level and subject..
        .then(({ data }) => {
          if (data.message === "Classes not found.") {
            setAnyAvailableClasses(false)
          } else if (data.length === 0) {
            setAnyAvailableClasses(false);
            setAvailableClasses(data);
          } else {
            setAvailableClasses(data);
            setAnyAvailableClasses(true);
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
        if (error.response.data.error === "Class not found.") {
          setAddBookingSuccessful(false);
        }
      });
  };

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
        if (error.response.data.error === "Class not found.") {
          setRemoveBookingSuccessful(false);
        }
      });
  };

  const handleOpenAvailBooking = () => {
    setOpenAvail(!openAvail);
  };

  const handleModal = (index) => {
    setIsOpen(true);
    setWhatToOpen(index);
  };

  return (
    <>
      <section class='relative bg-center bg-no-repeat bg-cover bg-[url(https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)]'>
        <div class='absolute inset-0 bg-white/40 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/0'></div>

        <div class='relative px-4 py-32 mx-auto max-w-screen-xl sm:px-6 lg:px-8 lg:h-96 lg:items-center lg:flex'>
          <div class='max-w-xl text-center sm:text-left'>
            <h1 class='text-3xl font-extrabold sm:text-5xl'>
              Hi {tuteeDetails.fullName}!
              <strong class='block font-extrabold text-rose-700'>
                Welcome.
              </strong>
            </h1>

            <p class='max-w-lg mt-4 sm:leading-relaxed sm:text-xl text-rose-700'>
              Learning new concepts doesn't have to be hard or scary. Let our
              friendly community of tutors accompany you on your journey.
            </p>

            <div class='flex flex-wrap mt-8 text-center gap-4'>
              <button
                class='block w-full px-12 py-3 text-sm font-medium text-white bg-red-700 rounded shadow sm:w-auto bg-red-700 hover:bg-white hover:text-red-700 focus:outline-none focus:ring'
                onClick={() => {
                  navigate("/tutee/search");
                }}>
                Find A Tutor
              </button>

              <button
                class='block w-full px-12 py-3 text-sm font-medium text-white bg-red-700 rounded shadow sm:w-auto bg-red-700 hover:bg-white hover:text-red-700 focus:outline-none focus:ring'
                onClick={handleOpenAvailBooking}>
                {openAvail ? "Hide Booking Panel" : "Make A New Booking"}
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className='w-screen m-6 flex grid-cols-2'>
        <div className='w-1/2 m-4'>
          <h1 class='text-2xl font-bold text-left text-red-700 m-3 sm:text-3xl'>
            Upcoming Classes
          </h1>
          <div>
            {classes.map((eachClass, index) => {
              // const tutees = [];
              // eachClass.bookedBy.map((tutee) => tutees.push(tutee.fullName));
              const filledSlots = eachClass.bookedBy.length;
              const timeDay = format(
                parseISO(eachClass.timeDay),
                "EEE, dd/MM/yyyy, hh:mm aaaa"
              );
              return (
                <div key={index}>
                  <a class='relative block p-8 border border-gray-100 shadow-xl rounded-xl'>
                    <span class='absolute right-4 top-4 rounded-full px-3 py-1.5 bg-green-100 text-green-600 font-medium text-xs'>
                      {eachClass.classType}
                    </span>

                    <div class='text-gray-700 sm:pr-8'>
                      <svg
                        class='w-8 h-8 sm:w-10 sm:h-10'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'></path>
                      </svg>

                      <h5 class='mt-4 text-xl font-bold text-red-700'>
                        Title: {eachClass.classTitle} <br />
                        By: {eachClass.tutor.fullName}
                      </h5>

                      <p class='hidden mt-2 text-sm sm:block'>
                        Subject: {eachClass.subject} <br />
                        Class Level: {eachClass.classLevel}
                        <br />
                        Date and Time: {timeDay} <br />
                        Group Size: {filledSlots}/{eachClass.groupSize}
                      </p>
                    </div>
                    <button
                      class='block mt-2 px-4 py-2 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '
                      onClick={() => handleRemoveBooking(eachClass._id)}>
                      Cancel Your Booking
                    </button>
                  </a>

                  {/* <button
                    style={{ backgroundColor: "lime" }}
                    onClick={() => handleModal(index)}>
                    details
                  </button> */}
                </div>
              );
            })}
            {!bookedClasses && <p>No classes booked yet.</p>}
            {!loadClassesSuccessful && <p>Unable to load classes.</p>}
            {!removeBookingSuccessful && <p>Unable to remove booking.</p>}
          </div>
        </div>

        {openAvail ? (
          <div className='w-1/2 m-4 bg-amber-100 rounded'>
            <h1 class='text-2xl font-bold text-left text-red-700 sm:text-3xl m-3'>
              Available Slots For Booking
            </h1>
            <div>
              {availableClasses.map((eachClass, index) => {
                const filledSlots = eachClass.bookedBy.length;
                // if (filledSlots === eachClass.groupSize
                //   // || !(tuteeDetails.subjects.includes(eachClass.subject)) || tuteeDetails.currentLevel !== eachClass.classLevel
                //   ) {
                //   //still need to set count
                //   return
                // }
                const timeDay = format(
                  parseISO(eachClass.timeDay),
                  "EEE, dd/MM/yyyy, hh:mm aaaa"
                );

                return (
                  <div key={index} className='flex justify-center m-3'>
                    <div class='p-1 w-4/5 shadow-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl'>
                      <a class='block p-6 bg-white sm:p-8 rounded-xl'>
                        <div class='mt-3 sm:pr-8'>
                          <h5 class='text-xl font-bold text-gray-900'>
                            Title: {eachClass.classTitle} <br />
                            By: {eachClass.tutor.fullName}
                          </h5>

                          <p class='mt-2 text-sm text-gray-500'>
                            Date and Time: {timeDay} <br />
                            Class Type: {eachClass.classType} <br />
                            Subject: {eachClass.subject}
                            <br />
                            Class Level: {eachClass.classLevel} <br />
                            Group Size: {filledSlots}/{eachClass.groupSize}
                          </p>
                        </div>
                        <button
                          class='block mt-2 px-4 py-2 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '
                          onClick={() => handleAddBooking(eachClass._id)}>
                          Book This Class
                        </button>
                      </a>
                    </div>
                    {/* <button
                      style={{ backgroundColor: "lime" }}
                      onClick={() => handleModal(index)}>
                      details
                    </button> */}
                  </div>
                );
              })}
              {!anyAvailableClasses && (
                <p>
                  There are no classes available for you to book at the moment.
                  You may wish to contact your tutor to open up more slots for
                  you to book, or search for a new tutor.
                </p>
              )}
              {!loadAvailableClassesSuccessful && (
                <p>Unable to load available classes.</p>
              )}
              {!addBookingSuccessful && <p>Unable to add booking.</p>}
            </div>
          </div>
        ) : (
          <div className='w-1/2 m-4'></div>
        )}
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
