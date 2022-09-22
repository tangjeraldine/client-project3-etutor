// import Calendar from "../../components/Calendar";

import { useEffect } from "react";
import urlcat from "urlcat";
import axios from "axios";
import { useState } from "react";
import { Field, Formik, Form, useFormikContext } from "formik";
import classesValidation from "../../Validations/classesValidation";
import ClassModal from "../../components/ClassModal";
import { format, parseISO } from "date-fns";

const SERVER = import.meta.env.VITE_SERVER;

//!!!!! tutor can only pick class level and subjects that they teach.
const MyClassesTutor = ({ user }) => {
  const [classes, setClasses] = useState([]);
  const [renderClasses, setRenderClasses] = useState(true);
  const [loadClassesSuccessful, setLoadClassesSuccessful] = useState(true);
  const [createClassSuccessful, setCreateClassSuccessful] = useState(true);
  const [deleteClassSuccessful, setDeleteClassSuccessful] = useState(true);
  const [matchingLevelSub, setMatchingLevelSub] = useState(true);
  const [tutorDetails, setTutorDetails] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [whatToOpen, setWhatToOpen] = useState("");
  const [createClass, setCreateClass] = useState(false);

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

  const priSubjects = ["Mathematics", "Science"];

  const secSubjects = [
    "Additional Mathematics",
    "Elementary Mathematics",
    "Biology",
    "Physics",
    "Chemistry",
  ];

  const CheckClassLevelAndSubject = () => {
    const { values } = useFormikContext(); //a way to excess form values globally
    useEffect(() => {
      setMatchingLevelSub(true);
      const currentLevel = values.classLevel.split(" ");
      let anyPriSub = false;
      let anySecSub = false;
      if (values.subject === "English") {
        if (currentLevel[0] === "Primary") {
          anyPriSub = true;
        } else {
          anySecSub = true;
        }
      } else if (priSubjects.indexOf(values.subject) !== -1) {
        anyPriSub = true;
      } else if (secSubjects.indexOf(values.subject) !== -1) {
        anySecSub = true;
      }
      if (values.subject === "Science") {
        if (currentLevel[0] === "Primary") {
          if (currentLevel[1] !== "1" && currentLevel[1] !== "2") {
            anyPriSub = true;
          } else {
            anyPriSub = false;
          }
        }
      }

      if (
        (currentLevel[0] === "Primary" && anyPriSub === false) ||
        (currentLevel[0] === "Primary" && anySecSub === true) ||
        (currentLevel[0] === "Secondary" && anySecSub === false) ||
        (currentLevel[0] === "Secondary" && anyPriSub === true)
      ) {
        console.log("please select matching class levels and subjects");
        setMatchingLevelSub(false);
      }
    }, [values.classLevel, values.subject]);
  };

  const handleCreateClass = (values) => {
    console.log(values);
    const urlCreateClasses = urlcat(SERVER, "/class/create-class");
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

  const handleMakeClass = () => {
    setCreateClass(!createClass);
  };

  return (
    <>
      <section
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1485322551133-3a4c27a9d925?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")`,
        }}
        class='z-1'>
        <div class='px-4 py-10 mx-auto max-w-screen-xl lg:h-96 lg:items-center lg:flex '>
          <div class='max-w-xl mx-auto text-center bg-white opacity-90 rounded z-2 p-5'>
            <h1 class='text-3xl font-extrabold sm:text-5xl z-3'>
              Hi, {tutorDetails.fullName}!
              <strong class='font-extrabold text-red-700 sm:block'>
                Welcome.
              </strong>
            </h1>

            <p class='mt-4 sm:leading-relaxed sm:text-xl z-3'>
              View your upcoming classes below, or click on this button to
              create a new class.
            </p>

            <div class='flex flex-wrap justify-center mt-4 gap-4 z-3'>
              <button
                class='block w-full px-12 py-3 text-sm font-medium text-white bg-red-700 rounded shadow sm:w-auto bg-red-700 hover:bg-white hover:text-red-700 focus:outline-none focus:ring'
                onClick={handleMakeClass}>
                {!createClass ? "Create A New Class" : "Hide Create Class Form"}
              </button>
            </div>
          </div>
        </div>
      </section>
      <br />
      <div className='flex grid-cols-2 w-screen'>
        {/* list of classes of this tutor */}
        <div className='w-1/2'>
          <h1 class='text-2xl font-bold text-left text-red-700 sm:text-3xl mt-4'>
            Upcoming Classes
          </h1>
          {classes.map((eachClass, index) => {
            const tutees = [];
            eachClass.bookedBy.map((tutee) => tutees.push(tutee.fullName));
            const timeDay = format(
              parseISO(eachClass.timeDay),
              "EEE, dd/MM/yyyy, hh:mm aaaa"
            );
            return (
              <div key={index}>
                <div class='relative block p-8 overflow-hidden border border-gray-100 rounded-lg mt-6'>
                  <span class='absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600'></span>

                  <div class='justify-between sm:flex'>
                    <div>
                      <h5 class='text-xl font-bold text-gray-900'>
                        {eachClass.classTitle}
                      </h5>

                      <p class='mt-1 text-xs font-medium text-gray-600'>
                        Subject: {eachClass.subject}
                      </p>
                    </div>
                    <div class='flex-shrink-0 hidden ml-3 sm:block'>
                      <button
                        class='block mt-2 px-4 py-2 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '
                        onClick={() => handleModal(index)}>
                        details
                      </button>
                      <button
                        class='block mt-2 px-4 py-2 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '
                        onClick={() => handleRemoveClass(eachClass._id)}>
                        remove class
                      </button>
                    </div>
                  </div>

                  <div class='mt-4 sm:pr-8'>
                    <p class='text-sm text-gray-500'>
                      Class Level: {eachClass.classLevel} <br />
                      Tutees: {tutees.join(", ") || "none"} <br />
                      Total Group Size: {eachClass.groupSize}
                    </p>
                  </div>

                  <dl class='flex mt-6'>
                    <div class='flex flex-col-reverse'>
                      <dt class='text-sm font-medium text-gray-600'>
                        {timeDay}
                      </dt>
                      <dd class='text-xs text-gray-500'>Date and Time</dd>
                    </div>

                    <div class='flex flex-col-reverse ml-3 sm:ml-6'>
                      <dt class='text-sm font-medium text-gray-600'>
                        {eachClass.classType}
                      </dt>
                      <dd class='text-xs text-gray-500'>Class Type</dd>
                    </div>
                  </dl>
                </div>
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
          CheckClassLevelAndSubject={CheckClassLevelAndSubject}
          matchingLevelSub={matchingLevelSub}
          setMatchingLevelSub={setMatchingLevelSub}
        />
        {createClass ? (
          <div class='px-1 py-4 mx-auto w-1/2 sm:px-6 lg:px-8 bg-amber-100 rounded'>
            <div class='max-w-lg mx-auto'>
              <h1 class='text-2xl font-bold text-left text-red-700 sm:text-3xl'>
                Add A New Class
              </h1>

              <Formik
                initialValues={{
                  classTitle: "",
                  timeDay: "",
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
                }}>
                {({ handleChange, handleBlur, values, errors, touched }) => (
                  <Form className='w-1/2'>
                    <p className='mt-6'>Class Title</p>
                    <Field
                      name='classTitle'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.classTitle}
                      class='w-full mt-2 p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm'
                    />
                    {errors.classTitle && touched.classTitle ? (
                      <div>{errors.classTitle}</div>
                    ) : null}
                    <br />

                    <p className='mt-6'>Date and Time</p>
                    <input
                      type='datetime-local'
                      name='timeDay'
                      value={values.timeDay}
                      onChange={handleChange}
                      class='w-full mt-2 p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm'
                    />
                    {errors.timeDay && Object.keys(touched).length === 5 ? (
                      <div>{errors.timeDay}</div>
                    ) : null}
                    <br />

                    <p className='mt-6'>Class Type</p>
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

                    <p className='mt-6'>Subject</p>
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
                    <br />

                    <p className='mt-6'>Class Level</p>
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
                    <p className='mt-6'>Group Size</p>
                    <Field
                      name='groupSize'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.groupSize}
                      class='w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm'
                    />
                    {errors.groupSize && touched.groupSize ? (
                      <div>{errors.groupSize}</div>
                    ) : null}
                    <br />
                    <button
                      type='submit'
                      disabled={
                        !(
                          Object.keys(errors).length === 0 &&
                          Object.keys(touched).length !== 0 &&
                          matchingLevelSub
                        )
                      }
                      class='block mt-6 px-5 py-2 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '>
                      Create New Class
                    </button>
                    {!createClassSuccessful && (
                      <p>Class unable to be created.</p>
                    )}
                    <CheckClassLevelAndSubject />
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        ) : (
          <div className='w-1/2'></div>
        )}
      </div>
    </>
  );
};

export default MyClassesTutor;
