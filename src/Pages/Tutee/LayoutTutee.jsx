import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import ErrorPage from "../Error Page/ErrorPage";
import Footer from "../General Pages/Footer";

const LayoutTutee = ({ user }) => {
  if (user.userType !== "Tutee") {
    return <ErrorPage />;
  }
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const showEdit = () => {
    setOpen(!open);
  };

  return (
    <>
      <header class='bg-red-800'>
        <div class='px-4 mx-auto max-w-screen-xl sm:px-6 lg:px-8'>
          <div class='flex items-center justify-between h-16'>
            <div class='md:flex md:items-center md:gap-12'>
              <img
                src='https://cdn-icons-png.flaticon.com/512/3212/3212202.png'
                alt='welcome'
                className='h-16'
              />
            </div>

            <div class='hidden md:block'>
              <nav aria-labelledby='header-navigation'>
                <h2 class='sr-only' id='header-navigation'>
                  Header navigation
                </h2>

                <ul class='flex items-center text-sm gap-10'>
                  <li>
                    <button
                      onClick={() => {
                        navigate("/tutee");
                      }}
                      class='text-yellow-300 transition hover:text-blue-400/75'>
                      My Classes
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => {
                        navigate("/tutee/mytutors");
                      }}
                      class='text-yellow-300 transition hover:text-blue-400/75'>
                      My Tutors
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => {
                        navigate("/tutee/search");
                      }}
                      class='text-yellow-300 transition hover:text-blue-400/75'>
                      Search For Tutors
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => {
                        navigate("/tutee/askanything");
                      }}
                      class='text-yellow-300 transition hover:text-blue-400/75'>
                      Ask Anything
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            <div class='flex items-center gap-4'>
              <button
                onClick={showEdit}
                class='block mt-2 px-4 py-2 text-sm font-medium text-white transition bg-yellow-500 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '>
                {!open ? "Account" : "Hide"}
              </button>
              {open ? (
                <div class='flex items-center gap-4'>
                  <button
                    onClick={() => {
                      navigate("/tutee/editprofile");
                    }}
                    class='block px-4 py-2 text-sm font-medium text-white rounded-lg hover:bg-gray-100 hover:text-gray-700'>
                    Edit Profile
                  </button>

                  <button
                    onClick={() => {
                      navigate("/tutee/edituserdetails");
                    }}
                    class='block px-4 py-2 text-sm font-medium text-white rounded-lg hover:bg-gray-100 hover:text-gray-700'>
                    Edit User Details
                  </button>

                  <button
                    onClick={() => {
                      navigate("/");
                    }}
                    class='block px-4 py-2 text-sm font-medium text-white rounded-lg hover:bg-gray-100 hover:text-gray-700'>
                    Logout
                  </button>
                </div>
              ) : (
                <div></div>
              )}

              <div class='block md:hidden'>
                <button class='p-2 text-gray-600 bg-gray-100 rounded transition hover:text-gray-600/75'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    class='w-5 h-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    stroke-width='2'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Outlet />

      <Footer />
    </>
  );
};

export default LayoutTutee;
