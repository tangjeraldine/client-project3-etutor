import { useNavigate } from "react-router-dom";
import signUpAsTutorValidation from "../../Validations/signUpAsTutorValidation";
import { Field, Formik, Form } from "formik";

const SignUpTutor = () => {
  const navigate = useNavigate();

  const priSubjects = ["English", "Mathematics", "Science"];

  const secSubjects = [
    "Additional Mathematics",
    "Elementary Mathematics",
    "Biology",
    "Physics",
    "Chemistry",
  ];

  const priClassLevel = [
    "Primary 1",
    "Primary 2",
    "Primary 3",
    "Primary 4",
    "Primary 5",
    "Primary 6",
  ];

  const secClassLevel = [
    "Secondary 1",
    "Secondary 2",
    "Secondary 3",
    "Secondary 4",
    "Secondary 5",
  ];

  return (
    <>
      <h1 style={{ fontSize: "50px" }}>sign up as tutor</h1>

      {/* using formik */}
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          phone: "",
          region: "select",
          rates: "",
          classType: "select",
          classLevel: "",
          subjects: "",
          educationBackground: "",
          teachingExperience: "",
        }}
        validationSchema={signUpAsTutorValidation}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => (
          <Form>
            <p>Full Name</p>
            <Field
              name="fullName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fullName}
            />
            {errors.fullName && touched.fullName ? (
              <div>{errors.fullName}</div>
            ) : null}
            <br />
            
            <p>Email</p>
            <Field
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <br />
            
            <p>Phone</p>
            <Field
              name="phone"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.phone && touched.phone ? <div>{errors.phone}</div> : null}
            <br />

            <p>Region</p>
            <Field
              as="select"
              name="region"
              values={values.region}
              onChange={handleChange}
            >
              <option disabled>select</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="Central">Central</option>
            </Field>
            {errors.region && touched.region ? (
              <div>{errors.region}</div>
            ) : null}
            <br />
            <br />

            <p>Rates per lesson</p>
            <Field
              name="rates"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.rates}
            />
            {errors.rates && touched.rates ? <div>{errors.rates}</div> : null}
            <br />

            <p>Class Type</p>
            <Field
              as="select"
              name="classType"
              values={values.classType}
              onChange={handleChange}
            >
              <option disabled>select</option>
              <option value="In-Person">In-Person</option>
              <option value="Remote">Remote</option>
              <option value="Both In-Person and Remote">Both</option>
            </Field>
            {errors.classType && touched.classType ? (
              <div>{errors.classType}</div>
            ) : null}
            <br />
            <br />

            <p>Class Level</p>
            <div>
              Primary
              {priClassLevel.map((level) => {
                return (
                  <div key={level}>
                    <Field type="checkbox" name="classLevel" value={level} />
                    {level}
                  </div>
                );
              })}
              <br />
              Secondary
              {secClassLevel.map((level) => {
                return (
                  <div key={level}>
                    <Field type="checkbox" name="classLevel" value={level} />
                    {level}
                  </div>
                );
              })}
            </div>
            {errors.classLevel && touched.classLevel ? (
              <div>{errors.classLevel}</div>
            ) : null}
            <br />

            <p>Subjects</p>
            <div>
              Primary
              {priSubjects.map((subject) => {
                return (
                  <div key={subject}>
                    <Field type="checkbox" name="subjects" value={subject} />
                    {subject}
                  </div>
                );
              })}
              <br />
              Secondary
              {secSubjects.map((subject) => {
                return (
                  <div key={subject}>
                    <Field type="checkbox" name="subjects" value={subject} />
                    {subject}
                  </div>
                );
              })}
            </div>
            {errors.subjects && touched.subjects ? (
              <div>{errors.subjects}</div>
            ) : null}
            <br />
            <br />

            <p>Education Background</p>
            <Field
              name="educationBackground"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.educationBackground}
            />
            {errors.educationBackground && touched.educationBackground ? (
              <div>{errors.educationBackground}</div>
            ) : null}
            <p>Teaching Experience</p>
            <Field
              name="teachingExperience"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.teachingExperience}
            />
            {errors.teachingExperience && touched.teachingExperience ? (
              <div>{errors.teachingExperience}</div>
            ) : null}
            <br />
            <button type="submit" style={{ backgroundColor: "lime" }}>
              sign up
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignUpTutor;
