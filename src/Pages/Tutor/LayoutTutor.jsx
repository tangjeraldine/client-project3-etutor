import { Outlet, useNavigate } from "react-router-dom";

const LayoutTutor = () => {
  const navigate = useNavigate()
  return (
    <>
    <ul>
    <li onClick={() => navigate('/tutor')}>my classes</li>
    <li onClick={() => navigate('/tutor/mytutees')}>my tutees</li>
    <li>ask anything</li>
    <li>my account</li>
    </ul>
    <Outlet />

    <p>insert footer here</p>
    </>
  );
}; 

export default LayoutTutor