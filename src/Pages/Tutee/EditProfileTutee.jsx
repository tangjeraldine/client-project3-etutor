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
      <div>
        <h1 style={{ fontSize: "30px" }}>Edit Tutee Profile</h1>
        <br />
        <p>Full Name: </p>
        <p> {tuteeData?.fullName}</p>
        <p>Phone: </p>
        <p>{tuteeData?.phone} </p>
        <p>Preferred Contact Mode: </p>
        <p>{tuteeData?.preferredContactMode} </p>
        <p>Class Level: </p>
        <p>{tuteeData?.currentLevel} </p>
        <p>Region: </p>
        <p>{tuteeData?.region} </p>
        <p>Subjects: </p>
        <p>{tuteeData?.subjects?.join(", ")} </p>
        <button style={{ backgroundColor: "lime" }} onClick={handleEdit}>
          Edit Profile
        </button>
        <br />
      </div>
    );
  } else {
    return (
      <>
        <h1 style={{ fontSize: "30px" }}>Edit Tutee Profile</h1>

        {/* using formik */}
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
              <p>New Preferred Contact Mode: </p>
              <Field
                as='select'
                name='preferredContactMode'
                values={values.preferredContactMode}
                onChange={handleChange}>
                <option disabled>select</option>
                <option value='Email'>Email</option>
                <option value='WhatsApp Message'>WhatsApp Message</option>
                <option value='Phone Call'>Phone Call</option>
              </Field>
              <br />
              {errors.classType && touched.classType ? (
                <div>{errors.classType}</div>
              ) : null}
              <br />
              <br />

              <p>Class Level: </p>
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
