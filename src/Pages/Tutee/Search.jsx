import { Field, Formik, Form } from "formik";
import axios from "axios";
import { useEffect, useState } from "react";
import urlcat from "urlcat";
import * as Yup from "yup";
import TutorModal from "../../components/TutorModal";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

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
  // const url = urlcat(SERVER);
  const [sortState, setSortState] = useState("Sort");
  const [filterValues, setFilterValues] = useState({
    subjects: [],
    region: [],
    classLevel: "select level",
    classType: [],
  });

  const [favUnfavSuccessful, setFavUnfavSuccessful] = useState(true);
  const [updatePendingSuccessful, setUpdatePendingSuccessful] = useState(true)

  const sortOptions = ["rating", "region", "rates"];
  const tutorurl = urlcat(SERVER, `/tutor/alltutor`);

  const handleModal = (index) => {
    setIsOpen(true);
    setWhatToOpen(index);
  };

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

  const startingValue = {
    subjects: [],
    region: [],
    classLevel: "select level",
    classType: [],
  };

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
      const filterURL = urlcat(
        tutorurl,
        `/search/${sortState}/?subjects=${filterValues.subjects}&classLevel=${filterValues.classLevel}&classType=${filterValues.classType}&region=${filterValues.region}&page=0`
      );
      axios.get(filterURL).then((data) => {
        setTutor(data.data.filteredTutor);
        setTotalPages(data.data.totalPages);
      });
    };
    handleFilter();
  }, [filterValues, sortState]);

  useEffect(() => {
    axios.get(tutorurl).then((data) => {
      setTutor(data.data.allTutor);
      setTotalPages(data.data.totalPages);
    });
  }, [page]);

  const handleReset = () => {
    axios.get(tutorurl).then((data) => {
      setTutor(data.data.allTutor);
      setTotalPages(data.data.totalPages);
    });
  };

  // find current tutee, update current tutee profile favTutors array
  const handleFavTutor = (tutor) => {
    const url = urlcat(
      SERVER,
      `tutee/updatetutee/fav/${user._id}`
    );
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

    const url = urlcat(
      SERVER,
      `tutee/updatetutee/unfav/${user._id}`
    );

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
    const url = urlcat(
      SERVER,
      `tutee/updatetutee/addpending/${user._id}`
    );

    axios
      .put(url, tutor)
      .then(({data}) => {
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
    const url = urlcat(
      SERVER,
      `tutee/updatetutee/deletepending/${user._id}`
    );

    axios
      .put(url, tutor)
      .then(({data}) => {
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
      <h1 style={{ fontSize: "50px" }}>Search</h1>

      <Formik
        initialValues={startingValue}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setFilterValues(values);
        }}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => (
          <div>
            <Form>
              <label>Select subject: </label>
              {allSubjects.map((subject) => {
                return (
                  <div key={subject}>
                    <Field type="checkbox" name="subjects" value={subject} />
                    {subject}
                  </div>
                );
              })}
              {errors.subjects && touched.subjects ? (
                <div>{errors.subjects}</div>
              ) : null}
              <br />
              <br />
              <label>Select Region: </label>
              {regions.map((region) => {
                return (
                  <div key={region}>
                    <Field type="checkbox" name="region" value={region} />
                    {region}
                  </div>
                );
              })}

              <label>Select level: </label>
              <Field
                as="select"
                name="classLevel"
                value={values.classLevel}
                onChange={handleChange}
                onBlur={handleBlur}
              >
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
              <br />

              <p>Class Type: </p>
              {classTypes.map((classType) => {
                return (
                  <div key={classType}>
                    <Field type="checkbox" name="classType" value={classType} />
                    {classType}
                  </div>
                );
              })}

              {errors.classType && touched.classType ? (
                <div>{errors.classType}</div>
              ) : null}
              <br />
              <button type="submit" style={{ backgroundColor: "lime" }}>
                search
              </button>
            </Form>
            <button onClick={handleReset} style={{ backgroundColor: "lime" }}>
              reset
            </button>
          </div>
        )}
      </Formik>

      <h1 style={{ fontSize: "50px" }}>Sort</h1>
      <div>
        <Formik
          initialValues={{
            sort: "Sort",
          }}
        >
          {({ handleChange, handleBlur, values }) => (
            <div>
              <Form>
                <label> Sort By: </label>
                <Field
                  as="select"
                  name="sort"
                  value={values.sort}
                  onChange={(e) => {
                    handleChange(e);
                    setSortState(e.target.value);
                  }}
                  onBlur={handleBlur}
                >
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

      <div>
        <h1 style={{ fontSize: "50px" }}>All tutors</h1>
        {tutor.length === 0 ? (
          <div>No tutors matched your requirements!</div>
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
                  <div
                    onClick={() => {
                      setShowFavButton(true);
                      setAddPendingButton(true);
                      handleModal(index);
                    }}
                    key={index}
                    value={index}
                  >
                    <p>Tutor Name: {tutor.fullName}</p>
                    <p>Class setting: {tutor.classType.join(", ")}</p>
                    <p>Location: {tutor.region}</p>
                    <p> Subjects: {tutor.subjects.join(", ")}</p>
                    <p>Levels: {tutor.classLevel.join(", ")}</p>
                    <p>Ratings: {tutor.rating}</p>
                    <p>Rates: {tutor.rates}</p>
                  </div>

                  {!inFav ? (
                    <button
                      style={{ backgroundColor: "lime" }}
                      onClick={() => handleFavTutor(tutor)}
                    >
                      <AiOutlineStar />
                    </button>
                  ) : (
                    <button
                      style={{ backgroundColor: "lime" }}
                      onClick={() => handleUnfavTutor(tutor)}
                    >
                      <AiFillStar />
                    </button>
                  )}

                  <br />
                  {!inPending ? (
                    <button
                      onClick={() => {
                        // setIsOpen(false);
                        handleAddToPending(tutor);
                      }}
                      style={{ backgroundColor: "lime" }}
                    >
                      Send Request
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        // setIsOpen(false);
                        handleRemoveFromPending(tutor);
                      }}
                      style={{ backgroundColor: "lime" }}
                    >
                      Cancel Request
                    </button>
                  )}
                </>
              );
            })}
            {!favUnfavSuccessful && <p>Unable to fav/unfav tutor.</p>}
            {!updatePendingSuccessful && <p>Unable to send/cancel request.</p>}

            <TutorModal
              open={isOpen}
              setIsOpen={setIsOpen}
              tutor={tutor[whatToOpen]}
              setShowCancelButton={setShowCancelButton}
              showCancelButton={showCancelButton}
              addPendingButton={addPendingButton}
              setAddPendingButton={setAddPendingButton}
              user={user}
              setTutor={setTutor}

              tuteeDetails={tuteeDetails}

              handleAddToPending={handleAddToPending}
              handleRemoveFromPending={handleRemoveFromPending}
              handleFavTutor={handleFavTutor}
              handleUnfavTutor={handleUnfavTutor}
              favUnfavSuccessful={favUnfavSuccessful}
              updatePendingSuccessful={updatePendingSuccessful}

              setShowFavButton={setShowFavButton}
              showFavButton={showFavButton}
            />
            <br />
            <br />
            <button
              disabled={page === 0}
              onClick={() => setPage(Math.max(0, page - 1))}
              style={{ backgroundColor: "lime" }}
            >
              Previous
            </button>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              style={{ backgroundColor: "lime" }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
