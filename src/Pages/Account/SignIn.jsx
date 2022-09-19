import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import urlcat from "urlcat";
import { Field, Formik, Form } from "formik";
import axios from "axios";
import signInValidation from "../../Validations/signInValidation";
import { useState } from "react";

const SERVER = import.meta.env.VITE_SERVER;

const SignIn = ({ setUser }) => {
  const navigate = useNavigate();

  // const [user, setUser] = useState({});
  const [signInSuccessful, setSignInSuccessful] = useState(true);

  //to decode token and find out usertype and save to state
  const parseJwt = (token) => {
    if (token === "") {
      return {};
    }
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  const handleSignIn = (values) => {
    setSignInSuccessful(true);
    const url = urlcat(SERVER, "/user/signin");
    axios
      .post(url, values)
      .then(({ data }) => {
        const user = parseJwt(data.token).user;
        setUser(user);
        // const userType = parseJwt(data.token).user.userType;
        const userType = user.userType;
        if (userType === "Tutor") {
          navigate("/tutor");
        } else if (userType === "Tutee") {
          navigate("/tutee");
        }
      })
      .catch((error) => {
        if (
          error.response.data.error === "No user." ||
          error.response.data.error === "Validation failed."
        ) {
          console.log(error);
          setSignInSuccessful(false);
        }
      });
  };

  return (
    <>
      <h1 style={{ fontSize: "50px" }}>eTutor</h1>
      <p>eTutor connects tutors and tutees</p>
      <p>find a tutor by subject and level and register your interest.</p>
      <p>once accepted, start booking available classes!</p>
      <br />
      <br />
      <h1>sign in</h1>

      {/* using formik */}
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={signInValidation}
        onSubmit={(values) => handleSignIn(values)}
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
              id="username"
              name="username"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              placeholder="username"
            />
            {errors.username && touched.username ? (
              <div>{errors.username}</div>
            ) : null}

            <Field
              id="password"
              name="password"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder="password"
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
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
              sign in
            </button>
            {!signInSuccessful && <p>Sign in failed!</p>}
          </Form>
        )}
      </Formik>

      <br />
      <br />
      <br />

      <button
        style={{ backgroundColor: "lime" }}
        onClick={() => {
          navigate("/signup");
        }}
      >
        sign up
      </button>
    </>
  );
};

export default SignIn;
