// import Calendar from "../../components/Calendar";

const SERVER = import.meta.env.VITE_SERVER;

const MyClassesTutor = () => {

  // const url = urlcat(SERVER, "/class/get-class");
  // axios
  // .get(url, values)
  // .then(({ data }) => {
  //     console.log(data);
  // })
  // .catch((error) => {
  //   if (error.response.data.error === "Tutor profile unable to be set up.") {
  //     setIsTutorProfileSetUp(false)
  //   } else {
  //     setIsEmailUnique(false)//only email is unique, if wan phone to be unique need add another condition/alert
  //   }
  // });

  return (
    <>
      <h1 style={{ fontSize: "50px" }}>my classes</h1>
      {/* <Calendar /> */}
    </>
  );
};

export default MyClassesTutor;
