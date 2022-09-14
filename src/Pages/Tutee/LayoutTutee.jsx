import { Outlet, useNavigate } from "react-router-dom";

const LayoutTutee = () => {
  const navigate = useNavigate()
  return (
    <>
    <ul>
    <li onClick={() => navigate('/tutee')}>my classes</li>
    <li onClick={() => navigate('/tutee/mytutors')}>my tutors</li>
    <li onClick={() => navigate('/tutee/search')}>search for tutors</li>
    <li>ask anything</li>
    <li>my account</li>
    </ul>
    <Outlet />

    <p>insert footer here</p>
    </>
  );
}; 

export default LayoutTutee