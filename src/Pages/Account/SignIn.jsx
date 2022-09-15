import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import urlcat from "urlcat";
import axios from "axios";
import { data } from "autoprefixer";

const SERVER = import.meta.env.VITE_SERVER;

const SignIn = () => {
  const navigate = useNavigate();

  //to decode token and find out usertype
  const parseJwt = (token) => {
    if (token === "") {
      return {};
    }
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    const elements = event.target.elements;
    const user = {
      username: elements.username.value,
      password: elements.password.value,
    };

    const url = urlcat(SERVER, "/user/signin");

    axios
      .post(url, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then(({ data }) => {
        console.log(data);
        if (data.error === "No user" || data.error === "Validation failed") {
          alert("Sign in failed!");
        } else {
          const userType = parseJwt(data.token).userTYPE;
          if (userType === "tutor") {
            navigate("/tutor");
          } else {
            navigate("/tutee");
          }
        }
      });
  };

  //   fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(user),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);

  // });
  // };

  return (
    <>
      <h1 style={{ fontSize: "50px" }}>eTutor</h1>
      <p>eTutor connects tutors and tutees</p>
      <p>find a tutor by subject and level and register your interest.</p>
      <p>once accepted, start booking available classes!</p>
      <br />
      <br />
      <h1>sign in</h1>

      <form onSubmit={handleSignIn}>
        <input name="username" placeholder="username" />
        <br />
        <input name="password" placeholder="password" />
        <button style={{ backgroundColor: "lime" }}>sign in</button>
      </form>

      <br />
      {/* <button style={{backgroundColor: "lime"}} onClick={() => {navigate('/tutee')}}>sign in as tutee</button> */}
      <br />
      <br />
      <br />
      <button
        style={{ backgroundColor: "lime" }}
        onClick={() => {
          navigate("/signup");
        }}
      >
        sign up
      </button>
    </>
  );
};

export default SignIn;
