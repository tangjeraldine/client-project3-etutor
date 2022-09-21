import { Outlet, useNavigate } from "react-router-dom";
import ErrorPage from "../Error Page/ErrorPage";
import Footer from "../General Pages/Footer";

const LayoutTutor = ({ user }) => {
  if (user.userType !== "Tutor") {
    return <ErrorPage />;
  }

  const navigate = useNavigate();
  return (
    <>
      <header className='bg-white'>
        <div className='px-4 mx-auto max-w-screen-xl sm:px-6 lg:px-8'>
          <div className='flex items-center justify-center h-16'>
            <div className='md:block'>
              <nav aria-labelledby='header-navigation'>
                {/* <h2 className="sr-only" id="header-navigation">Header navigation</h2> */}

                <ul className='flex items-center text-sm gap-6'>
                  <li>
                    <button
                      onClick={() => {
                        navigate("/tutor");
                      }}
                      className='text-gray-500 transition hover:text-gray-500/75'>
                      My Classes
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => {
                        navigate("/tutor/mytutees");
                      }}
                      className='text-gray-500 transition hover:text-gray-500/75'>
                      My Tutees
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => {
                        navigate("/tutor/askanything");
                      }}
                      className='text-gray-500 transition hover:text-gray-500/75'>
                      Ask Anything
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => {
                        navigate("/tutor/editprofile");
                      }}
                      className='text-gray-500 transition hover:text-gray-500/75'>
                      Edit Profile
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => {
                        navigate("/tutor/edituserdetails");
                      }}
                      className='text-gray-500 transition hover:text-gray-500/75'>
                      Edit User Details
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            <div className='flex items-center gap-4'>
              {/* this is the menu icon, will appear when the screen size become smaller */}
              <div className='block md:hidden'>
                <button className='p-2 text-gray-600 bg-gray-100 rounded transition hover:text-gray-600/75'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-5 h-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
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

export default LayoutTutor;
