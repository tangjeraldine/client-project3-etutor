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
      <section class='relative flex flex-wrap lg:h-screen lg:items-center'>
        <div class='relative w-full h-64 sm:h-96 lg:w-1/3 lg:h-full '>
          <img
            alt='Welcome'
            src='https://images.unsplash.com/photo-1532680678473-a16f2cda8e43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            class='absolute inset-0 object-cover w-full h-full'
          />
          <div class='absolute inset-0 bg-white/40 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/20 sm:to-white/100'></div>
        </div>
        <div class='w-full px-4 py-2 lg:w-2/3 sm:px-6 lg:px-8 sm:py-2 lg:py-2'>
          <div class='max-w-lg mx-auto text-center'>
            <h1 class='text-2xl font-bold text-red-700 m-2 sm:text-3xl'>
              Edit User Details
            </h1>
            <p class='mt-3 text-gray-500'>
              If you've encountered any technical difficulties, don't hesitate
              to reach out to our team. Our contact details can be found in the
              About Us page in the footer.
            </p>
          </div>
          <div>
            <br />
            <p class='font-bold text-red-700 m-1 sm:text-1xl'>Username: </p>
            <p>{userData?.username}</p>
            <p class='font-bold text-red-700 m-1 sm:text-1xl'>Password: </p>
            <p>*********</p>
            <p class='font-bold text-red-700 m-1 sm:text-1xl'>UserType: </p>
            <p>{userData?.userType} </p>
            <p class='text-gray-400'>(Cannot be changed) </p>
            <p class='font-bold text-red-700 m-1 sm:text-1xl'>Email:</p>
            <p>{userData?.email}</p>
            <button
              class='block mt-4 px-10 py-2 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '
              onClick={handleEdit}>
              Edit Profile
            </button>
            <br />
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section class='relative flex flex-wrap lg:h-screen lg:items-center'>
        <div class='relative w-full h-64 sm:h-96 lg:w-1/3 lg:h-full '>
          <img
            alt='Welcome'
            src='https://images.unsplash.com/photo-1532680678473-a16f2cda8e43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            class='absolute inset-0 object-cover w-full h-full'
          />
          <div class='absolute inset-0 bg-white/40 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/20 sm:to-white/100'></div>
        </div>
        <div class='w-full px-4 py-2 lg:w-2/3 sm:px-6 lg:px-8 sm:py-2 lg:py-2'>
          <div class='max-w-lg mx-auto text-center'>
            <h1 class='text-2xl font-bold text-red-700 m-2 sm:text-3xl'>
              Edit User Details
            </h1>
          </div>
          <div>
            <br />
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
                  <label class='font-bold text-red-700 m-1 sm:text-1xl'>
                    Username:{" "}
                  </label>
                  <Field
                    name='username'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    class='w-full h-12 mt-2 text-m text-gray-700 bg-white border-gray-200 rounded-md shadow-sm'
                  />
                  {errors.username && touched.username ? (
                    <div>{errors.username}</div>
                  ) : null}
                  <br />
                  <div className=' mx-auto relative'>
                    <label class='font-bold text-red-700 m-1 sm:text-1xl'>
                      New Password:{" "}
                    </label>
                    <Field
                      name='password'
                      type={open === false ? "password" : "text"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      class='w-full h-12 mt-2 text-m text-gray-700 bg-white border-gray-200 rounded-md shadow-sm'
                    />
                    {errors.password && touched.password ? (
                      <div>{errors.password}</div>
                    ) : null}
                    <div className='text-2xl absolute top-11 right-4'>
                      {open === false ? (
                        <BsEyeSlashFill onClick={handleToggle} />
                      ) : (
                        <BsEyeFill onClick={handleToggle} />
                      )}
                    </div>
                  </div>

                  <br />
                  <label class='font-bold text-red-700 m-1 sm:text-1xl'>
                    Email:{" "}
                  </label>
                  <Field
                    name='email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    class='w-full h-12 mt-2 text-m text-gray-700 bg-white border-gray-200 rounded-md shadow-sm'
                  />
                  {errors.email && touched.email ? (
                    <div>{errors.email}</div>
                  ) : null}
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
          </div>
        </div>
      </section>
    );
  }
};

export default EditUserDetails;
