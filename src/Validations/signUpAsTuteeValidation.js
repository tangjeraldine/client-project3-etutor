import * as yup from "yup";

const signUpAsTuteeValidation = yup.object({
  fullName: yup
    .string()
    .matches(/^[a-zA-Z\s]{4,30}$/, {
      message:
        "Name should have 4-30 characters, and contain only alphabets.",
      excludeEmptyString: true,
    })
    .required("A username is required."),
  // email: yup
  //   .string()
  //   .email("Must be a valid email")
  //   .required("An email address is required."),
  phone: yup
  .string()
  .matches(/^[0-9]{8,20}$/, {
    message: "Phone number should be between 8-20 digits long.",
    excludeEmptyString: true,
  })
  .required("A phone number is required."),
  region: yup
    .string()
    .required("A region is required.")
    .matches(/^(North|South|East|West|Central)$/, {
      message: "A region is required.",
      excludeEmptyString: true,
    }), //north south east west central
  preferredContactMode: yup
    .string()
    .required("Preferred mode of contact is required.")
    .matches(/^(Phone Call|Email|WhatsApp Message)$/, {
      message: "Preferred mode of contact is required.",
      excludeEmptyString: true,
    }),
  currentLevel: yup
    .string()
    .required("Class level is required.")
    .matches(
      /(Primary 1|Primary 2|Primary 3|Primary 4|Primary 5|Primary 6|Secondary 1|Secondary 2|Secondary 3|Secondary 4|Secondary 5)/,
      {
        message: "Please select a valid class level.",
        excludeEmptyString: true,
      }
    ),
  subjects: yup
    .array()
    .min(1, "At least one subject is required.")
    .of(yup.string())
    .required("At least one subject is required."),
  // .matches(/(English|Mathematics|Science|Additional Mathematics|Elementary Mathematics|Biology|Physics|Chemistry)/, {
  //   message: "Please select at least one subject.",
  //   excludeEmptyString: true,
  // }),
});

export default signUpAsTuteeValidation;
