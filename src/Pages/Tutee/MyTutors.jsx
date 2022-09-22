import urlcat from "urlcat";
import axios from "axios";
import { useEffect, useState } from "react";
import TutorModal from "../../components/TutorModal";

const SERVER = import.meta.env.VITE_SERVER;

const MyTutors = ({ user }) => {
  const [tutors, setTutors] = useState("");
  const [tuteeDetails, setTuteeDetails] = useState({});
  const [renderTuteeDetails, setRenderTuteeDetails] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [whatToOpen, setWhatToOpen] = useState("");
  const [modalType, setModalType] = useState("");

  const [favUnfavSuccessful, setFavUnfavSuccessful] = useState(true);
  const [updatePendingSuccessful, setUpdatePendingSuccessful] = useState(true);

  useEffect(() => {
    const url = urlcat(SERVER, `tutee/tuteedetails/${user._id}`);
    axios
      .get(url)
      .then(({ data }) => {
        setTuteeDetails(data);
      })
      .catch((error) => {
        if (error.response.data.error === "Tutee not found.") {
          console.log(error);
        }
      });
  }, [renderTuteeDetails]);

  const axiosFavUnFav = (tutor, url) => {
    axios
      .put(url, tutor)
      .then(({ data }) => {
        setRenderTuteeDetails(!renderTuteeDetails);
        setFavUnfavSuccessful(true);
      })
      .catch((error) => {
        if (error.response.data.error === "Tutee not found.") {
          console.log("Tutee not found.");
        } else {
          console.log("Unable to fav/unfav tutor.");
        }
        setFavUnfavSuccessful(false);
      });
  };

  const handleFavTutor = (tutor) => {
    const url = urlcat(SERVER, `tutee/updatetutee/fav/${user._id}`);
    axiosFavUnFav(tutor, url);
  };

  const handleUnfavTutor = (tutor) => {
    const url = urlcat(SERVER, `tutee/updatetutee/unfav/${user._id}`);
    axiosFavUnFav(tutor, url);
  };

  const axiosUpdatePending = (tutor, url) => {
    axios
      .put(url, tutor)
      .then(({ data }) => {
        setRenderTuteeDetails(!renderTuteeDetails);
        setUpdatePendingSuccessful(true);
      })
      .catch((error) => {
        if (error.response.data.error === "Tutee not found.") {
          console.log("Tutee not found.");
        } else {
          console.log("Unable to update pending list.");
        }
        setUpdatePendingSuccessful(false);
      });
  };

  const handleAddToPending = (tutor) => {
    let inMyTutor = false;
    tuteeDetails.myTutors.map((myTutor) => {
      if (myTutor._id === tutor._id) {
        inMyTutor = true;
      }
    });
    if (inMyTutor === false) {
      const url = urlcat(SERVER, `tutee/updatetutee/addpending/${user._id}`);
      axiosUpdatePending(tutor, url);
    }
  };

  const handleRemoveFromPending = (tutor) => {
    const url = urlcat(SERVER, `tutee/updatetutee/deletepending/${user._id}`);
    axiosUpdatePending(tutor, url);
  };

  const handleModal = (string, index) => {
    if (string === "pendingTutors") {
      setTutors(tuteeDetails.pendingTutors);
    } else if (string === "myTutors") {
      setTutors(tuteeDetails.myTutors);
    } else if (string === "favTutors") {
      setTutors(tuteeDetails.favTutors);
    }
    setModalType(string);
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
              <h1 class='text-2xl text-red-700 text-center m-2 sm:text-3xl'>
                My Tutors
              </h1>
              {tuteeDetails?.myTutors?.length === 0 ? (
                <div>You have not engaged any tutors at the moment.</div>
              ) : (
                tuteeDetails?.myTutors?.map((tutor, index) => {
                  return (
                    <div key={index}>
                      <div onClick={() => handleModal("myTutors", index)}>
                        <a
                          class='block p-8 border border-gray-800 shadow-xl transition rounded-xl hover:shadow-red-700/10 hover:border-red-500/10 cursor-pointer mt-3'
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
                    </div>
                  );
                })
              )}
            </div>
            <div>
              <h1 class='text-2xl text-red-700 text-center m-2 sm:text-3xl'>
                Pending Tutors
              </h1>
              {tuteeDetails?.pendingTutors?.length === 0 ? (
                <div>You have no tutors on your Pending list.</div>
              ) : (
                tuteeDetails?.pendingTutors?.map((tutor, index) => {
                  return (
                    <>
                      <div
                        onClick={() => {
                          handleModal("pendingTutors", index);
                        }}
                        key={index}>
                        <a
                          class='block p-8 border border-gray-800 shadow-xl transition rounded-xl hover:shadow-red-700/10 hover:border-red-500/10 cursor-pointer mt-3'
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
                    </>
                  );
                })
              )}
            </div>
            <div>
              <h1 class='text-2xl text-red-700 text-center m-2 sm:text-3xl'>
                Favourite Tutors
              </h1>
              {tuteeDetails?.favTutors?.length === 0 ? (
                <div>You have no tutors on your Favourites list.</div>
              ) : (
                tuteeDetails?.favTutors?.map((tutor, index) => {
                  return (
                    <div key={index}>
                      <a
                        class='block p-8 border border-gray-800 shadow-xl transition rounded-xl hover:shadow-red-700/10 hover:border-red-500/10 cursor-pointer mt-3'
                        onClick={() => handleModal("favTutors", index)}
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
                  );
                })
              )}
            </div>
            {!favUnfavSuccessful && <p>Unable to fav/unfav tutor.</p>}
            {!updatePendingSuccessful && <p>Unable to send/cancel request.</p>}
            <TutorModal
              open={isOpen}
              setIsOpen={setIsOpen}
              tutor={tutors[whatToOpen]}
              tuteeDetails={tuteeDetails}
              handleAddToPending={handleAddToPending}
              handleRemoveFromPending={handleRemoveFromPending}
              handleFavTutor={handleFavTutor}
              handleUnfavTutor={handleUnfavTutor}
              favUnfavSuccessful={favUnfavSuccessful}
              updatePendingSuccessful={updatePendingSuccessful}
              modalType={modalType}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default MyTutors;
