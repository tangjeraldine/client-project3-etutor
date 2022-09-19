import { useNavigate } from "react-router-dom";
import classesValidation from "../../Validations/classesValidation";
import { Field, Formik, Form, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import urlcat from "urlcat";

const SERVER = import.meta.env.VITE_SERVER;

const EditTuteeProfile = ({ user }) => {
  const [tuteeData, setTuteeData] = useState({});
  const [wantToEdit, setWantToEdit] = useState(false);

  const navigate = useNavigate();
  // console.log(user);

  useEffect(() => {
    const url = urlcat(SERVER, `/tutee/editprofile/${user._id}`);
    axios
      .get(url)
      .then(({ data }) => {
        setTuteeData(data);
        // console.log(data);
      })
      .catch((error) => {
        if (error.response.data.error === "Tutee not found.") {
          console.log("Tutee not found.");
          // error page
        }
      });
  }, []);

  const handleEdit = () => {
    setWantToEdit(true);
  };

  const handleCompleteEditing = () => {
    setWantToEdit(false);
  };

  if (!wantToEdit) {
    return (
      <div>
        <h1 style={{ fontSize: "30px" }}>Edit Tutee Profile</h1>
        <br />
        <p>Full Name: </p>
        <p> {tuteeData.fullName}</p>
        <p>Phone: </p>
        <p>{tuteeData.phone} </p>
        <p>Region: </p>
        <p>{tuteeData.region} </p>
        <p>Rates Per Lesson: </p>
        <p>${tuteeData.rates} </p>
        <p>Class Type: </p>
        <p>{tuteeData.classType.join(", ")} </p>
        <p>Class Level: </p>
        <p>{tuteeData.classLevel.join(", ")} </p>
        <p>Subjects: </p>
        <p>{tuteeData.subjects.join(", ")} </p>
        <p>Education Background: </p>
        <p>{tuteeData.educationBackground}</p>
        <p>Teaching Experience: </p>
        <p>{tuteeData.teachingExperience} </p>
        <button style={{ backgroundColor: "lime" }} onClick={handleEdit}>
          Edit Profile
        </button>
        <br />
      </div>
    );
  } else {
    return (
      <>
        <h1 style={{ fontSize: "30px" }}>Edit Tutor Profile</h1>

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
              <p>Full Name: </p>
              <p>{tuteeData.fullName}</p>
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
              <p>Phone: </p>
              <p>{tuteeData.phone}</p>
              <Field
                name='phone'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
              {errors.phone && touched.phone ? <div>{errors.phone}</div> : null}
              <br />
              <p>Region: </p>
              <p>{tuteeData.region}</p>
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
              <p>Rates per lesson: </p>
              <p>{tuteeData.rates}</p>
              <Field
                name='rates'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.rates}
              />
              {errors.rates && touched.rates ? <div>{errors.rates}</div> : null}
              <br />
              <p>Class Type: </p>
              <p>{tuteeData.classType}</p>
              <Field type='checkbox' name='classType' value='In-Person' />
              In-Person
              <Field type='checkbox' name='classType' value='Remote' />
              Remote
              <br />
              {errors.classType && touched.classType ? (
                <div>{errors.classType}</div>
              ) : null}
              <br />
              <br />
              <p>Class Level: </p>
              <p>{tuteeData.classLevel}</p>
              <div>
                Primary
                {priClassLevel.map((level) => {
                  return (
                    <div key={level}>
                      <Field type='checkbox' name='classLevel' value={level} />
                      {level}
                    </div>
                  );
                })}
                <br />
                Secondary
                {secClassLevel.map((level) => {
                  return (
                    <div key={level}>
                      <Field type='checkbox' name='classLevel' value={level} />
                      {level}
                    </div>
                  );
                })}
              </div>
              {errors.classLevel && touched.classLevel ? (
                <div>{errors.classLevel}</div>
              ) : null}
              <br />
              <p>Subjects: </p>
              <p>{tuteeData.subjects}</p>
              <div>
                Primary
                {priSubjects.map((subject) => {
                  return (
                    <div key={subject}>
                      <Field type='checkbox' name='subjects' value={subject} />
                      {subject}
                    </div>
                  );
                })}
                <br />
                Secondary
                {secSubjects.map((subject) => {
                  return (
                    <div key={subject}>
                      <Field type='checkbox' name='subjects' value={subject} />
                      {subject}
                    </div>
                  );
                })}
                <br />
                Primary/Secondary
                <br />
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
              <br />
              <p>Education Background: </p>
              <p>{tuteeData.educationBackground}</p>
              <Field
                name='educationBackground'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.educationBackground}
              />
              {errors.educationBackground && touched.educationBackground ? (
                <div>{errors.educationBackground}</div>
              ) : null}
              <p>Teaching Experience: </p>
              <p>{tuteeData.teachingExperience}</p>
              <Field
                name='teachingExperience'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.teachingExperience}
              />
              {errors.teachingExperience && touched.teachingExperience ? (
                <div>{errors.teachingExperience}</div>
              ) : null}
              <br />
              <button
                type='submit'
                // disabled={
                //   !(
                //     Object.keys(errors).length === 0 &&
                //     Object.keys(touched).length ===
                //       Object.keys(initialValues).length
                //   )
                // }
                style={{ backgroundColor: "lime" }}
                onClick={handleCompleteEditing}>
                Complete Editing
              </button>
              {/* {!isEmailUnique && <p>Email already in use!</p>} */}
              {!isTuteeProfileSetUp && (
                <p>Tutor profile unable to be set up.</p>
              )}
              <CheckClassLevelAndSubject />
            </Form>
          )}
        </Formik>
      </>
    );
  }
};

export default EditTuteeProfile;
