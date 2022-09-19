import { useNavigate } from "react-router-dom";

function AboutUs() {
  const navigate = useNavigate();

  return (
    <div>
      <aside>
        <div class='px-4 py-8 mx-auto max-w-screen-2xl sm:px-6 lg:px-8'>
          <div class='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div class='p-8 bg-yellow-300 md:p-12 lg:px-16 lg:py-24 md:order-last'>
              <div class='max-w-xl mx-auto text-center'>
                <h2 class='text-1xl font-bold text-red-700 md:text-3xl'>
                  ETutor.
                  <br />
                  No hidden fees.
                  <br />
                  No extra charges.
                </h2>

                <p class='hidden sm:block sm:mt-4 text-black/90'>
                  ETutor is the new one-stop sign up and booking platform for
                  students and tutors. If you're a tutor, just create your
                  profile and available timeslots. If you're a tutee, all you
                  have to do is book the timeslot for tuition! It's as easy as
                  ABC.
                </p>
                <br />
                <div class='mt-4 md:mt-8 grid-cols-2'>
                  <button
                    class='inline-flex px-12 py-3 mx-4 text-sm font-medium text-red-500 transition bg-white border border-white rounded hover:bg-red hover:text-black focus:outline-none focus:ring focus:ring-red-400'
                    onClick={() => navigate("/signup")}>
                    Get Started
                  </button>
                </div>
              </div>
            </div>

            <div class='grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2'>
              <img
                alt='Student'
                src='https://images.unsplash.com/photo-1621274790572-7c32596bc67f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80'
                class='object-cover w-full h-40 sm:h-56 md:h-full'
              />

              <img
                alt='Student'
                src='https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
                class='object-cover w-full h-40 sm:h-56 md:h-full'
              />
            </div>
          </div>
        </div>
      </aside>
      <div class='space-y-4'>
        <details class='group' open>
          <summary class='flex items-center justify-between p-4 rounded-lg cursor-pointer bg-gray-50'>
            <h5 class='font-medium text-gray-900'>
              What if I encounter technical issues during sign up?
            </h5>

            <svg
              class='flex-shrink-0 ml-1.5 w-5 h-5 transition duration-300 group-open:-rotate-180'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </summary>

          <p class='px-4 mt-4 leading-relaxed text-gray-700'>
            You can contact our administrative team on WhatsApp at +65 0000
            1111, or email us at MaryDwJer@email.com. Please allow us 3 working
            days to get back to you.
          </p>
        </details>

        <details class='group'>
          <summary class='flex items-center justify-between p-4 rounded-lg cursor-pointer bg-gray-50'>
            <h5 class='font-medium text-gray-900'>
              Is there a physical space provided by ETutor for tutors and tutees
              to meet and conduct tuition sessions?
            </h5>

            <svg
              class='flex-shrink-0 ml-1.5 w-5 h-5 transition duration-300 group-open:-rotate-180'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </summary>

          <p class='px-4 mt-4 leading-relaxed text-gray-700'>
            No, ETutor is only an e-platform for freelance tutors to list their
            tuition services and for tutees to select tutors of their interest.
            ETutor does not provide physical classrooms or areas for tuition to
            be conducted. Arrangements will need to be made privately between
            each tutor and prospective tutee on how their tuition sessions will
            be conducted.
          </p>
        </details>
      </div>
    </div>
  );
}

export default AboutUs;
