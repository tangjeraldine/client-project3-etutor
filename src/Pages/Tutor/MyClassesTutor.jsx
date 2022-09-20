// import Calendar from "../../components/Calendar";

import { useEffect } from "react";
import urlcat from "urlcat";
import axios from "axios";
import { useState } from "react";
import { Field, Formik, Form, useFormikContext } from "formik";
import classesValidation from "../../Validations/classesValidation";

const SERVER = import.meta.env.VITE_SERVER;

//!!!!! tutor can only pick class level and subjects that they teach.
const MyClassesTutor = ({ user }) => {
  const [classes, setClasses] = useState([]);
  const [renderClasses, setRenderClasses] = useState(true);
  const [loadClassesSuccessful, setLoadClassesSuccessful] = useState(true);
  const [createClassSuccessful, setCreateClassSuccessful] = useState(true);
  const [deleteClassSuccessful, setDeleteClassSuccessful] = useState(true);
  const [tutorDetails, setTutorDetails] = useState({});

  useEffect(() => {
    const urlGetClasses = urlcat(SERVER, `/class/get-classes/${user._id}`);
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
  }, [renderClasses]);

  const handleCreateClass = (values) => {
    const urlCreateClasses = urlcat(SERVER, "/class/create-class");
    const newClass = { ...values };
    newClass.tutor = user._id;
    axios
      .post(urlCreateClasses, newClass)
      .then(({ data }) => {
        setCreateClassSuccessful(true);
      })
      .catch((error) => {
        if (error.response.data.error === "Class unable to be created.") {
          setCreateClassSuccessful(false);
        }
      });
  };

  const handleRemoveClass = (id) => {
    const urlRemoveClass = urlcat(SERVER, `/class/remove-class/${user._id}`);
    axios
      .delete(urlRemoveClass)
      .then(({ data }) => {
        console.log(data);
        if (data.length === 0) {
          console.log("no classes created yet");
        } else {
          setClasses(data);
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

  return (
    <>
      <h1 style={{ fontSize: "50px" }}>my classes</h1>
      {/* <Calendar /> */}

      {/* with formik, create new class */}
      <Formik
        initialValues={{
          classTitle: "",
          subject: "select",
          classLevel: "select",
          classType: "select",
          groupSize: "",
        }}
        validationSchema={classesValidation}
        onSubmit={(values) => {
          setRenderClasses(!renderClasses);
          handleCreateClass(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          initialValues,
        }) => (
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
          return (
            <div key={index}>
              <p>Class Title: {eachClass.classTitle}</p>
              <p>Subject: {eachClass.subject}</p>
              <p>Date, Time: {eachClass.timeDay}</p>
              <p>Tutor: {eachClass.tutor}</p>
              {/* not sure if tutor is necessary since its their own account xD */}
              <p>Tutees: {eachClass.bookedBy.join(", ") || "none"}</p>
              <p>Group Size: {eachClass.groupSize}</p>
              <button
                style={{ backgroundColor: "lime" }}
                onClick={() => handleRemoveClass(eachClass._id)}
              >
                remove class
              </button>
            </div>
          );
        })}
        {!deleteClassSuccessful && <p>Unable to delete class.</p>}
        {/* <button style={{ backgroundColor: "lime" }} onClick={() => handleEditClass(eachClass._id)}>edit class</button> */}
        {/* {!editClassSuccessful && <p>Unable to edit class.</p>} */}
        {!loadClassesSuccessful && <p>Unable to load classes.</p>}
      </div>
    </>
  );
};

export default MyClassesTutor;
