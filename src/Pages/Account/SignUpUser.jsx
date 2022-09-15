import { useNavigate } from "react-router-dom";
import urlcat from "urlcat";
import { Field, Formik, Form } from "formik";
import axios from "axios";
import signUpValidation from '../../Validations/signUpValidation'

const SERVER = import.meta.env.VITE_SERVER;

const SignUpUser = () => {
  const navigate = useNavigate();

  const handleSignUp = (values) => {
    const url = urlcat(SERVER, "/user/signup");
    console.log(values);
    axios
      .post(url, values)
      .then(({ data }) => {
        if (userType === "tutor") {
          navigate("/signup/tutor");
        } else {
          navigate("/signup/tutee");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.error === "This username has been taken.") {
          alert(" Username taken");
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
          password: "",
          userType: "select",
        }}
        validationSchema={signUpValidation}
        onSubmit={(values) => handleSignUp(values)}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => (
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
              <option value="tutor">Tutor</option>
              <option value="tutee">Tutee</option>
            </Field>
            {errors.userType && touched.userType ? (
              <div>{errors.password}</div>
            ) : null}

            <br />
            <button type="submit" style={{ backgroundColor: "lime" }}>
              sign up
            </button>
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
