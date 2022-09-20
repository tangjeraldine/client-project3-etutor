import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SignIn from "./Pages/Account/SignIn";
import SignUpUser from "./Pages/Account/SignUpUser";
import SignUpTutor from "./Pages/Account/SignUpTutor";
import SignUpTutee from "./Pages/Account/SignUpTutee";
import LayoutTutor from "./Pages/Tutor/LayoutTutor";
import LayoutTutee from "./Pages/Tutee/LayoutTutee";
import MyClassesTutor from "./Pages/Tutor/MyClassesTutor";
import MyClassesTutee from "./Pages/Tutee/MyClassesTutee";
import MyTutees from "./Pages/Tutor/MyTutees";
import MyTutors from "./Pages/Tutee/MyTutors";
import Search from "./Pages/Tutee/Search";
import AskAnythingTutee from "./Pages/Tutee/AskAnythingTutee";
import AskAnythingTutor from "./Pages/Tutor/AskAnythingTutor";
import AboutUs from "./Pages/General Pages/AboutUs";
import EditProfileTutee from "./Pages/Tutee/EditProfileTutee";
import EditProfileTutor from "./Pages/Tutor/EditProfileTutor";

function App() {
  const [user, setUser] = useState({});
  const [myFavTutors, setMyFavTutors] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn setUser={setUser} />} />
        <Route path="/signup" element={<SignUpUser />} />
        <Route path="/signup/tutor" element={<SignUpTutor />} />
        <Route path="/signup/tutee" element={<SignUpTutee />} />
        <Route path="/aboutus" element={<AboutUs />} />

        <Route path="/tutor" element={<LayoutTutor user={user} />}>
          <Route index element={<MyClassesTutor user={user} />} />
          <Route path="/tutor/mytutees" element={<MyTutees user={user} />} />
          <Route
            path="/tutor/askanything"
            element={<AskAnythingTutor user={user} />}
          />
          <Route
            path="/tutor/editprofile"
            element={<EditProfileTutor user={user} />}
          />
        </Route>

        <Route path="/tutee" element={<LayoutTutee user={user} />}>
          <Route index element={<MyClassesTutee user={user} />} />
          <Route path="/tutee/mytutors" element={<MyTutors user={user} />} />
          <Route
            path="/tutee/search"
            element={
              <Search
                user={user}
                myFavTutors={myFavTutors}
                setMyFavTutors={setMyFavTutors}
              />
            }
          />
          <Route
            path="/tutee/askanything"
            element={<AskAnythingTutee user={user} />}
          />
          <Route
            path="/tutee/editprofile"
            element={<EditProfileTutee user={user} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
