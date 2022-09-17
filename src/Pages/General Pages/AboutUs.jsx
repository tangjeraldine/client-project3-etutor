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
                <h2 class='text-1xl font-bold text-red-700 md:text-2xl'>
                  I want to get started as a:
                </h2>
                <div class='mt-4 md:mt-8 grid-cols-2'>
                  <button
                    class='inline-flex px-12 py-3 mx-4 text-sm font-medium text-red-500 transition bg-white border border-white rounded hover:bg-red hover:text-black focus:outline-none focus:ring focus:ring-red-400'
                    onClick={() => navigate("/signup/tutor")}>
                    Tutor
                  </button>
                  <button
                    class='inline-flex px-12 py-3 mx-4 text-sm font-medium text-red-500 transition bg-white border border-white rounded hover:bg-red hover:text-black focus:outline-none focus:ring focus:ring-red-400'
                    onClick={() => navigate("/signup/tutee")}>
                    Tutee
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
    </div>
  );
}

export default AboutUs;
