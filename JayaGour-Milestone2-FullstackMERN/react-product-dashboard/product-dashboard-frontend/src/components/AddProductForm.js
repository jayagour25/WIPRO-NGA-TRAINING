import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

const schema = Yup.object({
  name: Yup.string().required(),
  price: Yup.number().required(),
  category: Yup.string().required(),
  description: Yup.string().required(),
});

function AddProductForm() {
  const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Add Product</h2>

      <Formik
        initialValues={{
          name: "",
          price: "",
          category: "",
          description: "",
        }}
        validationSchema={schema}
        onSubmit={async (values) => {
          await addProduct(values);
          navigate("/");
        }}
      >
        <Form>

          <label>Name</label>
          <Field className="form-control" name="name" />
          <ErrorMessage className="text-danger" component="p" name="name" />

          <label className="mt-3">Price</label>
          <Field className="form-control" name="price" />
          <ErrorMessage className="text-danger" component="p" name="price" />

          <label className="mt-3">Category</label>
          <Field className="form-control" name="category" />
          <ErrorMessage className="text-danger" component="p" name="category" />

          <label className="mt-3">Description</label>
          <Field as="textarea" className="form-control" name="description" />
          <ErrorMessage className="text-danger" component="p" name="description" />

          <button className="btn btn-primary mt-3" type="submit">
            Add
          </button>

        </Form>
      </Formik>
    </div>
  );
}

export default AddProductForm;
