import { Field, Formik, Form } from "formik";
import axios from "axios";
import { useEffect, useState } from "react";
import urlcat from "urlcat";
import * as Yup from "yup";
import TutorModal from "../../components/TutorModal";

const SERVER = import.meta.env.VITE_SERVER;
const Search = ({ user, favTutors, setFavTutors }) => {
  const [tutor, setTutor] = useState([]);
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [addPendingButton, setAddPendingButton] = useState(false);
  const [page, setPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [whatToOpen, setWhatToOpen] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const url = urlcat(SERVER);
  const [sortState, setSortState] = useState("");
  const sortOptions = ["rating", "region", "subjects", "classType", "rates"];
  const tutorurl = urlcat(url, `/tutor/alltutor`);
  const currentUserId = user._id;
  const handleModal = (index) => {
    setIsOpen(true);
    setWhatToOpen(index);
  };

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

  const handleFilter = (values) => {
    const filterURL = urlcat(
      tutorurl,
      `/search/?subjects=${values.subjects}&classLevel=${values.classLevel}&classType=${values.classType}&region=${values.region}`
    );
    console.log(values);
    console.log(filterURL);
    axios.get(filterURL).then((data) => {
      setTutor(data.data.filteredTutor);
      setTotalPages(data.data.totalPages);
    });
  };

  // find current tutee, update current tutee profile favTutors array

  const addmyTutor = (tutor) => {
    console.log(favTutors);
    if (favTutors.length === 0) {
      const favUrl = urlcat(
        SERVER,
        `tutee/updateFavList/?username=${currentUserId}`
      );
      axios.put(favUrl, tutor).then((response) => {
        console.log(response.data);
        setFavTutors(response.data.favTutors);
      });
    } else {
      favTutors.map((favTutor) => {
        if (favTutor._id !== tutor._id) {
          const favUrl = urlcat(
            SERVER,
            `tutee/updateFavList/?username=${currentUserId}`
          );
          axios.put(favUrl, tutor).then((response) => {
            console.log(response.data);
            setFavTutors(response.data.favTutors);
          });
        }
      });
    }
  };

  return (
    <>
      <h1 style={{ fontSize: "50px" }}>Search</h1>

      {/* using formik */}
      <Formik
        initialValues={startingValue}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleFilter(values);
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
          onChange={() => console.log("change")}
        >
          {({ handleChange, handleBlur, values, errors, touched }) => (
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
            {tutor.map((tutor, index) => (
              <>
                <div
                  onClick={() => {
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

                <button
                  style={{ backgroundColor: "lime" }}
                  onClick={() => addmyTutor(tutor)}
                >
                  Add fav tutor
                </button>
              </>
            ))}

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
            />

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
