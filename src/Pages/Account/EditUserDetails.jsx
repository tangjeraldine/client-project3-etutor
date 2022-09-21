import { useNavigate } from "react-router-dom";
import signUpValidation from "../../Validations/signUpValidation";
import { Field, Formik, Form, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import urlcat from "urlcat";

const SERVER = import.meta.env.VITE_SERVER;

const EditUserDetails = ({ user }) => {
  const [userData, setUserData] = useState({});
  const [wantToEdit, setWantToEdit] = useState(false);

  const navigate = useNavigate();

  //* First fetch on load
  useEffect(() => {
    const url = urlcat(SERVER, `/user/viewuser/${user._id}`);
    axios
      .get(url)
      .then(({ data }) => {
        setUserData(data);
        // console.log(data);
      })
      .catch((error) => {
        if (error.response.data.error === "User details not found.") {
          console.log("User details not found.");
          // error page
        }
      });
  }, []);

  //* Update fetch on clicking "Update User"
  const handleUpdateUserDetails = (values) => {
    setWantToEdit(false);
    setUserData(values);
    const url = urlcat(SERVER, `/user/edituserdetails/${user._id}`);
    axios
      .put(url, values)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        if (error.response.data.error === "User details were not updated.") {
          console.log("User details were not updated.");
          // error page
        }
      });
  };

  const handleEdit = () => {
    setWantToEdit(true);
  };

  if (!wantToEdit) {
    return (
      <div>
        <h1 style={{ fontSize: "30px" }}>Edit User Details</h1>
        <br />
        <p>Username: </p>
        <p>{userData?.username}</p>
        <p>Password: </p>
        <p>****** </p>
        <p>UserType: </p>
        <p>{userData?.userType} (Cannot be changed) </p>
        <p>Email: </p>
        <p>{userData?.email} </p>
        <button style={{ backgroundColor: "lime" }} onClick={handleEdit}>
          Edit Profile
        </button>
        <br />
      </div>
    );
  } else {
    return (
      <>
        <h1 style={{ fontSize: "30px" }}>Edit User Details</h1>

        {/* using formik */}
        <Formik
          initialValues={{
            username: `${userData?.username}`,
            password: "",
            email: `${userData?.email}`,
          }}
          validationSchema={signUpValidation}
          onSubmit={(values) => {
            console.log(values);
            handleUpdateUserDetails(values);
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
              <p>Username: </p>
              <Field
                name='username'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              {errors.username && touched.username ? (
                <div>{errors.username}</div>
              ) : null}
              <br />
              <p>Password: </p>
              <Field
                name='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
              <br />
              <p>Email: </p>
              <Field
                name='email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              <br />
              <button
                type='submit'
                disabled={
                  !(
                    Object.keys(errors).length === 0 &&
                    Object.keys(touched).length !== 0
                  )
                }
                style={{ backgroundColor: "lime" }}>
                Complete Editing
              </button>
            </Form>
          )}
        </Formik>
      </>
    );
  }
};

export default EditUserDetails;
