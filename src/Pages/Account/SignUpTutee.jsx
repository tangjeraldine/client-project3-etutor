import { useNavigate } from "react-router-dom";

const SignUpTutee= () => {
  const navigate = useNavigate()
  return (
    <>
      <h1 style={{fontSize: "50px"}}>sign up as tutor</h1>
      <button style={{backgroundColor: "lime"}} onClick={() => {navigate('/')}}>sign up</button>
    </>
  );
}; 

export default SignUpTutee