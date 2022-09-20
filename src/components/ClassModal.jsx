import { useState, useEffect } from "react";
import { Field, Formik, Form, useFormikContext } from "formik";
import classesValidation from "../Validations/classesValidation";
import urlcat from "urlcat";
import axios from "axios";

const SERVER = import.meta.env.VITE_SERVER;

const ClassModal = ({ open, eachClass, onClose, tutorDetails }) => {
  if (!open) return null;

  const [editClassSuccessful, setEditClassSuccessful] = useState(true);
  const [showEditableClass, setShowEditableClass] = useState(false);
  const [tuteeDetails, setTuteeDetails] = useState([]);

  const MODAL_STYLES = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#FFF",
    padding: "50px",
    zIndex: 1000,
  };

  const OVERLAY_STYLES = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,.7",
    zIndex: 1000,
  };

  const tutees = [];
  eachClass.bookedBy.map((tutee) => tutees.push(tutee.fullName));

  useEffect(() => {
    //access tutees database and find all tutees of this tutor
    const urlTuteeDetails = urlcat(
      SERVER,
      `/tutee/myTutees/${tutorDetails._id}`
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
  }, []);

  const handleEditClass = (values) => {
    const editedClass = { ...values };
    const urlEditClass = urlcat(
      SERVER,
      `/class/edit-class/${eachClass._id}/${tutorDetails._id}`
    );
    axios
      .put(urlEditClass, editedClass)
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
          error.response.data.error === "Unable to edit class." ||
          error.response.data.error === "Class not found."
        ) {
          setEditClassSuccessful(false);
        }
      });
  };

  return (
    <>
      {!showEditableClass && (
        <>
          <div style={OVERLAY_STYLES} />
          <div style={MODAL_STYLES}>
            <div style={{ fontSize: "30px" }}>Class modal</div>
            <p>Class Title: {eachClass.classTitle}</p>
            <p>Date, Time: {eachClass.timeDay}</p>
            <p>Class Type: {eachClass.classType}</p>
            <p>Subject: {eachClass.subject}</p>
            <p>Class Level: {eachClass.classLevel}</p>
            <p>Tutees: {tutees.join(", ") || "none"}</p>
            <p>Group Size: {eachClass.groupSize}</p>

            <button
              style={{ backgroundColor: "lime" }}
              onClick={() => setShowEditableClass(true)}
            >
              edit
            </button>
            {!editClassSuccessful && <p>Unable to edit class.</p>}

            <button style={{ backgroundColor: "lime" }} onClick={onClose}>
              close Modal
            </button>
          </div>
        </>
      )}

      {showEditableClass && (
        <>
          <div style={OVERLAY_STYLES} />
          <div style={MODAL_STYLES}>
            <Formik
              initialValues={{
                classTitle: `${eachClass.classTitle}`,
                timeDay: `${eachClass.timeDay}`,
                classType: `${eachClass.classType}`,
                subject: `${eachClass.subject}`,
                classLevel: `${eachClass.classLevel}`,
                bookedBy: `${""}`,
                groupSize: `${eachClass.groupSize}`,
              }}
              validationSchema={classesValidation}
              onSubmit={(values) => {
                console.log(values);
                handleEditClass(values);
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

                  <p>Tutees</p>
                  <div>
                    {tutees.map((tutee) => {
                      return (
                        <div key={tutee}>
                          <Field
                            type="checkbox"
                            name="bookedBy"
                            value={tutee}
                          />
                          {tutee}
                        </div>
                      );
                    })}
                  </div>
                  <br />
                  {errors.bookedBy && touched.bookedBy ? (
                    <div>{errors.bookedBy}</div>
                  ) : null}
                  {/* {!matchingLevelSub && (
              <p>Please select matching class levels and subjects.</p>
            )} */}

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
                    submit edit
                  </button>
                  {!editClassSuccessful && <p>Class unable to be edited.</p>}
                  {/* <CheckClassLevelAndSubject /> */}
                </Form>
              )}
            </Formik>
            <button style={{ backgroundColor: "lime" }} onClick={onClose}>
              close Modal
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ClassModal;
