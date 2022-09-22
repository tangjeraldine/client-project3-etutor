import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <section class='relative overflow-hidden rounded-lg shadow-2xl pb-80 lg:pb-0'>
        <div class='p-8 ml-auto text-center lg:w-2/3 sm:p-12'>
          <h5 class='mt-6 font-red-700'>
            <span class='text-5xl sm:text-4xl'>Ooops! Error 403.</span>
            <span class='block mt-2 text-1xl'>
              You aren't authorised to view this page. Return to the home page
              to sign in again, or create an account to continue.{" "}
            </span>{" "}
            <br />
            <span class='block mt-2 text-1xl'>
              If you're still encountering technical difficulties, you may
              contact the eTutor team at etutor-inc@email.com, or notify us via
              WhatsApp at +65 0000 1111.{" "}
            </span>
          </h5>
          <div>
            <button
              class='block mt-4 px-10 py-2 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'
              onClick={() => {
                navigate("/");
              }}>
              Return to Home Page
            </button>
          </div>
        </div>

        <div class='absolute bottom-0 left-0 w-full h-80 lg:h-full lg:w-1/3'>
          <img
            alt='Trainer'
            src='https://images.unsplash.com/photo-1555861496-0666c8981751?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
            class='absolute inset-0 object-cover w-full h-full'
          />
        </div>
      </section>
    </>
  );
};

export default ErrorPage;
