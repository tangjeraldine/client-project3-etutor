import { useNavigate } from "react-router-dom";
import { useState } from "react";
import urlcat from "urlcat";
import { Field, Formik, Form } from "formik";
import axios from "axios";
import signUpValidation from "../../Validations/signUpValidation";

const SERVER = import.meta.env.VITE_SERVER;

const SignUpUser = () => {
  const [isUserProfileSetUp, setIsUserProfileSetUp] = useState(true);
  const [isEmailUnique, setIsEmailUnique] = useState(true);
  const [isUsernameUnique, setIsUsernameUnique] = useState(true);
  const navigate = useNavigate();

  const handleSignUp = (values) => {
    setIsUserProfileSetUp(true);
    setIsEmailUnique(true);
    setIsUsernameUnique(true);
    const url = urlcat(SERVER, "/user/signup");
    axios
      .post(url, values)
      .then(({ data }) => {
        if (data.userType === "Tutor") {
          navigate("/signup/tutor");
        } else if (data.userType === "Tutee") {
          navigate("/signup/tutee");
        }
      })
      .catch((error) => {
        if (error.response.data.error === "User unable to be created.") {
          setIsUserProfileSetUp(false);
        } else if (
          error.response.data.error === "This username has been taken."
        ) {
          setIsUsernameUnique(false);
        } else if (
          error.response.data.error === "This email address is already in use."
        ) {
          setIsEmailUnique(false);
        }
      });
  };

  return (
    <>
      <h1 style={{ fontSize: "50px" }}>sign up</h1>

      {/* using formik */}
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          userType: "select",
        }}
        validationSchema={signUpValidation}
        onSubmit={(values) => handleSignUp(values)}
      >
        {({
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          initialValues,
        }) => (
          <Form>
            <Field
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              placeholder="username"
            />
            {errors.username && touched.username ? (
              <div>{errors.username}</div>
            ) : null}

            <Field
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="email"
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}

            <Field
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder="password"
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}

            <Field
              as="select"
              name="userType"
              values={values.userType}
              onChange={handleChange}
            >
              <option disabled>select</option>
              <option value="Tutor">Tutor</option>
              <option value="Tutee">Tutee</option>
            </Field>
            {errors.userType && touched.userType ? (
              <div>{errors.userType}</div>
            ) : null}

            <br />
            <button
              type="submit"
              disabled={
                !(
                  Object.keys(errors).length === 0 &&
                  Object.keys(touched).length !== 0
                )
              }
              style={{ backgroundColor: "lime" }}
            >
              {/* trying to use disabled={!Formik.isValid} but it doesnt detect even when isValid is true*/}
              sign up
            </button>
            {!isEmailUnique && <p>Email already in use!</p>}
            {!isUsernameUnique && <p>Username has been taken.</p>}
            {!isUserProfileSetUp && <p>User account unable to be created.</p>}
          </Form>
        )}
      </Formik>

      <br />
      <br />
      <br />
      <button style={{ backgroundColor: "lime" }} onClick={() => navigate("/")}>
        back to sign in
      </button>
    </>
  );
};

export default SignUpUser;
