import { useNavigate } from "react-router-dom";
import editUserDetValidation from "../../Validations/editUserDetValidation";
import { Field, Formik, Form, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import urlcat from "urlcat";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";

const SERVER = import.meta.env.VITE_SERVER;

const EditUserDetails = ({ user }) => {
  const [userData, setUserData] = useState({});
  const [wantToEdit, setWantToEdit] = useState(false);
  const [open, setOpen] = useState(false);

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
        navigate("/tutor/edituserdetails");
      })
      .catch((error) => {
        if (
          error.response.data.error === "User details could not be updated."
        ) {
          console.log("User details were not updated.");
          // error page
        }
      });
  };

  const handleEdit = () => {
    setWantToEdit(true);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  if (!wantToEdit) {
    return (
      <div>
        <h1 style={{ fontSize: "30px" }}>Edit User Details</h1>
        <br />
        <p>Username: </p>
        <p>{userData?.username}</p>
        <p>Password: </p>
        <p>********* </p>
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
            username: userData?.username,
            password: "",
            email: userData?.email,
          }}
          validationSchema={editUserDetValidation}
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
              <label>Username: </label>
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
              <div className=' mx-auto relative'>
                <label>New Password: </label>
                <Field
                  name='password'
                  type={open === false ? "password" : "text"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
                <div className='text-2xl absolute top-3 right-1'>
                  {open === false ? (
                    <BsEyeSlashFill onClick={handleToggle} />
                  ) : (
                    <BsEyeFill onClick={handleToggle} />
                  )}
                </div>
              </div>

              <br />
              <label>Email: </label>
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
                class='block mt-2 px-10 py-2 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '>
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
