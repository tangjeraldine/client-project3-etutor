import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Pages/Account/SignIn";
import SignUpUser from "./Pages/Account/SignUpUser";
import SignUpTutor from "./Pages/Account/SignUpTutor";
import SignUpTutee from "./Pages/Account/SignUpTutee";
import LayoutTutor from './Pages/Tutor/LayoutTutor'
import LayoutTutee from './Pages/Tutee/LayoutTutee'
import MyClassesTutor from "./Pages/Tutor/MyClassesTutor";
import MyClassesTutee from './Pages/Tutee/MyClassesTutee'
import MyTutees from './Pages/Tutor/MyTutees'
import MyTutors from './Pages/Tutee/MyTutors'
import Search from './Pages/Tutee/Search'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUpUser />} />
        <Route path="/signup/tutor" element={<SignUpTutor />} />
        <Route path="/signup/tutee" element={<SignUpTutee />} />

        <Route path="/tutor" element={<LayoutTutor />}>
          <Route index element={<MyClassesTutor />} />
          <Route path="/tutor/mytutees" element={<MyTutees />} />
          {/* <Route path="/tutor/askanything" element={<AskAnything />} /> */}
          {/* <Route path="/tutor/editprofile" element={<EditProfile />} /> */}
        </Route>

        <Route path="/tutee" element={<LayoutTutee />}>
          <Route index element={<MyClassesTutee />} />
          <Route path="/tutee/mytutors" element={<MyTutors />} />
          <Route path="/tutee/search" element={<Search />} />
          {/* <Route path="/tutee/askanything" element={<AskAnything />} /> */}
          {/* <Route path="/tutee/editprofile" element={<EditProfile />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
