import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import urlcat from "urlcat";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SERVER = import.meta.env.VITE_SERVER;

const SignIn = () => {
  const navigate = useNavigate();

  //to decode token and find out usertype
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
    const url = urlcat(SERVER, "/user/signin");
    axios.post(url, values).then(({ data }) => {
      if (data.error === "No user" || data.error === "Validation failed") {
        alert("Sign in failed!");
      } else {
        const userType = parseJwt(data.token).userTYPE;
        if (userType === "tutor") {
          navigate("/tutor");
        } else {
          navigate("/tutee");
        }
      }
    });
  };

  const UserSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

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
        validationSchema={UserSchema}
        onSubmit={(values) => handleSignIn(values)}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => (
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
            <button type="submit" style={{ backgroundColor: "lime" }}>
              sign in
            </button>
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
