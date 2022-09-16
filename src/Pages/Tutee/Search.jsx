import { Field, Formik, Form } from "formik";

const Search = () => {
  return (
    <>
      <>
        <h1 style={{ fontSize: "50px" }}>Search</h1>

        {/* using formik */}
        <Formik
          initi
          alValues={{
            subjects: "",
            level: "",
            classSetting: "select",
          }}
        >
          {({ handleChange, handleBlur, values, errors, touched }) => (
            <div>
              <Form>
                <label>select subject: </label>
                <Field
                  as="select"
                  name="subjects"
                  values={""}
                  onChange={handleChange}
                >
                  <option disabled>select subject</option>
                  <option value="">Mathematics</option>
                  <option value="">English</option>
                  <option value="">A-Math</option>
                  <option value="">E-Math</option>
                  <option value="">Biology</option>
                  <option value="">Chemistry</option>
                  <option value="">Physics</option>
                </Field>

                <br />
              </Form>

              <Form>
                <label>select level: </label>
                <Field
                  as="select"
                  name="level"
                  values={""}
                  onChange={handleChange}
                >
                  <option disabled>select subject</option>
                  <option value="">pri 1</option>
                  <option value="">pri 2</option>
                  <option value="">pri 3</option>
                  <option value="">pri 4</option>
                  <option value="">pri 5</option>
                  <option value="">pri 6</option>
                  <option value="">sec 1</option>
                  <option value="">sec 2</option>
                  <option value="">sec 3</option>
                  <option value="">sec 4</option>
                  <option value="">sec 5</option>
                </Field>

                <br />
              </Form>

              <Form>
                <label>select class setting: </label>
                <Field
                  as="select"
                  name="class setting"
                  values={""}
                  onChange={handleChange}
                >
                  <option disabled>select subject</option>
                  <option value="">remote</option>
                  <option value="">in person </option>
                </Field>

                <br />
              </Form>

              <button style={{ backgroundColor: "lime" }}>submit </button>
            </div>
          )}
        </Formik>

        <br />
        <br />
        <br />
      </>
    </>
  );
};

export default Search;
