import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addBook } from "../actions/BookActions";

const schema = Yup.object().shape({
  title: Yup.string().required("Title required"),
  author: Yup.string().required("Author required"),
  price: Yup.number().required("Price required")
});

export default function AddBookForm() {
  return (
    <Formik
      initialValues={{ title: "", author: "", price: "" }}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        addBook(values);
        resetForm();
      }}
    >
      <Form>
        <label>Title</label>
        <Field name="title" />
        <ErrorMessage name="title" component="p" />

        <label>Author</label>
        <Field name="author" />
        <ErrorMessage name="author" component="p" />

        <label>Price</label>
        <Field name="price" type="number" />
        <ErrorMessage name="price" component="p" />

        <button type="submit">Add Book</button>
      </Form>
    </Formik>
  );
}
