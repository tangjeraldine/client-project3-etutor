import { Field, Formik, Form } from "formik";
import axios from "axios";
import { useEffect, useState } from "react";
import urlcat from "urlcat";
import * as Yup from "yup";
import TutorModal from "../../components/TutorModal";
import { AiFillStar, AiOutlineStar, AiOutlineMail } from "react-icons/ai";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { BiReset, BiSearchAlt } from "react-icons/bi";
import { TiCancel } from "react-icons/ti";

const SERVER = import.meta.env.VITE_SERVER;
const Search = ({ user }) => {
  const [tutor, setTutor] = useState([]);
  const [tuteeDetails, setTuteeDetails] = useState({});
  const [renderTuteeDetails, setRenderTuteeDetails] = useState(true);
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [addPendingButton, setAddPendingButton] = useState(false);
  const [page, setPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [whatToOpen, setWhatToOpen] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [showFavButton, setShowFavButton] = useState(false);
  const [sortState, setSortState] = useState("Sort");

  const [favUnfavSuccessful, setFavUnfavSuccessful] = useState(true);
  const [updatePendingSuccessful, setUpdatePendingSuccessful] = useState(true);

  const sortOptions = ["rating", "region", "rates"];

  const handleModal = (index) => {
    setIsOpen(true);
    setWhatToOpen(index);
  };

  const startingValue = {
    subjects: [],
    region: [],
    classLevel: "select level",
    classType: [],
  };

  const [filterValues, setFilterValues] = useState(startingValue);

  const classTypes = ["Remote", "In-Person"];
  const allClass = [
    "Primary 1",
    "Primary 2",
    "Primary 3",
    "Primary 4",
    "Primary 5",
    "Primary 6",
    "Secondary 1",
    "Secondary 2",
    "Secondary 3",
    "Secondary 4",
    "Secondary 5",
  ];

  const allSubjects = [
    "English",
    "Mathematics",
    "Science",
    "Additional Mathematics",
    "Elementary Mathematics",
    "Biology",
    "Physics",
    "Chemistry",
  ];

  const regions = ["North", "South", "East", "West", "Central"];

  const validationSchema = Yup.object({
    subjects: Yup.array(),
    classLevel: Yup.string(),
    classType: Yup.array(),
  });

  useEffect(() => {
    //fetch current tutee's data
    const urlTuteeDetails = urlcat(SERVER, `/tutee/tuteedetails/${user._id}`);
    axios
      .get(urlTuteeDetails)
      .then(({ data }) => {
        setTuteeDetails(data);
      })
      .catch((error) => {
        if (error.response.data.error === "Tutee not found.") {
          console.log(error);
        }
      });
  }, [renderTuteeDetails]);

  useEffect(() => {
    const handleFilter = () => {
      const url = urlcat(
        SERVER,
        `/tutor/alltutor/search/${sortState}/?subjects=${filterValues.subjects}&classLevel=${filterValues.classLevel}&classType=${filterValues.classType}&region=${filterValues.region}&page=${page}`
      );
      axios.get(url).then((data) => {
        setTutor(data.data.filteredTutor);
        setTotalPages(data.data.totalPages);
      });
    };
    handleFilter();
  }, [filterValues, sortState, page]);

  // find current tutee, update current tutee profile favTutors array
  const handleFavTutor = (tutor) => {
    const url = urlcat(SERVER, `tutee/updatetutee/fav/${user._id}`);
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
          console.log("Unable to fav tutor.");
        }
        setFavUnfavSuccessful(false);
      });
  };

  const handleUnfavTutor = (tutor) => {
    const url = urlcat(SERVER, `tutee/updatetutee/unfav/${user._id}`);

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
          console.log("Unable to unfav tutor.");
        }
        setFavUnfavSuccessful(false);
      });
  };

  const handleAddToPending = (tutor) => {
    const url = urlcat(SERVER, `tutee/updatetutee/addpending/${user._id}`);

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
          console.log("Unable to add to pending list.");
        }
        setUpdatePendingSuccessful(false);
      });
  };

  const handleRemoveFromPending = (tutor) => {
    const url = urlcat(SERVER, `tutee/updatetutee/deletepending/${user._id}`);

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
          console.log("Unable to remove from pending list.");
        }
        setUpdatePendingSuccessful(false);
      });
  };

  return (
    <>
      <section class='relative h-64 bg-center bg-no-repeat bg-cover bg-[url(https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80)]'>
        <div class='absolute inset-0 bg-white/40 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/60 sm:to-white/10'></div>

        <div class='relative px-4 py-32 mx-auto max-w-screen-xl sm:px-6 lg:px-8 lg:h-96 lg:items-center lg:flex'>
          <div class='max-w-xl text-center sm:text-left'>
            <h1 class='text-3xl font-extrabold sm:text-3xl'>
              Find what you need and who you need,
              <strong class='block font-extrabold text-rose-700'>
                any time, anywhere.
              </strong>
            </h1>
          </div>
        </div>
      </section>
      <br />
      <details class='group bg-amber-200 rounded' open>
        <summary class='flex items-center justify-between p-4 rounded-lg cursor-pointer bg-gray-50'>
          <h5 class='font-medium text-gray-900'>Set Search Criteria</h5>
          <svg
            class='flex-shrink-0 ml-1.5 w-5 h-5 transition duration-300 group-open:-rotate-180'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </summary>
        <Formik
          initialValues={startingValue}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setFilterValues(values);
          }}>
          {({ handleChange, handleBlur, values, errors, touched }) => (
            <div>
              <Form>
                <div class='flex flex-wrap grid-cols-3 gap-10 mt-5 ml-10'>
                  <div>
                    {" "}
                    <label class='font-bold text-red-700 m-1 sm:text-1xl'>
                      Select Subject:{" "}
                    </label>
                    {allSubjects.map((subject) => {
                      return (
                        <div key={subject}>
                          <Field
                            type='checkbox'
                            name='subjects'
                            value={subject}
                          />
                          {subject}
                        </div>
                      );
                    })}
                    {errors.subjects && touched.subjects ? (
                      <div>{errors.subjects}</div>
                    ) : null}
                  </div>
                  <br />
                  <br />
                  <div>
                    <label class='font-bold text-red-700 m-1 sm:text-1xl'>
                      Select Region:{" "}
                    </label>
                    {regions.map((region) => {
                      return (
                        <div key={region}>
                          <Field type='checkbox' name='region' value={region} />
                          {region}
                        </div>
                      );
                    })}
                  </div>
                  <br />
                  <br />
                  <div>
                    <label class='font-bold text-red-700 m-1 sm:text-1xl'>
                      Select level:{" "}
                    </label>{" "}
                    <br />
                    <Field
                      as='select'
                      name='classLevel'
                      value={values.classLevel}
                      onChange={handleChange}
                      onBlur={handleBlur}>
                      <option disabled>select level</option>
                      {allClass.map((e) => (
                        <option key={e} value={e}>
                          {e}
                        </option>
                      ))}
                    </Field>
                    {errors.classLevel && touched.classLevel ? (
                      <div>{errors.classLevel}</div>
                    ) : null}
                  </div>
                  <br />
                  <br />
                  <br />
                  <div class='mt-8'>
                    <p class='font-bold text-red-700 m-1 sm:text-1xl'>
                      Class Type:{" "}
                    </p>
                    {classTypes.map((classType) => {
                      return (
                        <div key={classType}>
                          <Field
                            type='checkbox'
                            name='classType'
                            value={classType}
                          />
                          {classType}
                        </div>
                      );
                    })}

                    {errors.classType && touched.classType ? (
                      <div>{errors.classType}</div>
                    ) : null}
                  </div>
                  <br />
                  <br />
                  <button
                    type='submit'
                    onClick={() => {
                      setPage(0);
                    }}
                    className='text-4xl '>
                    <BiSearchAlt />
                  </button>{" "}
                </div>
              </Form>
              <button
                onClick={() => {
                  setPage(0);
                  setFilterValues(startingValue);
                }}
                class='text-4xl relative left-7'>
                <BiReset />
              </button>{" "}
            </div>
          )}
        </Formik>
      </details>
      <br />
      <div>
        <Formik
          initialValues={{
            sort: "Sort",
          }}>
          {({ handleChange, handleBlur, values }) => (
            <div>
              <Form>
                <label class='text-1xl text-red-700 m-2 sm:text-2xl ml-8'>
                  {" "}
                  Sort By:{" "}
                </label>
                <Field
                  as='select'
                  name='sort'
                  value={values.sort}
                  onChange={(e) => {
                    handleChange(e);
                    setSortState(e.target.value);
                  }}
                  onBlur={handleBlur}>
                  <option disabled>Sort</option>
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Field>
              </Form>
            </div>
          )}
        </Formik>
      </div>
      <br />
      <br />
      <div>
        <h1 class='text-2xl text-red-700 font-bold m-2 sm:text-3xl ml-8'>
          Search Results
        </h1>
        <br />
        {tutor.length === 0 ? (
          <div class='text-1xl text-grey-600 font-bold m-2 sm:text-2xl '>
            No tutors matched your requirements!
          </div>
        ) : (
          <div>
            {tutor.map((tutor, index) => {
              let inFav = false;
              let inPending = false;
              tuteeDetails?.favTutors?.map((favTutor) => {
                if (favTutor._id === tutor._id) {
                  inFav = true;
                }
              });
              tuteeDetails?.pendingTutors?.map((pendingTutor) => {
                if (pendingTutor._id === tutor._id) {
                  inPending = true;
                }
              });
              return (
                <>
                  <div key={index} value={index}>
                    <a
                      class='relative block p-8 border border-gray-100 shadow-xl rounded-xl m-10 w-4/5'
                      onClick={() => {
                        setShowFavButton(true);
                        setAddPendingButton(true);
                        handleModal(index);
                      }}>
                      <span class='absolute right-4 top-4 rounded-full px-3 py-1.5 bg-green-100 text-green-600 font-medium text-xs'>
                        {tutor.classType.join(", ")}
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
                          Tutor: {tutor.fullName}
                        </h5>

                        <p class='hidden mt-2 text-sm sm:block'>
                          Subjects: {tutor.subjects.join(", ")} <br />
                          Levels: {tutor.classLevel.join(", ")}
                          <br />
                          Rate/lesson: ${tutor.rates} <br />
                          Location: {tutor.region} <br />
                          Class setting: {tutor.classType.join(", ")} <br />
                          Ratings: {tutor.rating}
                        </p>
                      </div>

                      {!inFav ? (
                        <button
                          class='block mt-2 px-4 py-2 text-sm font-medium text-white transition bg-rose-600 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '
                          onClick={() => handleFavTutor(tutor)}>
                          <AiOutlineStar /> Save to Favourites
                        </button>
                      ) : (
                        <button
                          class='block mt-2 px-4 py-2 text-sm font-medium text-white transition bg-gray-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '
                          onClick={() => handleUnfavTutor(tutor)}>
                          <AiFillStar /> Remove from Favourites
                        </button>
                      )}

                      <br />
                      {!inPending ? (
                        <button
                          onClick={() => {
                            handleAddToPending(tutor);
                          }}
                          class='block mt-2 px-4 py-2 text-sm font-medium text-white transition bg-blue-600 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '>
                          <AiOutlineMail />
                          Send Request
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            handleRemoveFromPending(tutor);
                          }}
                          class='block mt-2 px-4 py-2 text-sm font-medium text-white transition bg-gray-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '>
                          <TiCancel />
                          Cancel Request
                        </button>
                      )}
                    </a>
                  </div>
                </>
              );
            })}
            {!favUnfavSuccessful && <p>Unable to fav/unfav tutor.</p>}
            {!updatePendingSuccessful && <p>Unable to send/cancel request.</p>}
            <TutorModal
              open={isOpen}
              setIsOpen={setIsOpen}
              tutor={tutor[whatToOpen]}
              tuteeDetails={tuteeDetails}
              setShowCancelButton={setShowCancelButton}
              showCancelButton={showCancelButton}
              addPendingButton={addPendingButton}
              setAddPendingButton={setAddPendingButton}
              handleAddToPending={handleAddToPending}
              handleRemoveFromPending={handleRemoveFromPending}
              handleFavTutor={handleFavTutor}
              handleUnfavTutor={handleUnfavTutor}
              favUnfavSuccessful={favUnfavSuccessful}
              updatePendingSuccessful={updatePendingSuccessful}
              showFavButton={showFavButton}
            />
            <br />
            <br />
            {!(page === 0) && (
              <button
                disabled={page === 0}
                onClick={() => setPage(Math.max(0, page - 1))}
                style={{ backgroundColor: "lime" }}>
                <MdNavigateBefore /> prev
              </button>
            )}{" "}
            {!(page === totalPages - 1) && (
              <button
                onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                style={{ backgroundColor: "lime" }}>
                <MdNavigateNext /> Next
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
