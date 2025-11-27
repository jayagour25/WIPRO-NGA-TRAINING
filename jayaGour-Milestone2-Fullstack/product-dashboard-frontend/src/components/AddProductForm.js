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
      <h2>Add New Product</h2>

      <Formik
        initialValues={{ name: "", price: "", category: "", description: "" }}
        validationSchema={schema}
        onSubmit={async (values) => {
          await addProduct(values);
          navigate("/");
        }}
      >
        <Form>
          <label>Name</label>
          <Field className="form-control" name="name" />
          <ErrorMessage name="name" component="p" className="text-danger" />
          
          <label>Price</label>
          <Field className="form-control" name="price" />
          <ErrorMessage name="price" component="p" className="text-danger" />
          
          <label>Category</label>
          <Field className="form-control" name="category" />
          <ErrorMessage name="category" component="p" className="text-danger" />
          
          <label>Description</label>
          <Field className="form-control" as="textarea" name="description" />
          <ErrorMessage name="description" component="p" className="text-danger" />

          <button type="submit" className="btn btn-primary mt-3">
            Add Product
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default AddProductForm;
