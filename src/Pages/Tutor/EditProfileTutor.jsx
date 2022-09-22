import { useNavigate } from "react-router-dom";
import signUpAsTutorValidation from "../../Validations/signUpAsTutorValidation";
import { Field, Formik, Form, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import urlcat from "urlcat";

const SERVER = import.meta.env.VITE_SERVER;

const EditTutorProfile = ({ user }) => {
  const [isTutorProfileSetUp, setIsTutorProfileSetUp] = useState(true);
  const [matchingLevelSub, setMatchingLevelSub] = useState(true);
  const [tutorData, setTutorData] = useState({});
  const [wantToEdit, setWantToEdit] = useState(false);

  const navigate = useNavigate();
  // console.log(user);

  //* First fetch on load
  useEffect(() => {
    const url = urlcat(SERVER, `/tutor/editprofile/${user._id}`);
    axios
      .get(url)
      .then(({ data }) => {
        setTutorData(data);
        // console.log(data);
      })
      .catch((error) => {
        if (error.response.data.error === "Tutor not found.") {
          console.log("Tutor not found.");
          // error page
        }
      });
  }, []);

  //* Update fetch on clicking "Update Profile"
  const handleUpdateTutorProfile = (values) => {
    setWantToEdit(false);
    setTutorData(values);
    const url = urlcat(SERVER, `/tutor/editprofile/${user._id}`);
    axios
      .put(url, values)
      .then(({ data }) => {
        console.log(data);
        navigate("/tutor/editprofile");
      })
      .catch((error) => {
        if (error.response.data.error === "Tutor profile was not updated.") {
          console.log("Tutor profile was not updated.");
          // error page
        }
      });
  };

  const priSubjects = ["Mathematics", "Science"];

  const secSubjects = [
    "Additional Mathematics",
    "Elementary Mathematics",
    "Biology",
    "Physics",
    "Chemistry",
  ];

  const priClassLevel = [
    "Primary 1",
    "Primary 2",
    "Primary 3",
    "Primary 4",
    "Primary 5",
    "Primary 6",
  ];

  const secClassLevel = [
    "Secondary 1",
    "Secondary 2",
    "Secondary 3",
    "Secondary 4",
    "Secondary 5",
  ];

  const CheckClassLevelAndSubject = () => {
    const { values } = useFormikContext(); //a way to excess form values globally
    useEffect(() => {
      setMatchingLevelSub(true);
      let anyPriLevel = false;
      let anySecLevel = false;
      let anyPriSub = false;
      let anySecSub = false;
      let anyLowerPri = false;
      let anyUpperPri = false;
      values.classLevel.map((level) => {
        if (level.split(" ")[0] === "Primary") {
          anyPriLevel = true;
          if (level.split(" ")[1] !== "1" && level.split(" ")[1] !== "2") {
            anyUpperPri = true; //if tkde lower level
          } else {
            anyLowerPri = true;
          }
        } else if (level.split(" ")[0] === "Secondary") {
          anySecLevel = true;
        }
      });

      values.subjects.map((subject) => {
        if (subject === "English") {
          if (anyPriLevel === true) {
            anyPriSub = true;
          }
          if (anySecLevel === true) {
            anySecSub = true;
          }
        } else if (priSubjects.indexOf(subject) !== -1) {
          anyPriSub = true;
        } else if (secSubjects.indexOf(subject) !== -1) {
          anySecSub = true;
        }
        if (subject === "Science") {
          if (
            anyUpperPri === false ||
            (values.subjects.indexOf("Mathematics") === -1 &&
              values.subjects.indexOf("English") === -1 &&
              anyLowerPri === true)
          ) {
            anyPriSub = false;
          }
        }
      });

      if (
        (anyPriLevel === true && anyPriSub === false) ||
        (anyPriLevel === false && anyPriSub === true) ||
        (anySecLevel === true && anySecSub === false) ||
        (anySecLevel === false && anySecSub === true)
      ) {
        console.log("please select matching class levels and subjects");
        setMatchingLevelSub(false);
      }
    }, [values.classLevel, values.subjects]);
  };

  const handleEdit = () => {
    setWantToEdit(true);
  };

  if (!wantToEdit) {
    return (
      <section class='relative flex flex-wrap lg:h-screen lg:items-center'>
        <div class='relative w-full h-64 sm:h-96 lg:w-1/3 lg:h-full '>
          <img
            alt='Welcome'
            src='https://images.unsplash.com/photo-1663172774679-795197766f5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            class='absolute inset-0 object-cover w-full h-full'
          />
          <div class='absolute inset-0 bg-white/40 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/20 sm:to-white/100'></div>
        </div>
        <div class='w-full px-4 py-2 lg:w-2/3 sm:px-6 lg:px-8 sm:py-2 lg:py-2'>
          <div class='max-w-lg mx-auto text-center'>
            <h1 class='text-2xl font-bold text-red-700 m-2 sm:text-3xl'>
              Edit Tutor Profile
            </h1>

            <p class='mt-3 text-gray-500'>
              Click on the button at the bottom of this page to edit your
              profile as a tutor. <br />
              To amend your user details, navigate to 'Edit User Details'
              instead.
            </p>
          </div>
          <div>
            <br />
            <p class='font-bold text-red-700 m-1 sm:text-1xl'>Full Name: </p>
            <p>{tutorData?.fullName}</p>
            <p class='font-bold text-red-700 m-1 sm:text-1xl'>Phone: </p>
            <p>{tutorData?.phone} </p>
            <p class='font-bold text-red-700 m-1 sm:text-1xl'>Region: </p>
            <p>{tutorData?.region} </p>
            <p class='font-bold text-red-700 m-1 sm:text-1xl'>
              Rates Per Lesson:{" "}
            </p>
            <p>${tutorData?.rates} </p>
            <p class='font-bold text-red-700 m-1 sm:text-1xl'>Class Type: </p>
            <p>{tutorData?.classType?.join(", ")} </p>
            <p class='font-bold text-red-700 m-1 sm:text-1xl'>Class Level: </p>
            <p>{tutorData?.classLevel?.join(", ")} </p>
            <p class='font-bold text-red-700 m-1 sm:text-1xl'>Subjects: </p>
            <p>{tutorData?.subjects?.join(", ")} </p>
            <p class='font-bold text-red-700 m-1 sm:text-1xl'>
              Education Background:{" "}
            </p>
            <p class='w-5/6'>{tutorData?.educationBackground}</p>
            <p class='font-bold text-red-700 m-1 sm:text-1xl'>
              Teaching Experience:{" "}
            </p>
            <p class='w-5/6'>{tutorData?.teachingExperience} </p>
            <button
              class='block mt-4 px-10 py-2 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '
              onClick={handleEdit}>
              Edit Profile
            </button>
            <br />
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <>
        <section class='relative flex flex-wrap lg:h-screen lg:items-center'>
          <div class='relative w-full h-64 sm:h-96 lg:w-1/3 lg:h-full '>
            <img
              alt='Welcome'
              src='https://images.unsplash.com/photo-1663172774679-795197766f5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
              class='absolute inset-0 object-cover w-full h-full'
            />
            <div class='absolute inset-0 bg-white/40 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/20 sm:to-white/100'></div>
          </div>
          <div class='w-full px-4 py-2 lg:w-2/3 sm:px-6 lg:px-8 sm:py-2 lg:py-2'>
            <div class='max-w-lg mx-auto text-center'>
              <h1 class='text-2xl font-bold text-red-700 m-2 sm:text-3xl'>
                Edit Tutor Profile
              </h1>
            </div>
            <div>
              <br />
              <Formik
                initialValues={{
                  fullName: tutorData?.fullName,
                  phone: tutorData?.phone,
                  region: tutorData?.region,
                  rates: tutorData?.rates,
                  classType: tutorData?.classType,
                  classLevel: tutorData?.classLevel,
                  subjects: tutorData?.subjects,
                  educationBackground: tutorData?.educationBackground,
                  teachingExperience: tutorData?.teachingExperience,
                }}
                validationSchema={signUpAsTutorValidation}
                onSubmit={(values) => {
                  console.log(values);
                  handleUpdateTutorProfile(values);
                }}>
                {({
                  handleChange,
                  handleBlur,
                  values,
                  errors,
                  touched,
                  initialValues,
                }) => (
                  <Form>
                    <div class='flex flex-wrap grid-cols-3 gap-3 '>
                      <div>
                        <p class='font-bold text-red-700 m-1 sm:text-1xl'>
                          Full Name:{" "}
                        </p>
                        <Field
                          name='fullName'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.fullName}
                          class='w-full h-12 mt-2 text-m text-gray-700 bg-white border-gray-200 rounded-md shadow-sm'
                        />
                        {errors.fullName && touched.fullName ? (
                          <div>{errors.fullName}</div>
                        ) : null}
                        <br />
                        <br />
                        <br />
                        <br />
                        <p class='font-bold text-red-700 m-1 sm:text-1xl'>
                          Phone:{" "}
                        </p>
                        <Field
                          name='phone'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                          class='w-full h-12 mt-2 text-m text-gray-700 bg-white border-gray-200 rounded-md shadow-sm'
                        />
                        {errors.phone && touched.phone ? (
                          <div>{errors.phone}</div>
                        ) : null}
                      </div>
                      <div>
                        <p class='font-bold text-red-700 m-1 sm:text-1xl'>
                          Region:{" "}
                        </p>
                        <Field
                          as='select'
                          name='region'
                          values={values.region}
                          onChange={handleChange}>
                          <option disabled>select</option>
                          <option value='North'>North</option>
                          <option value='South'>South</option>
                          <option value='East'>East</option>
                          <option value='West'>West</option>
                          <option value='Central'>Central</option>
                        </Field>
                        {errors.region && touched.region ? (
                          <div>{errors.region}</div>
                        ) : null}
                        <br />
                        <br />
                        <br />
                        <p class='font-bold text-red-700 m-1 sm:text-1xl'>
                          Rates per lesson:{" "}
                        </p>
                        <Field
                          name='rates'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.rates}
                          class='w-full h-12 mt-2 text-m text-gray-700 bg-white border-gray-200 rounded-md shadow-sm'
                        />
                        {errors.rates && touched.rates ? (
                          <div>{errors.rates}</div>
                        ) : null}
                        <br />
                        <br />
                        <br />
                        <p class='font-bold text-red-700 m-1 sm:text-1xl'>
                          Class Type(s):{" "}
                        </p>
                        <Field
                          type='checkbox'
                          name='classType'
                          value='In-Person'
                        />
                        In-Person
                        <Field
                          type='checkbox'
                          name='classType'
                          value='Remote'
                        />
                        Remote
                        <br />
                        {errors.classType && touched.classType ? (
                          <div>{errors.classType}</div>
                        ) : null}
                      </div>
                      <div>
                        <p class='font-bold text-red-700 m-1 sm:text-1xl'>
                          Class Level(s):{" "}
                        </p>
                        <div>
                          Primary
                          {priClassLevel.map((level) => {
                            return (
                              <div key={level}>
                                <Field
                                  type='checkbox'
                                  name='classLevel'
                                  value={level}
                                  // onClick={(event) => console.log(event.target.value)}
                                />
                                {level}
                              </div>
                            );
                          })}
                          <br />
                          Secondary
                          {secClassLevel.map((level) => {
                            return (
                              <div key={level}>
                                <Field
                                  type='checkbox'
                                  name='classLevel'
                                  value={level}
                                />
                                {level}
                              </div>
                            );
                          })}
                        </div>
                        {errors.classLevel && touched.classLevel ? (
                          <div>{errors.classLevel}</div>
                        ) : null}
                      </div>
                      <div>
                        <p class='font-bold text-red-700 m-1 sm:text-1xl'>
                          Subject(s):{" "}
                        </p>
                        <div>
                          Primary
                          {priSubjects.map((subject) => {
                            return (
                              <div key={subject}>
                                <Field
                                  type='checkbox'
                                  name='subjects'
                                  value={subject}
                                />
                                {subject}
                              </div>
                            );
                          })}
                          <br />
                          Secondary
                          {secSubjects.map((subject) => {
                            return (
                              <div key={subject}>
                                <Field
                                  type='checkbox'
                                  name='subjects'
                                  value={subject}
                                />
                                {subject}
                              </div>
                            );
                          })}
                          <br />
                          Primary/Secondary
                          <br />
                          <Field
                            type='checkbox'
                            name='subjects'
                            value='English'
                          />
                          English
                        </div>
                        {errors.subjects && touched.subjects ? (
                          <div>{errors.subjects}</div>
                        ) : null}
                        {!matchingLevelSub && (
                          <p>
                            Please select matching class levels and subjects.
                          </p>
                        )}
                      </div>
                      <div>
                        <p class='font-bold text-red-700 m-1 sm:text-1xl'>
                          Education Background:{" "}
                        </p>
                        <Field
                          name='educationBackground'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.educationBackground}
                          class='w-full h-12 mt-2 text-m text-gray-700 bg-white border-gray-200 rounded-md shadow-sm'
                        />
                        {errors.educationBackground &&
                        touched.educationBackground ? (
                          <div>{errors.educationBackground}</div>
                        ) : null}
                      </div>
                      <div>
                        <p class='font-bold text-red-700 m-1 sm:text-1xl'>
                          Teaching Experience:{" "}
                        </p>
                        <Field
                          name='teachingExperience'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.teachingExperience}
                          class='w-full h-12 mt-2 text-m text-gray-700 bg-white border-gray-200 rounded-md shadow-sm'
                        />
                        {errors.teachingExperience &&
                        touched.teachingExperience ? (
                          <div>{errors.teachingExperience}</div>
                        ) : null}
                        <br />
                      </div>
                      <div>
                        <button
                          type='submit'
                          disabled={
                            !(
                              Object.keys(errors).length === 0 &&
                              matchingLevelSub
                            )
                          }
                          class='block mt-4 px-10 py-2 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '>
                          Complete Editing
                        </button>
                      </div>

                      {!isTutorProfileSetUp && (
                        <p>Tutor profile unable to be set up.</p>
                      )}
                      <CheckClassLevelAndSubject />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default EditTutorProfile;
