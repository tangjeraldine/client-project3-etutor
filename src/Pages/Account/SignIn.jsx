import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate()
  return (
    <>
      <h1 style={{fontSize: "50px"}}>eTutor</h1>
      <p>eTutor connects tutors and tutees</p>
      <p>find a tutor by subject and level and register your interest.</p>
      <p>once accepted, start booking available classes!</p>
      <br />
      <br />
      <h1>sign in</h1>
      <input placeholder="username" />
      <br />
      <input placeholder="password" />
      <br />
      <button style={{backgroundColor: "lime"}} onClick={() => {navigate('/tutor')}}>sign in</button>
      <br />
      <br />
      <br />
      <button style={{backgroundColor: "lime"}} onClick={() => {navigate('/signup')}}>sign up</button>
    </>
  );
}; 

export default SignIn