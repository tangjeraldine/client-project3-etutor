import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import urlcat from "urlcat";
import { Field, Formik, Form } from "formik";
import axios from "axios";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import signInValidation from "../../Validations/signInValidation";
import { useState } from "react";
import Footer from "../General Pages/Footer";
import Testimonials from "../General Pages/Testimonials";

const SERVER = import.meta.env.VITE_SERVER;

const SignIn = ({ setUser, user }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
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

  const checkForTutorProfile = (USER) => {
    const url = urlcat(SERVER, `/tutor/${USER._id}`);
    axios
      .get(url)
      .then(({ data }) => {
        console.log("data", data);
        navigate("/tutor");
      })
      .catch((error) => {
        if (error.response.data.error === "Tutor not found.") {
          console.log("ooops", error);
          navigate("/signup/tutor");
        }
      });
  };

  const checkForTuteeProfile = (USER) => {
    const url = urlcat(SERVER, `/tutee/editprofile/${USER._id}`);
    axios
      .get(url)
      .then(({ data }) => {
        console.log("data", data);
        navigate("/tutee");
      })
      .catch((error) => {
        if (error.response.data.error === "Tutee not found.") {
          console.log("ooops", error);
          navigate("/signup/tutee");
        }
      });
  };

  const handleSignIn = (values) => {
    setSignInSuccessful(true);
    const url = urlcat(SERVER, "/user/signin");
    axios
      .post(url, values)
      .then(({ data }) => {
        const USER = parseJwt(data.token).user;
        setUser(USER);
        // const userType = parseJwt(data.token).user.userType;
        const userType = USER.userType;
        if (userType === "Tutor") {
          if (user) {
            checkForTutorProfile(USER);
          }
        } else if (userType === "Tutee") {
          if (user) {
            checkForTuteeProfile(USER);
          }
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

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <section class='bg-amber-200 h-screen'>
      <div class='lg:grid lg:min-h-screen lg:grid-cols-12'>
        <aside class='relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6'>
          <img
            alt='Happy'
            src='https://images.unsplash.com/photo-1597614645324-225ff8159d70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
            class='absolute inset-0 object-cover w-full h-full'
          />
        </aside>

        <main class='flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6'>
          <div class='max-w-xl lg:max-w-3xl'>
            <a class='block text-blue-600' href='/'>
              <span class='sr-only'>Home</span>
              <img
                className='h-32'
                src='https://cdn-icons-png.flaticon.com/512/3212/3212202.png'
                alt='Welcome'
              />
            </a>

            <h1
              class='mt-8 text-2xl font-bold text-red-700 sm:text-3xl md:text-4xl cursor-pointer hover:text-white'
              onClick={() => {
                navigate("/aboutus");
              }}>
              If you're striving for greatness, we're here for you.
            </h1>

            <p class='mt-10 leading-relaxed text-rose-700'>
              eTutor is Singapore's leading hosting site for tutors and tutees
              to connect and manage their tuition sessions. Try now by signing
              up, setting up, or booking classes! Using this platform is
              completely free of charge, and always will be.
            </p>
            {/* using formik */}
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validationSchema={signInValidation}
              onSubmit={(values) => handleSignIn(values)}>
              {({
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
                initialValues,
              }) => (
                <Form>
                  {" "}
                  <label
                    for='Username'
                    class='block text-sm font-medium text-gray-700 mt-6'>
                    Username
                  </label>
                  <Field
                    id='username'
                    name='username'
                    type='text'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    placeholder='Username'
                    class='w-full mt-2 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm'
                  />
                  {errors.username && touched.username ? (
                    <div>{errors.username}</div>
                  ) : null}
                  <label
                    for='Password'
                    class='block text-sm font-medium text-gray-700 mt-6'>
                    Password
                  </label>
                  <div className='w-full mx-auto relative'>
                    {" "}
                    <Field
                      id='password'
                      name='password'
                      type={open === false ? "password" : "text"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder='Password'
                      class='w-full mt-2 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm'
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
                  <button
                    type='submit'
                    disabled={
                      !(
                        Object.keys(errors).length === 0 &&
                        Object.keys(touched).length !== 0
                      )
                    }
                    class='block mt-6 px-12 py-2 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '>
                    Sign in
                  </button>
                  <p class='text-sm text-gray-700 mt-8'>
                    Don't have an account yet?
                  </p>
                  <button
                    class='block mt-2 px-10 py-2 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '
                    onClick={() => {
                      navigate("/signup");
                    }}>
                    Create an account
                  </button>
                  {!signInSuccessful && <p>Sign in failed!</p>}
                </Form>
              )}
            </Formik>
          </div>
        </main>
      </div>
      <Testimonials />
      <Footer />
    </section>
  );
};

export default SignIn;
