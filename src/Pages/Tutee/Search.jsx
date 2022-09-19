import { Field, Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import urlcat from "urlcat";
import * as Yup from "yup";
import TutorModal from "../../components/TutorModal";

const SERVER = import.meta.env.VITE_SERVER;
const Search = () => {
  const [tutor, setTutor] = useState([]);
  const [page, setPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [whatToOpen, setWhatToOpen] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const url = urlcat(SERVER, `/tutor`);
  const sortOptions = ["rating", "region"];

  const handleModal = (index) => {
    setIsOpen(true);
    setWhatToOpen(index);
  };

  const handleSort = (values) => {
    try {
      let sort = values.target.value;
      const sortURL = urlcat(url, sort);

      axios.get(sortURL, sort).then((data) => {
        setTutor(data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios.get(url).then((data) => {
      setTutor(data.data.allTutor);
      setTotalPages(data.data.totalPages);
    });
  }, [page]);

  const handleReset = () => {
    axios.get(url).then((data) => {
      setTutor(data.data.allTutor);
      setTotalPages(data.data.totalPages);
    });
  };

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

  const validationSchema = Yup.object({
    subjects: Yup.array().required("Required"),
    classLevel: Yup.string().required("Required"),
    classType: Yup.string().required("Required"),
  });

  const handleFilter = (values) => {
    const filterURL = urlcat(
      url,
      `/search?subjects=${values.subjects}&classLevel=${values.classLevel}&classType=${values.classType}`
    );
    console.log(values);
    console.log(filterURL);
    axios.get(filterURL).then((data) => setTutor(data.data));
  };

  return (
    <>
      <h1 style={{ fontSize: "50px" }}>Search</h1>

      {/* using formik */}
      <Formik
        initialValues={{
          subjects: [],
          classLevel: "",
          classType: "",
        }}
        onSubmit={(values) => handleFilter(values)}
        validationSchema={validationSchema}
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

              <label>Select level: </label>
              <Field
                as="select"
                name="classLevel"
                value={values.classLevel}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">select level</option>
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

              <label>Select class setting: </label>
              <Field
                as="select"
                name="classType"
                value={values.classType}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="" label="Select a class">
                  Select a class
                </option>
                <option value="Remote">Remote</option>
                <option value="In-Person">In-Person </option>
                <option value="Both Remote and In-Person">
                  Both Remote and In-Person
                </option>
              </Field>
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
          {({ handleChange, handleBlur, values, errors, touched }) => (
            <div>
              <Form>
                <label> Sort By: </label>
                <Field
                  as="select"
                  name="sort"
                  value={values.sort}
                  onChange={(e) => {
                    handleChange;
                    handleSort(e);
                  }}
                  onBlur={handleBlur}
                >
                  <option disabled>Sort</option>
                  {sortOptions.map((e) => (
                    <option key={e} value={e}>
                      {e}
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
              <div onClick={() => handleModal(index)} key={index} value={index}>
                <p>Tutor Name: {tutor.fullName}</p>
                <p>Class setting: {tutor.classType}</p>
                <p>Location: {tutor.region}</p>
                <p> Subjects: {tutor.subjects.join(", ")}</p>
                <p>Levels: {tutor.classLevel.join(", ")}</p>
                <p>Ratings: {tutor.rating}</p>
              </div>
            ))}

            <TutorModal
              open={isOpen}
              onClose={() => setIsOpen(false)}
              tutor={tutor[whatToOpen]}
            />

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
