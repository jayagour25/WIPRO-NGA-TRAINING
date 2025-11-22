import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Min 6 chars").required("Required"),
});

const FormikLogin = () => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={schema}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <h2>Formik Login</h2>

        <Field name="email" placeholder="Email" />
        <ErrorMessage name="email" />

        <Field name="password" placeholder="Password" type="password" />
        <ErrorMessage name="password" />

        <button type="submit">Login</button>
      </Form>
    </Formik>
  );
};

export default FormikLogin;
