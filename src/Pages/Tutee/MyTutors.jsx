const MyTutors = (user) => {
  console.log(user);

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
        <h1 style={{ fontSize: "30px" }}>fav list</h1>
        <p>tutor #5</p>
        <p>tutor #6</p>
      </div>
    </>
  );
};

export default MyTutors;
