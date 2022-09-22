import axios from "axios";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";

const AskAnythingTutee = () => {
  // const questions = ['q1', 'q2', 'q3']
  // //onload, useeffect
  // //axios.get all questions, response is a n array of questions with objectId
  // //save it as a state
  // //
  // const handleGoToPage = (objectId) => {
  //     axios.get(url, objectId)//pass object id as body
  //     //response
  // }
  // return (
  //     <>
  //     <h1>ask anything tutee side</h1>
  //     {questions.map((question) => (
  //         <div>
  //         <p>{question}</p>
  //         <button onClick={() => handleGoToPage(question._id)}>go to this question page</button>
  //         </div>
  //     ))}
  //     </>
  // )
  const navigate = useNavigate();
  return (
    <div>
      <aside class='overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2'>
        <div class='p-8 md:p-12 lg:px-16 lg:py-24'>
          <div class='max-w-xl mx-auto text-center sm:text-left'>
            <h2 class='text-2xl font-bold text-gray-900 md:text-3xl'>
              Ask A Tutor (Almost) Anything.
            </h2>

            <p class='hidden text-rose-700 md:mt-4 md:block'>
              With this new upcoming feature, tutees can post questions related
              to the subjects they're studying, and wait for a tutor or fellow
              tutee to answer! Comments and replies are welcome. <br />
              It's kinda like our own version of reddit, but for learning!
            </p>
            <p class='hidden text-rose-700 md:mt-4 md:block'>
              Keep a lookout for this page!
            </p>
            <div class='mt-4 md:mt-8'>
              <button
                class='block mt-2 px-4 py-2 text-sm font-medium text-white transition bg-red-700 border border-black-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 '
                onClick={() => {
                  navigate("/tutee");
                }}>
                Back to Home Page
              </button>
              <p class='hidden text-gray-400 md:mt-4 md:block'>
                All questions and answers posted will be monitored and moderated
                by our staff at eTutor. Content that is deemed to be offensive,
                obscene or vulgar will be taken down. Let's all help keep the
                eTutor community a safe and positive environment for all!
              </p>
            </div>
          </div>
        </div>

        <img
          alt='Student'
          src='https://images.unsplash.com/photo-1464582883107-8adf2dca8a9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
          class='object-cover w-full h-56 sm:h-full'
        />
      </aside>
    </div>
  );
};

export default AskAnythingTutee;
