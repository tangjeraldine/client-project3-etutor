import { useNavigate } from "react-router-dom";
import signUpAsTuteeValidation from "../../Validations/signUpAsTuteeValidation";
import { Field, Formik, Form, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import urlcat from "urlcat";
import Footer from "../General Pages/Footer";

const SERVER = import.meta.env.VITE_SERVER;

const SignUpTutee = () => {
  const [isTuteeProfileSetUp, setIsTuteeProfileSetUp] = useState(true);
  const [matchingLevelSub, setMatchingLevelSub] = useState(true);
  const navigate = useNavigate();

  const regions = ["North", "South", "East", "West", "Central"];

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
      values.subjects.map((subject) => {
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

  const handleSignUpAsTutee = (values) => {
    setIsTuteeProfileSetUp(true);
    const url = urlcat(SERVER, "/tutee/profile-signup"); //need to check that server url is the same
    axios
      .post(url, values)
      .then(({ data }) => {
        navigate("/tutee");
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response.data.error === "Tutee profile unable to be set up."
        ) {
          setIsTuteeProfileSetUp(false);
        } else {
          setIsEmailUnique(false); //only email is unique, if wan phone to be unique need add another condition/alert
        }
      });
  };

  return (
    <>
      <section className='bg-yellow-300'>
        <div class='max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8 sm:py-24'>
          <div class='max-w-3xl'>
            <h2 class='text-3xl font-bold sm:text-4xl text-red-500'>
              Hey there. We're glad you're here! &#127881; &#127881; &#127881;
              <br />
              Set up your profile to start searching for a tutor!
            </h2>
          </div>

          <div class='grid grid-cols-1 gap-8 mt-8 lg:gap-16 lg:grid-cols-2'>
            <div class='relative h-64 overflow-hidden sm:h-80 lg:h-full'>
              <img
                alt='Party'
                src='https://images.unsplash.com/photo-1530099486328-e021101a494a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1547&q=80'
                class='absolute inset-0 object-cover w-full h-full'
              />
            </div>

            <div class='lg:py-6'>
              {/* using formik */}
              <Formik
                initialValues={{
                  fullName: "",
                  phone: "",
                  region: "select",
                  preferredContactMode: "select",
                  currentLevel: "select",
                  subjects: [],
                }}
                validationSchema={signUpAsTuteeValidation}
                onSubmit={(values) => handleSignUpAsTutee(values)}>
                {({
                  handleChange,
                  handleBlur,
                  values,
                  errors,
                  touched,
                  initialValues,
                }) => (
                  <Form>
                    <p className='font-bold'>Full Name</p>
                    <Field
                      name='fullName'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fullName}
                    />
                    {errors.fullName && touched.fullName ? (
                      <div>{errors.fullName}</div>
                    ) : null}
                    <br />

                    <p className='font-bold'>Phone</p>
                    <Field
                      name='phone'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone}
                    />
                    {errors.phone && touched.phone ? (
                      <div>{errors.phone}</div>
                    ) : null}
                    <br />

                    <p className='font-bold'>Region</p>
                    <Field
                      as='select'
                      name='region'
                      values={values.region}
                      onChange={handleChange}>
                      <option disabled>select</option>
                      {regions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </Field>
                    {errors.region && touched.region ? (
                      <div>{errors.region}</div>
                    ) : null}
                    <br />
                    <p className='font-bold'>Preferred Contact Mode</p>
                    <Field
                      as='select'
                      name='preferredContactMode'
                      values={values.preferredContactMode}
                      onChange={handleChange}>
                      <option disabled>select</option>
                      <option value='Phone Call'>Phone Call</option>
                      <option value='Email'>Email</option>
                      <option value='WhatsApp Message'>WhatsApp Message</option>
                    </Field>
                    {errors.preferredContactMode &&
                    touched.preferredContactMode ? (
                      <div>{errors.preferredContactMode}</div>
                    ) : null}
                    <br />
                    <br />

                    <p className='font-bold'>Class Level</p>
                    <Field
                      as='select'
                      name='currentLevel'
                      values={values.currentLevel}
                      onChange={handleChange}>
                      <option disabled>select</option>
                      {priClassLevel.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                      {secClassLevel.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </Field>
                    {errors.currentLevel && touched.currentLevel ? (
                      <div>{errors.currentLevel}</div>
                    ) : null}
                    <br />
                    <p className='font-bold'>Subjects</p>
                    <div>
                      <p className='text-decoration-line: underline'>
                        Primary Level Subjects
                      </p>
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
                      <p className='text-decoration-line: underline'>
                        Secondary Level Subjects
                      </p>
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
                      <p className='text-decoration-line: underline'>
                        Primary/Secondary Subject(s)
                      </p>
                      <Field type='checkbox' name='subjects' value='English' />
                      English
                    </div>
                    {errors.subjects && touched.subjects ? (
                      <div>{errors.subjects}</div>
                    ) : null}
                    {!matchingLevelSub && (
                      <p>Please select matching class levels and subjects.</p>
                    )}
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
                      class='block mt-4 px-10 py-2 text-sm font-medium text-white transition bg-red-500 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '>
                      Save My Profile
                    </button>
                    {!isTuteeProfileSetUp && (
                      <p>Tutee profile unable to be set up.</p>
                    )}
                    <CheckClassLevelAndSubject />
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SignUpTutee;
