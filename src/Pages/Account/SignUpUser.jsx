import { useNavigate } from "react-router-dom";

const SignUpUser = () => {
    const navigate = useNavigate()
    return (
        <>
        <h1 style={{fontSize: "50px"}}>sign up</h1>
        <br />
        <br />
        <input placeholder="username" />
        <br />
        <input placeholder="password" />
        <br />
        <select>
            <option>tutor</option>
            <option>tutee</option>
        </select>
        <br />
        <button style={{backgroundColor: "lime"}} onClick={() => navigate('/signup/tutor')}>next to tutor</button>
        <button style={{backgroundColor: "lime"}} onClick={() => navigate('/signup/tutee')}>next to tutee</button>
        <br />
        <br />
        <br />
        <button style={{backgroundColor: "lime"}} onClick={() => navigate('/')}>back to sign in</button>
      </> 
      );
}

export default SignUpUser