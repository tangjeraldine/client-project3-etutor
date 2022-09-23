import { useNavigate } from "react-router-dom";
import { useState } from "react";
import urlcat from "urlcat";
import { Field, Formik, Form } from "formik";
import axios from "axios";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import signUpValidation from "../../Validations/signUpValidation";
import Footer from "../General Pages/Footer";

const SERVER = import.meta.env.VITE_SERVER;

const SignUpUser = ({user, setUser}) => {
  const [isUserProfileSetUp, setIsUserProfileSetUp] = useState(true);
  const [isEmailUnique, setIsEmailUnique] = useState(true);
  const [isUsernameUnique, setIsUsernameUnique] = useState(true);
  const [open, setOpen] = useState(false);
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
          setUser(data)
          navigate("/signup/tutor");
        } else if (data.userType === "Tutee") {
          setUser(data)
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

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <section class='bg-amber-200'>
        <div class='lg:grid lg:min-h-screen lg:grid-cols-12'>
          <section class='relative flex items-end h-32 bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6'>
            <img
              alt='Laptop'
              src='https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
              class='absolute inset-0 object-cover w-full h-full opacity-40'
            />

            <div class=' lg:block lg:relative lg:p-12'>
              <h1 class='mt-6 text-3xl font-bold text-white sm:text-3xl md:text-4xl'>
                Sign Up With Us
              </h1>
              <p class='mt-4 leading-relaxed text-white/90'>
                Get started on your journey with eTutor at the click of a
                button. All information is kept confidential and will only be
                provided to relevant parties for the purposes of tuition
                arrangements.
              </p>
            </div>
          </section>
          <main class='flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6'>
            <div class='max-w-xl lg:max-w-3xl'>
              {/* using formik */}
              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  password: "",
                  userType: "select",
                }}
                validationSchema={signUpValidation}
                onSubmit={(values) => handleSignUp(values)}>
                {({
                  handleChange,
                  handleBlur,
                  values,
                  errors,
                  touched,
                  initialValues,
                }) => (
                  <Form class='grid grid-cols-4 gap-6 mt-8'>
                    <div class='col-span-6'>
                      <label
                        for='Username'
                        class='block text-sm font-medium text-gray-700'>
                        New Username
                      </label>
                      <Field
                        name='username'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        placeholder='username'
                        class='w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm'
                      />
                      {errors.username && touched.username ? (
                        <div>{errors.username}</div>
                      ) : null}
                    </div>

                    <div class='col-span-6'>
                      <label
                        for='Email'
                        class='block text-sm font-medium text-gray-700'>
                        Your Email
                      </label>
                      <Field
                        name='email'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder='email'
                        class='w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm'
                      />
                      {errors.email && touched.email ? (
                        <div>{errors.email}</div>
                      ) : null}
                    </div>

                    <div class='col-span-6'>
                      <label
                        for='Password'
                        class='block text-sm font-medium text-gray-700'>
                        Set A Password
                      </label>
                      <div className='w-full mx-auto relative'>
                        <Field
                          type={open === false ? "password" : "text"}
                          name='password'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          placeholder='password'
                          class='w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm'
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
                    </div>

                    <div class='col-span-6'>
                      <label
                        for='UserType'
                        class='block text-sm font-medium text-gray-700'>
                        Select A User Type
                      </label>
                      <Field
                        class='w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm'
                        as='select'
                        name='userType'
                        values={values.userType}
                        onChange={handleChange}>
                        <option disabled>select</option>
                        <option value='Tutor'>Tutor</option>
                        <option value='Tutee'>Tutee</option>
                      </Field>
                      {errors.userType && touched.userType ? (
                        <div>{errors.userType}</div>
                      ) : null}
                    </div>

                    <br />
                    <button
                      type='submit'
                      disabled={
                        !(
                          Object.keys(errors).length === 0 &&
                          Object.keys(touched).length !== 0
                        )
                      }
                      class='inline-block px-12 py-6 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 flex justify-center'>
                      {/* trying to use disabled={!Formik.isValid} but it doesnt detect even when isValid is true*/}
                      Next
                    </button>
                    {!isEmailUnique && <p>Email already in use!</p>}
                    {!isUsernameUnique && <p>Username has been taken.</p>}
                    {!isUserProfileSetUp && (
                      <p>User account unable to be created.</p>
                    )}
                    <button
                      class='inline-block px-12 py-6 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 flex justify-center'
                      onClick={() => navigate("/")}>
                      Back To Sign In
                    </button>
                  </Form>
                )}
              </Formik>
            </div>{" "}
          </main>{" "}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SignUpUser;
