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
}) => {
  if (!open) return null;

  const [editClassSuccessful, setEditClassSuccessful] = useState(true);
  const [showEditableClass, setShowEditableClass] = useState(false);
  const [tuteeDetails, setTuteeDetails] = useState([]);
  const [matchingTutees, setMatchingTutees] = useState(true);

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

  const CheckMatchingTutees = () => {
    const { values } = useFormikContext(); //a way to excess form values globally
    useEffect(() => {
      setMatchingTutees(true);
      //just the id..so for each tutee id...
      values.bookedBy.map((tutee) => {
        const bookedTuteeDetails = tuteeDetails.filter(
          (details) => details._id === tutee
        );
        const tuteeLevel = bookedTuteeDetails[0].currentLevel;
        const tuteeSubject = bookedTuteeDetails[0].subjects;

        if (
          values.classLevel !== tuteeLevel ||
          !tuteeSubject.includes(values.subject)
        ) {
          setMatchingTutees(false);
        }
      });
    }, [values.classLevel, values.subject, values.bookedBy]);
  };

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
            <div style={{ fontSize: "30px" }}>Full Class Details:</div>
            <p className='font-bold'>Class Title: </p>
            <p> {eachClass.classTitle}</p>
            <p className='font-bold'>Date and Time: </p>
            <p>{timeDay}</p>
            <p className='font-bold'>Class Type: </p>
            <p>{eachClass.classType}</p>
            <p className='font-bold'>Subject: </p>
            <p>{eachClass.subject}</p>
            <p className='font-bold'>Class Level: </p>
            <p>{eachClass.classLevel}</p>
            <p className='font-bold'>Tutees: </p>
            <p>{bookedByFullName.join(", ") || "none"}</p>
            <p className='font-bold'>Total Group Size: </p>
            <p>{eachClass.groupSize}</p>

            <button
              class='block mt-2 px-4 py-2 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '
              onClick={() => setShowEditableClass(true)}>
              Edit
            </button>
            {!editClassSuccessful && <p>Unable to edit class.</p>}

            <button
              class='block mt-2 px-4 py-2 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '
              onClick={onClose}>
              Close
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
              }}>
              {({ handleChange, handleBlur, values, errors, touched }) => (
                <Form>
                  <p className='font-bold'>Class Title</p>
                  <Field
                    name='classTitle'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.classTitle}
                  />
                  {errors.classTitle && touched.classTitle ? (
                    <div>{errors.classTitle}</div>
                  ) : null}
                  <br />
                  <p className='font-bold'>Subject</p>
                  <Field
                    as='select'
                    name='subject'
                    value={values.subject}
                    onChange={handleChange}>
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

                  <p className='font-bold'>Class Level</p>
                  <Field
                    as='select'
                    name='classLevel'
                    value={values.classLevel}
                    onChange={handleChange}>
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

                  <p className='font-bold'>Date and Time</p>
                  <input
                    type='datetime-local'
                    name='timeDay'
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

                  <p className='font-bold'>Class Type</p>
                  <Field
                    as='select'
                    name='classType'
                    value={values.classType}
                    onChange={handleChange}>
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

                  <p className='font-bold'>Tutees</p>
                  <div>
                    {tuteeDetails.map((tutee) => (
                      <div key={tutee._id}>
                        <Field
                          type='checkbox'
                          name='bookedBy'
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
                  {!matchingTutees && (
                    <p>Please select tutees with valid subject and level.</p>
                  )}

                  <p className='font-bold'>Total Group Size</p>
                  <Field
                    name='groupSize'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.groupSize}
                  />
                  {errors.groupSize && touched.groupSize ? (
                    <div>{errors.groupSize}</div>
                  ) : null}
                  <br />

                  <button
                    type='submit'
                    disabled={
                      !(Object.keys(errors).length === 0 && matchingLevelSub)
                    }
                    class='block mt-2 px-4 py-2 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '>
                    Submit Changes
                  </button>
                  {!editClassSuccessful && <p>Class unable to be edited.</p>}
                  <CheckClassLevelAndSubject />
                  <CheckMatchingTutees />
                </Form>
              )}
            </Formik>
            <button
              class='block mt-2 px-4 py-2 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '
              onClick={onClose}>
              Close
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ClassModal;
