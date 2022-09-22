import { useNavigate } from "react-router-dom";
import signUpAsTuteeValidation from "../../Validations/signUpAsTuteeValidation";
import { Field, Formik, Form, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import urlcat from "urlcat";

const SERVER = import.meta.env.VITE_SERVER;

const EditTuteeProfile = ({ user }) => {
  const [isTuteeProfileSetUp, setIsTuteeProfileSetUp] = useState(true);
  const [matchingLevelSub, setMatchingLevelSub] = useState(true);
  const [tuteeData, setTuteeData] = useState({});
  const [wantToEdit, setWantToEdit] = useState(false);

  const navigate = useNavigate();
  // console.log(user);

  //* First fetch on load
  useEffect(() => {
    const url = urlcat(SERVER, `/tutee/editprofile/${user._id}`);
    axios
      .get(url)
      .then(({ data }) => {
        setTuteeData(data);
        // console.log(data);
      })
      .catch((error) => {
        if (error.response.data.error === "Tutee profile not found.") {
          console.log("Tutee profile not found.");
          // error page
        }
      });
  }, []);

  //* Update fetch on clicking "Update Profile"
  const handleUpdateTuteeProfile = (values) => {
    setWantToEdit(false);
    setTuteeData(values);
    const url = urlcat(SERVER, `/tutee/editprofile/${user._id}`);
    axios
      .put(url, values)
      .then(({ data }) => {
        console.log(data);
        navigate("/tutee/editprofile");
      })
      .catch((error) => {
        if (error.response.data.error === "Tutee profile was not updated.") {
          console.log("Tutee profile was not updated.");
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
      const currentLevel = values.currentLevel.split(" ");
      let anyPriSub = false;
      let anySecSub = false;
      values?.subjects?.map((subject) => {
        if (subject === "English") {
          if (currentLevel[0] === "Primary") {
            anyPriSub = true;
          } else {
            anySecSub = true;
          }
        } else if (priSubjects.indexOf(subject) !== -1) {
          anyPriSub = true;
        } else if (secSubjects.indexOf(subject) !== -1) {
          anySecSub = true;
        }
        if (subject === "Science") {
          if (currentLevel[0] === "Primary") {
            if (currentLevel[1] !== "1" && currentLevel[1] !== "2") {
              anyPriSub = true;
            } else {
              anyPriSub = false;
            }
          }
        }
      });

      if (
        (currentLevel[0] === "Primary" && anyPriSub === false) ||
        (currentLevel[0] === "Primary" && anySecSub === true) ||
        (currentLevel[0] === "Secondary" && anySecSub === false) ||
        (currentLevel[0] === "Secondary" && anyPriSub === true)
      ) {
        console.log("please select matching class levels and subjects");
        setMatchingLevelSub(false);
      }
    }, [values.currentLevel, values.subjects]);
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
              Edit Tutee Profile
            </h1>

            <p class='mt-3 text-gray-500'>
              Click on the button at the bottom of this page to edit your
              profile as a tutee. <br />
              To amend your user details, navigate to 'Edit User Details'
              instead.
            </p>
          </div>
          <div>
            <br />
            <p class='font-bold text-red-700 m-1 sm:text-1xl'>Full Name: </p>
            <p>{tuteeData?.fullName}</p>
            <p class='font-bold text-red-700 m-1 sm:text-1xl'>Phone: </p>
            <p>{tuteeData?.phone} </p>
            <p class='font-bold text-red-700 m-1 sm:text-1xl'>
              Preferred Contact Mode:{" "}
            </p>
            <p>{tuteeData?.preferredContactMode} </p>
            <p class='font-bold text-red-700 m-1 sm:text-1xl'>Class Level: </p>
            <p>{tuteeData?.currentLevel} </p>
            <p class='font-bold text-red-700 m-1 sm:text-1xl'>Region: </p>
            <p>{tuteeData?.region} </p>
            <p class='font-bold text-red-700 m-1 sm:text-1xl'>Subjects: </p>
            <p>{tuteeData?.subjects?.join(", ")} </p>
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
                Edit Tutee Profile
              </h1>
            </div>
            <div>
              <br />
              <Formik
                initialValues={{
                  fullName: tuteeData?.fullName,
                  phone: tuteeData?.phone,
                  preferredContactMode: tuteeData?.preferredContactMode,
                  currentLevel: tuteeData?.currentLevel,
                  region: tuteeData?.region,
                  subjects: tuteeData?.subjects,
                }}
                validationSchema={signUpAsTuteeValidation}
                onSubmit={(values) => {
                  console.log(values);
                  handleUpdateTuteeProfile(values);
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
                    <div class='flex flex-wrap grid-cols-3 gap-5'>
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

                      <br />
                      <div>
                        <p class='font-bold text-red-700 m-1 sm:text-1xl'>
                          New Preferred Contact Mode:{" "}
                        </p>
                        <Field
                          as='select'
                          name='preferredContactMode'
                          values={values.preferredContactMode}
                          onChange={handleChange}>
                          <option disabled>select</option>
                          <option value='Email'>Email</option>
                          <option value='WhatsApp Message'>
                            WhatsApp Message
                          </option>
                          <option value='Phone Call'>Phone Call</option>
                        </Field>
                        {errors.preferredContactMode &&
                        touched.preferredContactMode ? (
                          <div>{errors.preferredContactMode}</div>
                        ) : null}
                        <br />
                        <br />
                        <p class='font-bold text-red-700 m-1 sm:text-1xl'>
                          Class Level:{" "}
                        </p>
                        <Field
                          as='select'
                          name='currentLevel'
                          values={values.currentLevel}
                          onChange={handleChange}>
                          <option disabled>select</option>
                          {priClassLevel.map((level) => (
                            <option value={level}>{level}</option>
                          ))}
                          {secClassLevel.map((level) => (
                            <option value={level}>{level}</option>
                          ))}
                        </Field>
                        {errors.currentLevel && touched.currentLevel ? (
                          <div>{errors.currentLevel}</div>
                        ) : null}
                        <br />
                        <br />
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
                      </div>

                      <br />
                      <br />
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

                        <br />
                        <button
                          type='submit'
                          disabled={
                            !(
                              Object.keys(errors).length === 0 &&
                              matchingLevelSub
                            )
                          }
                          class='block mt-2 px-10 py-2 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '>
                          Complete Editing
                        </button>
                      </div>

                      {!isTuteeProfileSetUp && (
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

export default EditTuteeProfile;
