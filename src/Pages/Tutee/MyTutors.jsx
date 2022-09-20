const MyTutors = ({ user, myFavTutors, setMyFavTutors }) => {
  return (
    <>
      <div>
        <h1 style={{ fontSize: "30px" }}>my tutors</h1>
        <p>tutor #1</p>
        <p>tutor #2</p>
      </div>
      <br />
      <div>
        <h1 style={{ fontSize: "30px" }}>pending tutors</h1>
        <p>tutor #3</p>
        <p>tutor #4</p>
      </div>
      <br />
      <div>
        <h1 style={{ fontSize: "30px" }}>Fav Tutor</h1>
        {myFavTutors.map((tutor) => (
          <p key={tutor._id}>{tutor.fullName}</p>
        ))}
        <p>tutor #6</p>
      </div>
    </>
  );
};

export default MyTutors;
