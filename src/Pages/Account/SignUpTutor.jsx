import { useNavigate } from "react-router-dom";
import signUpAsTutorValidation from "../../Validations/signUpAsTutorValidation";
import { Field, Formik, Form } from "formik";

const SignUpTutor = () => {
  const navigate = useNavigate();
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
          educationBackground: "",
          teachingExperience: "",
          classLevel: "",
          subjects: "",
        }}
        validationSchema={signUpAsTutorValidation}
        onSubmit={(values) => handleSignUpAsTutor(values)}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => (
          <Form>
            <p>Full Name</p>
            <Field
              name="fullName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            {errors.fullName && touched.fullName ? (
              <div>{errors.fullName}</div>
            ) : null}

            <p>Email</p>
            <Field
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}

            <p>Phone</p>
            <Field
              name="phone"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.phone && touched.phone ? <div>{errors.phone}</div> : null}

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

            <p>Rates per lesson</p>
            <Field
              name="rates"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.rates}
            />
            {errors.rates && touched.rates ? <div>{errors.rates}</div> : null}

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

            <p>Education Background</p>
            <Field
              name="educationBackground"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.educationBackground}
            />
            {errors.educationBackground && touched.educationBackground ? <div>{errors.educationBackground}</div> : null}

            <p>Teaching Experience</p>
            <Field
              name="teachingExperience"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.teachingExperience}
            />
            {errors.teachingExperience && touched.teachingExperience ? <div>{errors.teachingExperience}</div> : null}

            <p>Class Level</p>
            <hr/>
            <Field type='checkbox' name='classLevel' value='Primary 1'/>
            <p>Primary 1</p>
            <Field type='checkbox' name='classLevel' value='Primary 2'/>
            <p>Primary 2</p>
            <Field type='checkbox' name='classLevel' value='Primary 3'/>
            <p>Primary 3</p>
            <Field type='checkbox' name='classLevel' value='Primary 4'/>
            <p>Primary 4</p>
            <Field type='checkbox' name='classLevel' value='Primary 5'/>
            <p>Primary 5</p>
            <Field type='checkbox' name='classLevel' value='Primary 6'/>
            <p>Primary 6</p>

            <Field type='checkbox' name='classLevel' value='Secondary 1'/>
            <Field type='checkbox' name='classLevel' value='Secondary 2'/>
            <Field type='checkbox' name='classLevel' value='Secondary 3'/>
            <Field type='checkbox' name='classLevel' value='Secondary 4'/>
            <Field type='checkbox' name='classLevel' value='Secondary 5'/>


            <p>Subjects</p>
            <br />
            <button type="submit" style={{ backgroundColor: "lime" }}>
              sign up
            </button>
          </Form>
        )}
      </Formik>

      <button
        style={{ backgroundColor: "lime" }}
        onClick={() => {
          navigate("/");
        }}
      >
        sign up
      </button>
    </>
  );
};

export default SignUpTutor;
