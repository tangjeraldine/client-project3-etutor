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
      <section class='text-red-700 bg-white'>
        <div class='px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8'>
          <div class='max-w-lg mx-auto text-center'>
            <h2 class='text-3xl font-bold sm:text-4xl'>
              View and manage your list of tutors here.
            </h2>

            <p class='mt-4 text-rose-700'>
              Pro-Tip: As soon as the tutor you have contacted has accepted you,
              you will be able to see their available class slots for booking!
              If you have any doubts, clarify them with your tutor.
            </p>
          </div>

          <div class='mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            <div>
              <h1 style={{ fontSize: "30px" }}>Current Tutors</h1>
              {tuteeDetails?.myTutors?.length === 0 ? (
                <div>You have no tutors at the moment.</div>
              ) : (
                tuteeDetails?.myTutors?.map((tutor, index) => (
                  <>
                    <div
                      key={index}
                      onClick={() => handleModal("myTutors", index)}>
                      <a
                        class='block p-8 border border-gray-800 shadow-xl transition rounded-xl hover:shadow-red-700/10 hover:border-red-500/10 cursor-pointer'
                        key={tutor._id}>
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
                          {tutor.fullName}
                        </h3>
                      </a>
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
            <div>
              <h1 style={{ fontSize: "30px" }}>Pending Tutors</h1>
              {tuteeDetails?.pendingTutors?.length === 0 ? (
                <div>You have no pending tutors.</div>
              ) : (
                tuteeDetails?.pendingTutors?.map((tutor, index) => (
                  <>
                    <div
                      onClick={() => {
                        setShowButton(true);
                        handleModal("pendingTutors", index);
                      }}
                      key={index}>
                      <a
                        class='block p-8 border border-gray-800 shadow-xl transition rounded-xl hover:shadow-red-700/10 hover:border-red-500/10 '
                        key={tutor._id}>
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
                          {tutor.fullName}
                        </h3>
                        <p>(Click to view, accept, or reject.)</p>
                      </a>
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
            <div>
              <h1 style={{ fontSize: "30px" }}>Favourited Tutors</h1>
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
          </div>
        </div>
      </section>
    </>
  );
};

export default MyTutors;
