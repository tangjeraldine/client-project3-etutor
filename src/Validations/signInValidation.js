import * as Yup from "yup";

const signInValidation = Yup.object({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export default signInValidation;
