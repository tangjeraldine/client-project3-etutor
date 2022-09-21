import { useNavigate } from "react-router-dom";
import signUpAsTutorValidation from "../../Validations/signUpAsTutorValidation";
import { Field, Formik, Form, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import urlcat from "urlcat";
import Footer from "../General Pages/Footer";

const SERVER = import.meta.env.VITE_SERVER;

const SignUpTutor = () => {
  const [isTutorProfileSetUp, setIsTutorProfileSetUp] = useState(true);
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

  const handleSignUpAsTutor = (values) => {
    setIsTutorProfileSetUp(true);
    const url = urlcat(SERVER, "/tutor/profile-signup");
    axios
      .post(url, values)
      .then(({ data }) => {
        navigate("/tutor");
      })
      .catch((error) => {
        if (
          error.response.data.error === "Tutor profile unable to be set up."
        ) {
          setIsTutorProfileSetUp(false);
        }
      });
  };

  return (
    <>
      <section className='bg-yellow-300'>
        <div class='max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8 sm:py-24'>
          <div class='max-w-3xl'>
            <h2 class='text-3xl font-bold sm:text-4xl text-red-500'>
              Congrats on your first step! &#127881; &#127881; &#127881;
              <br />
              But you don't have a profile yet. Set one up to let others notice
              your listing!
            </h2>
          </div>

          <div class='grid grid-cols-1 gap-8 mt-8 lg:gap-16 lg:grid-cols-2'>
            <div class='relative h-64 overflow-hidden sm:h-80 lg:h-full'>
              <img
                alt='Party'
                src='https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80'
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
                  rates: "",
                  classType: [],
                  classLevel: [],
                  subjects: [],
                  educationBackground: "",
                  teachingExperience: "",
                }}
                validationSchema={signUpAsTutorValidation}
                onSubmit={(values) => {
                  console.log(values);
                  handleSignUpAsTutor(values);
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
                    <p className='font-bold'>Full Name</p>
                    <Field
                      name='fullName'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fullName}
                      class='w-full p-3 text-sm border-gray-200 rounded-lg'
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
                      class='w-full p-3 text-sm border-gray-200 rounded-lg'
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
                    <p className='font-bold'>Rate per lesson (in SGD)</p>
                    <Field
                      name='rates'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.rates}
                      class='w-48 p-3 text-sm border-gray-200 rounded-lg'
                    />
                    {errors.rates && touched.rates ? (
                      <div>{errors.rates}</div>
                    ) : null}
                    <br />
                    <p className='font-bold'>Class Type</p>
                    <Field type='checkbox' name='classType' value='In-Person' />
                    In-Person
                    <Field type='checkbox' name='classType' value='Remote' />
                    Remote
                    <br />
                    {errors.classType && touched.classType ? (
                      <div>{errors.classType}</div>
                    ) : null}
                    <br />
                    <p className='font-bold'>Class Level</p>
                    <div>
                      <p className='text-decoration-line: underline'>
                        Primary Levels
                      </p>
                      {priClassLevel.map((level) => {
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
                      <br />
                      <p className='text-decoration-line: underline'>
                        Secondary Levels
                      </p>
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
                    <p className='font-bold'>Education Background</p>
                    <Field
                      name='educationBackground'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.educationBackground}
                      class='w-full p-3 text-sm border-gray-200 rounded-lg'
                    />
                    {errors.educationBackground &&
                    touched.educationBackground ? (
                      <div>{errors.educationBackground}</div>
                    ) : null}
                    <p className='font-bold'>Teaching Experience</p>
                    <Field
                      name='teachingExperience'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.teachingExperience}
                      class='w-full p-3 text-sm border-gray-200 rounded-lg'
                    />
                    {errors.teachingExperience && touched.teachingExperience ? (
                      <div>{errors.teachingExperience}</div>
                    ) : null}
                    <br />
                    <button
                      type='submit'
                      disabled={
                        !(
                          Object.keys(errors).length === 0 &&
                          Object.keys(touched).length !== 0
                        )
                      }
                      class='block mt-4 px-10 py-2 text-sm font-medium text-white transition bg-red-500 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '>
                      Save My Profile
                    </button>
                    {!isTutorProfileSetUp && (
                      <p>Tutor profile unable to be set up.</p>
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

export default SignUpTutor;
