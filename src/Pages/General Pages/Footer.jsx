import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer class='bg-amber-400'>
      <div class='relative px-4 py-4 mx-auto max-w-screen-xl sm:px-6 lg:px-8 lg:pt-24'>
        <div class='lg:flex lg:items-end lg:justify-between'>
          <div>
            <div class='flex justify-center text-teal-600 lg:justify-start'>
              <img
                className='h-24'
                src='https://cdn-icons-png.flaticon.com/512/921/921351.png'
                alt='eTutor'
              />{" "}
              <p class='max-w-md mx-auto mt-6 leading-relaxed text-center text-gray-500 lg:text-left'>
                eTutor. <em> We're all about connection and education.</em>
                <br />
                We believe in supporting every individual in their learning
                goals by bringing the right people to their doorstep.
              </p>
            </div>
          </div>

          <nav class='mt-12 lg:mt-0' aria-labelledby='footer-navigation'>
            <h2 class='sr-only' id='footer-navigation'>
              Footer navigation
            </h2>

            <ul class='flex flex-wrap justify-center gap-6 lg:justify-end md:gap-8 lg:gap-12'>
              <li>
                <a
                  class='text-gray-700 transition hover:text-gray-700/75 cursor-pointer'
                  onClick={() => {
                    navigate("/aboutus");
                  }}>
                  About Us
                </a>
              </li>

              <li>
                <a
                  class='text-gray-700 transition hover:text-gray-700/75 cursor-pointer'
                  onClick={() => {
                    navigate("/");
                  }}>
                  View A Demo
                </a>
              </li>

              <li>
                <a
                  class='text-gray-700 transition hover:text-gray-700/75 cursor-pointer'
                  onClick={() => {
                    navigate("/");
                  }}>
                  Sign In
                </a>
              </li>

              <li>
                <a
                  class='text-gray-700 transition hover:text-gray-700/75 cursor-pointer'
                  onClick={() => {
                    navigate("/signup");
                  }}>
                  Sign Up
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <p class='mt-12 text-sm text-center text-gray-500 lg:text-right'>
          Copyright &copy; eTutor 2022. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
