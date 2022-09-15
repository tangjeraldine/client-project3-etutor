import { useNavigate } from "react-router-dom";
import urlcat from "urlcat";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

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

  const UserSchema = Yup.object({
    username: Yup.string()
      .required("Required")
      .matches(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/, {
        message:
          "Username can consist of alphanumeric characters, dot, underscore and hyphen (special characters must not be the first or last char and cannot appear consecutively), must be 5-20 characters long.",
        excludeEmptyString: true,
      }),
    password: Yup.string()
      .required("Required")
      .matches(
        /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/,
        {
          message:
            "Password must not contain any whitespaces, must have at least one uppercase letter, one lowercase character, one digit, one special character, and must be 10-16 characters long.",
          excludeEmptyString: true,
        }
      ),
    userType: Yup.string().required("Required"),
  });

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
        validationSchema={UserSchema}
        onSubmit={(values) => handleSignUp(values)}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => (
          <Form>
            <Field
              //   id="username"
              name="username"
              //   type="text"
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

            <Field
              as="select"
              id="userType"
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
