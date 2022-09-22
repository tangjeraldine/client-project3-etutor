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
      <div>
        <h1 style={{ fontSize: "30px" }}>Edit Tutor Profile</h1>
        <br />
        <p>Full Name: </p>
        <p> {tutorData?.fullName}</p>
        <p>Phone: </p>
        <p>{tutorData?.phone} </p>
        <p>Region: </p>
        <p>{tutorData?.region} </p>
        <p>Rates Per Lesson: </p>
        <p>${tutorData?.rates} </p>
        <p>Class Type: </p>
        <p>{tutorData?.classType?.join(", ")} </p>
        <p>Class Level: </p>
        <p>{tutorData?.classLevel?.join(", ")} </p>
        <p>Subjects: </p>
        <p>{tutorData?.subjects?.join(", ")} </p>
        <p>Education Background: </p>
        <p>{tutorData?.educationBackground}</p>
        <p>Teaching Experience: </p>
        <p>{tutorData?.teachingExperience} </p>
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
              <p>Full Name: </p>
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
              <Field
                name='phone'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
              {errors.phone && touched.phone ? <div>{errors.phone}</div> : null}
              <br />
              <p>Region: </p>
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
              <Field
                name='rates'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.rates}
              />
              {errors.rates && touched.rates ? <div>{errors.rates}</div> : null}
              <br />
              <p>Class Type(s): </p>
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
              <p>Class Level(s): </p>
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
              <p>Subject(s): </p>
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
                disabled={
                  !(
                    Object.keys(errors).length === 0 &&
                    Object.keys(touched).length !== 0 &&
                    matchingLevelSub
                  )
                }
                style={{ backgroundColor: "lime" }}>
                Complete Editing
              </button>
              {!isTutorProfileSetUp && (
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

export default EditTutorProfile;
