import urlcat from "urlcat";
import axios from "axios";
import { useEffect, useState } from "react";
import PendingTuteeModal from "../../components/PendingTuteeModal";

const SERVER = import.meta.env.VITE_SERVER;
const url = urlcat(SERVER, "/tutee");

const MyTutees = ({ user }) => {
  const [myTutee, setMyTutee] = useState([]);
  const [pendingTutee, setPendingTutee] = useState([]);
  const [tutorDetails, setTutorDetails] = useState([]);
  const [tuteeDetails, setTuteeDetails] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [whatToOpen, setWhatToOpen] = useState("");
  const [showButton, setShowButton] = useState(false);

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

  const handleModal = (index) => {
    setIsOpen(true);
    setWhatToOpen(index);
  };

  return (
    <>
      <section class='text-red-700 bg-white'>
        <div class='px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8'>
          <div class='max-w-lg mx-auto text-center'>
            <h2 class='text-3xl font-bold sm:text-4xl'>
              View all your tutees here, present and future.
            </h2>

            <p class='mt-4 text-rose-700'>
              Pro-Tip: The tutees in your pending list are waiting for you. Be
              proactive and contact them as soon as you can!
            </p>
          </div>

          <div class='mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            <div>
              <h1 style={{ fontSize: "30px" }}>Accepted Tutees</h1>
              {tuteeDetails.length === 0 ? (
                <div>You have no tutees</div>
              ) : (
                tuteeDetails?.map((tutee) => {
                  if (tutee.myTutors.includes(tutorDetails._id)) {
                    return (
                      <div>
                        <a
                          class='block p-8 border border-gray-800 shadow-xl transition rounded-xl hover:shadow-red-700/10 hover:border-red-500/10 cursor-pointer'
                          onClick={() => {
                            setShowButton(false);
                            handleModal(index);
                          }}
                          key={tutee._id}>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            class='w-10 h-10 text-pink-500'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'>
                            <path d='M12 14l9-5-9-5-9 5 9 5z' />
                            <path d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' />
                            <path
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='2'
                              d='M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222'
                            />
                          </svg>

                          <h3 class='mt-4 text-xl font-bold text-black'>
                            {tutee.fullName}
                          </h3>
                        </a>
                      </div>
                    );
                  }
                })
              )}
            </div>
            <div>
              <h1 style={{ fontSize: "30px" }}>Pending Tutees</h1>
              {tuteeDetails.length === 0 ? (
                <div>You have no pending tutees</div>
              ) : (
                tuteeDetails?.map((tutee, index) => {
                  if (tutee.pendingTutors.includes(tutorDetails._id)) {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setShowButton(true);
                          handleModal(index);
                        }}>
                        <a
                          class='block p-8 border border-gray-800 shadow-xl transition rounded-xl hover:shadow-red-700/10 hover:border-red-500/10 cursor-pointer'
                          key={tutee._id}>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            class='w-10 h-10 text-pink-500'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'>
                            <path d='M12 14l9-5-9-5-9 5 9 5z' />
                            <path d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' />
                            <path
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='2'
                              d='M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222'
                            />
                          </svg>

                          <h3 class='mt-4 text-xl font-bold text-black'>
                            {tutee.fullName}
                          </h3>
                          <p>(Click to view, accept, or reject.)</p>
                        </a>
                      </div>
                    );
                  }
                })
              )}
              <div>
                <PendingTuteeModal
                  open={isOpen}
                  onClose={() => setIsOpen(false)}
                  eachTuteeDetails={tuteeDetails[whatToOpen]}
                  user={user}
                  setTuteeDetails={setTuteeDetails}
                  tuteeDetails={tuteeDetails}
                  whatToOpen={whatToOpen}
                  tutorDetails={tutorDetails}
                  setIsOpen={setIsOpen}
                  setShowButton={setShowButton}
                  showButton={showButton}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyTutees;
