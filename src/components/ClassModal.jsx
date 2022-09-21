import { useState, useEffect } from "react";
import { Field, Formik, Form, useFormikContext } from "formik";
import classesValidation from "../Validations/classesValidation";
import urlcat from "urlcat";
import axios from "axios";
import { format, parseISO } from "date-fns";

const SERVER = import.meta.env.VITE_SERVER;

const ClassModal = ({
  open,
  eachClass,
  onClose,
  tutorDetails,
  setRenderClasses,
  renderClasses,
  CheckClassLevelAndSubject,
  matchingLevelSub,
  setMatchingLevelSub,
}) => {
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

  const bookedByFullName = [];
  const bookedById = [];
  eachClass.bookedBy.map((tutee) => {
    bookedByFullName.push(tutee.fullName);
    bookedById.push(tutee._id);
  });

  useEffect(() => {
    //access tutees database and find all tutees of this tutor
    const urlTuteeDetails = urlcat(
      SERVER,
      `/tutee/myClasses/${tutorDetails._id}`
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
    const urlEditClass = urlcat(
      SERVER,
      `/class/edit-class/${eachClass._id}/${tutorDetails._id}`
    );
    // values.timeDay = new Date(values.timeDay);
    axios
      .put(urlEditClass, values)
      .then(({ data }) => {
        console.log(data);
        setShowEditableClass(!showEditableClass);
      })
      .catch((error) => {
        if (
          error.response?.data?.error === "Unable to edit class." ||
          error.response?.data?.error === "Class not found."
        ) {
          setEditClassSuccessful(false);
        }
      });
  };

  const timeDay = format(
    parseISO(eachClass.timeDay),
    "EEE, dd/MM/yyyy, hh:mm aaaa"
  );
  const timeDayForInput = format(
    parseISO(eachClass.timeDay),
    "yyyy-MM-dd'T'hh:mm"
  );

  return (
    <>
      {!showEditableClass && (
        <>
          <div style={OVERLAY_STYLES} />
          <div style={MODAL_STYLES}>
            <div style={{ fontSize: "30px" }}>Class modal</div>
            <p>Class Title: {eachClass.classTitle}</p>
            <p>Date, Time: {timeDay}</p>
            <p>Class Type: {eachClass.classType}</p>
            <p>Subject: {eachClass.subject}</p>
            <p>Class Level: {eachClass.classLevel}</p>
            <p>Tutees: {bookedByFullName.join(", ") || "none"}</p>
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
                classTitle: eachClass.classTitle,
                timeDay: timeDayForInput,
                classType: eachClass.classType,
                subject: eachClass.subject,
                classLevel: eachClass.classLevel,
                bookedBy: bookedById,
                groupSize: eachClass.groupSize,
                tutor: eachClass.tutor,
              }}
              validationSchema={classesValidation}
              onSubmit={(values) => {
                setRenderClasses(!renderClasses);
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
                    value={values.subject}
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
                    value={values.classLevel}
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
                  {!matchingLevelSub && (
                    <p>Please select matching class levels and subjects.</p>
                  )}
                  <br />
                  <br />

                  <p>Date and Time</p>
                  <input
                    type="datetime-local"
                    name="timeDay"
                    value={format(
                      parseISO(values.timeDay),
                      "yyyy-MM-dd'T'hh:mm"
                    )}
                    onChange={handleChange}
                  />
                  {errors.timeDay && Object.keys(touched).length === 5 ? (
                    <div>{errors.timeDay}</div>
                  ) : null}
                  <br />
                  <br />

                  <p>Class Type</p>
                  <Field
                    as="select"
                    name="classType"
                    value={values.classType}
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
                    {tuteeDetails.map((tutee) => (
                      <div key={tutee._id}>
                        <Field
                          type="checkbox"
                          name="bookedBy"
                          value={tutee._id}
                        />
                        {tutee.fullName}
                      </div>
                    ))}
                  </div>
                  <br />
                  {errors.bookedBy && touched.bookedBy ? (
                    <div>{errors.bookedBy}</div>
                  ) : null}

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
                      !(Object.keys(errors).length === 0 && matchingLevelSub)
                    }
                    style={{ backgroundColor: "lime" }}
                  >
                    submit edit
                  </button>
                  {!editClassSuccessful && <p>Class unable to be edited.</p>}
                  <CheckClassLevelAndSubject />
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
