// import Calendar from "../../components/Calendar";

import { useEffect } from "react";
import urlcat from "urlcat";
import axios from 'axios'
import { useState } from "react";
import { Field, Formik, Form, useFormikContext } from "formik";
import classesValidation from '../../Validations/classesValidation'

const SERVER = import.meta.env.VITE_SERVER;

//Q: since we keeping user in state, then when they refresh the page, the state will be empty...then?
//rn user state contains allll the info including pw and mongoid, thats fine right to keep in state?
//does that mean need to keep in local storage? n then empty the local storage when we logout..............????

const MyClassesTutor = ({ user }) => {

  const [classes, setClasses] = useState([])
  const [loadClassesSuccessful, setLoadClassesSuccessful] = useState(true)

  useEffect(() => {
    const url = urlcat(SERVER, "/class/get-classes");
    axios
      .get(url, user)
      .then(({ data }) => {
        console.log(data)
        if (data.length === 0) {
          console.log('no classes created yet')
        } else {
          setClasses(data)
        }
      })
      .catch((error) => {
        if (error.response.data.error === "Unable to load classes.") {
          setLoadClassesSuccessful(false);
        }
      });
  }, []);

  return (
    <>
      <h1 style={{ fontSize: "50px" }}>my classes</h1>
      {/* <Calendar /> */}

      {/* with formik, create new class */}
      <Formik
        initialValues={{
          classTitle: "",
          subject: "select",

          rates: "",
          classType: "select",
          // classLevel: 'select',
        }}
        validationSchema={signUpAsTutorValidation}
        onSubmit={(values) => {
          console.log(values);
          handleSignUpAsTutor(values);
        }}
      >
        {({ handleChange, handleBlur, values, errors, touched, initialValues }) => (
          <Form>
            <p>Class Title</p>
            <Field
              name="fullName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fullName}
            />
            {errors.fullName && touched.fullName ? (
              <div>{errors.fullName}</div>
            ) : null}
            <br />

            <p>Subjects</p>
            <div>
              Primary
              {priSubjects.map((subject) => {
                return (
                  <div key={subject}>
                    <Field type="checkbox" name="subjects" value={subject} />
                    {subject}
                  </div>
                );
              })}
              <br />
              Secondary
              {secSubjects.map((subject) => {
                return (
                  <div key={subject}>
                    <Field type="checkbox" name="subjects" value={subject} />
                    {subject}
                  </div>
                );
              })}
              <br />
              Primary/Secondary
              <br />
              <Field type="checkbox" name="subjects" value="English" />
              English
            </div>
            {errors.subjects && touched.subjects ? (
              <div>{errors.subjects}</div>
              ) : null}
            {!matchingLevelSub && (
              <p>Please select matching class levels and subjects.</p>
              )}
            <br />
            <br />

            <p></p>
            <Field
              as="select"
              name="region"
              values={values.region}
              onChange={handleChange}
            >
              <option disabled>select</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="Central">Central</option>
            </Field>
            {errors.region && touched.region ? (
              <div>{errors.region}</div>
            ) : null}
            <br />
            <br />


            {/* <p>Class Level</p>
            <div>
            Primary
            {priClassLevel.map((level) => {
              return (
                <div key={level}>
                <Field type="checkbox" name="classLevel" value={level} />
                {level}
                </div>
                );
              })}
              <br />
              Secondary
              {secClassLevel.map((level) => {
                return (
                  <div key={level}>
                  <Field type="checkbox" name="classLevel" value={level} />
                  {level}
                  </div>
                  );
                })}
                </div>
                {errors.classLevel && touched.classLevel ? (
                  <div>{errors.classLevel}</div>
                  ) : null}
                <br /> */}



              <p>Group Size</p>
              <Field
                name="groupSize"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.groupSize}
              />
              {errors.groupSize && touched.groupSize ? <div>{errors.groupSize}</div> : null}
              <br />

            <br />
            <button
              type="submit"
              disabled={
                !(
                  Object.keys(errors).length === 0 &&
                  Object.keys(touched).length ===
                    Object.keys(initialValues).length
                )
              }
              style={{ backgroundColor: "lime" }}
            >
              sign up
            </button>
            {/* {!isEmailUnique && <p>Email already in use!</p>} */}
            {!isTutorProfileSetUp && <p>Tutor profile unable to be set up.</p>}
            {/* <CheckClassLevelAndSubject /> */}
          </Form>
        )}
      </Formik>

      {/* list of classes of this tutor */}
      <div>
        {classes.map(eachClass, index => {
          return (
            <div key={index}>
              <p>Class Title: {eachClass.classTitle}</p>
              <p>Subject: {eachClass.subject}</p>
              <p>Date, Time: {eachClass.timeDay}</p>
              <p>Tutor: {eachClass.tutor}</p>
              {/* not sure if tutor is necessary since its their own account xD */}
              <p>Tutees: {eachClass.bookedBy.join(', ')}</p>
              <p>Size: {eachClass.groupSize}</p>
            </div>
          )
        })}
        {!loadClassesSuccessful && <p>Unable to load classes.</p>}
      </div>
    </>
  );
};

export default MyClassesTutor;
