import { Field, Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import urlcat from "urlcat";

const SERVER = import.meta.env.VITE_SERVER;
const Search = () => {
  const [tutor, setTutor] = useState([]);
  const url = urlcat(SERVER, "/tutor");

  useEffect(() => {
    axios.get(url).then((data) => {
      setTutor(data.data);
    });
  }, []);

  const handleFilter = (values) => {
    const filterURL = urlcat(
      url,
      `/search?subjects=${values.subjects}&classLevel=${values.classLevel}&classType=${values.classType}`
    );
    axios.get(filterURL).then((data) => setTutor(data.data));
  };

  return (
    <>
      <h1 style={{ fontSize: "50px" }}>Search</h1>

      {/* using formik */}
      <Formik
        initialValues={{
          subjects: "select subject",
          classLevel: "select level",
          classType: "select class setting",
        }}
        onSubmit={(values) => handleFilter(values)}
      >
        {({ handleChange, handleBlur, values }) => (
          <div>
            <Form>
              <label>select subject: </label>
              <Field
                as="select"
                name="subjects"
                values={values.subjects}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option disabled>select subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="English">English</option>
                <option value="A-Math">A-Math</option>
                <option value="E-Math">E-Math</option>
                <option value="Biology">Biology</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Physics">Physics</option>
              </Field>

              <br />

              <label>select level: </label>
              <Field
                as="select"
                name="classLevel"
                values={values.classLevel}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option disabled>select level</option>
                <option value="Primary 1">Primary 1</option>
                <option value="Pri 2">Primary 2</option>
                <option value="Pri 3">Primary 3</option>
                <option value="Pri 4">Primary 4</option>
                <option value="Pri 5">Primary 5</option>
                <option value="Pri 6">Primary 6</option>
                <option value="Secondary 1">Secondary 1</option>
                <option value="Secondary 2">Secondary 2</option>
                <option value="Secondary 3">Secondary 3</option>
                <option value="Secondary 4">Secondary 4</option>
                <option value="Secondary 5">Secondary 5</option>
              </Field>

              <br />

              <label>select class setting: </label>
              <Field
                as="select"
                name="classType"
                values={values.classType}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option disabled>select class setting</option>
                <option value="Remote">Remote</option>
                <option value="In-Person">In-Person </option>
                <option value="Both Remote and In-Person">
                  Both Remote and In-Person
                </option>
              </Field>

              <br />

              <button type="submit" style={{ backgroundColor: "lime" }}>
                search
              </button>
            </Form>
          </div>
        )}
      </Formik>
      <div>
        <h1 style={{ fontSize: "50px" }}>All tutors</h1>
        {tutor.length === 0 ? (
          <div>No Tutor Found</div>
        ) : (
          <div>
            {tutor.map((e) => (
              <div key={e._id} value={e._id}>
                <p>Tutor Name:{e.fullName}</p>
                <p>Class setting: {e.classType}</p>
                <p>Location:{e.region}</p>
                <p> Subjects: {e.subjects}</p>
                <p>Levels:{e.classLevel}</p>
                <p>Ratings: {e.rating}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
