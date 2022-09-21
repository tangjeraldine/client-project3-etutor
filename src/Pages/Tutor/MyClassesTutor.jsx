// import Calendar from "../../components/Calendar";

import { useEffect } from "react";
import urlcat from "urlcat";
import axios from "axios";
import { useState } from "react";
import { Field, Formik, Form, useFormikContext } from "formik";
import classesValidation from "../../Validations/classesValidation";
import ClassModal from "../../components/ClassModal";
import { format } from "date-fns";

const SERVER = import.meta.env.VITE_SERVER;

//!!!!! tutor can only pick class level and subjects that they teach.
const MyClassesTutor = ({ user }) => {
  const [classes, setClasses] = useState([]);
  const [renderClasses, setRenderClasses] = useState(true);
  const [loadClassesSuccessful, setLoadClassesSuccessful] = useState(true);
  const [createClassSuccessful, setCreateClassSuccessful] = useState(true);
  const [deleteClassSuccessful, setDeleteClassSuccessful] = useState(true);
  const [tutorDetails, setTutorDetails] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [whatToOpen, setWhatToOpen] = useState("");

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
    if (tutorDetails._id !== undefined) {
      const urlGetClasses = urlcat(
        SERVER,
        `/class/get-classes/${tutorDetails._id}`
      );
      axios
        .get(urlGetClasses)
        .then(({ data }) => {
          console.log(data);
          if (data.length === 0) {
            console.log("no classes created yet");
          } else {
            setClasses(data);
          }
        })
        .catch((error) => {
          if (error.response.data.error === "Unable to load classes.") {
            setLoadClassesSuccessful(false);
          }
        });
    }
  }, [renderClasses, tutorDetails]);

  // const date = new Date('1995-12-17T03:24:00')
  // const datestring = date.toString();
  // console.log(typeof(date))
  // console.log(typeof(datestring))

  const handleCreateClass = (values) => {
    const urlCreateClasses = urlcat(SERVER, "/class/create-class");
    const date = values.date;
    const time = values.time;
    const timeDay = `${date}T${time}:00`;
    delete values.date;
    delete values.time;
    values.timeDay = new Date(timeDay);
    // const newClass = { ...values };
    values.tutor = tutorDetails._id;
    axios
      .post(urlCreateClasses, values)
      .then(({ data }) => {
        setCreateClassSuccessful(true);
      })
      .catch((error) => {
        if (error.response.data.error === "Unable to create class.") {
          setCreateClassSuccessful(false);
        }
      });
  };

  const handleRemoveClass = (id) => {
    const urlRemoveClass = urlcat(
      SERVER,
      `/class/remove-class/${id}/${tutorDetails._id}`
    );
    axios
      .delete(urlRemoveClass)
      .then(({ data }) => {
        console.log(data);
        if (data.length === 0) {
          console.log("no classes created yet");
        } else {
          setRenderClasses(!renderClasses);
        }
      })
      .catch((error) => {
        if (
          error.response.data.error === "Unable to delete class." ||
          error.response.data.error === "Class not found."
        ) {
          setDeleteClassSuccessful(false);
        }
      });
  };

  const handleModal = (index) => {
    setIsOpen(true);
    setWhatToOpen(index);
  };

  return (
    <>
      <h1 style={{ fontSize: "50px" }}>my classes</h1>
      {/* <Calendar /> */}

      {/* with formik, create new class */}
      <Formik
        initialValues={{
          classTitle: "",
          time: "",
          date: "",
          classType: "select",
          subject: "select",
          classLevel: "select",
          groupSize: "",
        }}
        validationSchema={classesValidation}
        onSubmit={(values, { resetForm }) => {
          setRenderClasses(!renderClasses);
          handleCreateClass(values);
          resetForm();
        }}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => (
          <Form>
            <p>Class Title</p>
            <Field
              name="classTitle"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.classTitle}
            />
            {errors.classTitle && touched.classTitle ? (
              <div>{errors.classTitle}</div>
            ) : null}
            <br />

            <p>Date and Time</p>
            <input
              type="date"
              name="date"
              min="2022-08-21"
              max="2025-10-27"
              value={values.date}
              onChange={handleChange}
            />
            <input
              type="time"
              name="time"
              value={values.time}
              onChange={handleChange}
            />
            {errors.date && Object.keys(touched).length === 5 ? (
              <div>{errors.date}</div>
            ) : null}
            {errors.time && Object.keys(touched).length === 5 ? (
              <div>{errors.time}</div>
            ) : null}
            <br />
            <br />

            <p>Class Type</p>
            <Field
              as="select"
              name="classType"
              values={values.classType}
              onChange={handleChange}
            >
              <option disabled>select</option>
              {tutorDetails.classType?.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Field>
            {errors.classType && touched.classType ? (
              <div>{errors.classType}</div>
            ) : null}
            <br />
            <br />

            <p>Subject</p>
            <Field
              as="select"
              name="subject"
              values={values.subject}
              onChange={handleChange}
            >
              <option disabled>select</option>
              {tutorDetails.subjects?.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </Field>
            {errors.subject && touched.subject ? (
              <div>{errors.subject}</div>
            ) : null}
            {/* {!matchingLevelSub && (
              <p>Please select matching class levels and subjects.</p>
            )} */}
            <br />
            <br />

            <p>Class Level</p>
            <Field
              as="select"
              name="classLevel"
              values={values.classLevel}
              onChange={handleChange}
            >
              <option disabled>select</option>
              {tutorDetails.classLevel?.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </Field>
            {errors.classLevel && touched.classLevel ? (
              <div>{errors.classLevel}</div>
            ) : null}
            <br />
            <br />

            <p>Group Size</p>
            <Field
              name="groupSize"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.groupSize}
            />
            {errors.groupSize && touched.groupSize ? (
              <div>{errors.groupSize}</div>
            ) : null}
            <br />
            <br />
            <button
              type="submit"
              disabled={
                !(
                  Object.keys(errors).length === 0 &&
                  Object.keys(touched).length !== 0
                )
              }
              style={{ backgroundColor: "lime" }}
            >
              create class
            </button>
            {!createClassSuccessful && <p>Class unable to be created.</p>}
            {/* <CheckClassLevelAndSubject /> */}
          </Form>
        )}
      </Formik>
      {/* list of classes of this tutor */}
      <div>
        {classes.map((eachClass, index) => {
          const tutees = [];
          eachClass.bookedBy.map((tutee) => tutees.push(tutee.fullName));
          const date = eachClass.timeDay.toString().substring(0, 10);
          const time = eachClass.timeDay.toString().substring(11, 16);

          return (
            <div key={index}>
              <p>Class Title: {eachClass.classTitle}</p>
              <p>Date, Time: {`${date}, ${time}`}</p>
              <p>Class Type: {eachClass.classType}</p>
              <p>Subject: {eachClass.subject}</p>
              <p>Class Level: {eachClass.classLevel}</p>
              <p>Tutees: {tutees.join(", ") || "none"}</p>
              <p>Group Size: {eachClass.groupSize}</p>
              <button
                style={{ backgroundColor: "lime" }}
                onClick={() => handleRemoveClass(eachClass._id)}
              >
                remove class
              </button>

              <button
                style={{ backgroundColor: "lime" }}
                onClick={() => handleModal(index)}
              >
                details
              </button>
            </div>
          );
        })}
        {!deleteClassSuccessful && <p>Unable to delete class.</p>}
        {!loadClassesSuccessful && <p>Unable to load classes.</p>}
      </div>

      <ClassModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        eachClass={classes[whatToOpen]}
        tutorDetails={tutorDetails}
        setClasses={setClasses}
        setRenderClasses={setRenderClasses}
        renderClasses={renderClasses}
      />
    </>
  );
};

export default MyClassesTutor;
