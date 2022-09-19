import { useNavigate } from "react-router-dom";

function AskAnything() {
  const navigate = useNavigate();

  //create state to save questions

    //onload, useeffect
    //axios.get all questions, response is an array of questions with objectId, timestamp classlevel, subject
    //save it as a state
    //

    const handleGoToPage = (objectId) => {
        axios.get(url, objectId)//pass object id as body
        //response
    }

  return (
    <div>
        <h1>ask anything tutee side</h1>
        {questions.map((question) => (
            <div>
            <p>{question.topic}</p>
            <p>{question.subject}</p>
            <p>{question.classLevel}</p>
            <p>question timestamp, if got time can do like 2 days ago etc</p>
            <button onClick={() => handleGoToPage(question._id)}>go to this question page</button>
            {/* click whole div instead of a button */}
            </div>
        ))}
    </div>
  );
}

export default AskAnything;
