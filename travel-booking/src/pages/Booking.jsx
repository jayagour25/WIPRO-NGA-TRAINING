import React from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { submitBooking } from '../store/bookingSlice';
import useBookingSubmit from '../hooks/useBookingSubmit';

const schema = Yup.object({
  name: Yup.string().min(2).required('Required'),
  email: Yup.string().email().required('Required'),
  travelers: Yup.number().min(1).max(10).required('Required'),
  date: Yup.date().required('Required')
});

export default function Booking() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { status, error } = useSelector((s) => s.booking);

  const handleSubmit = useBookingSubmit(async (values, { resetForm }) => {
    await dispatch(submitBooking({ ...values, packageId: Number(id) }));
    resetForm();
  });

  return (
    <div className="mx-auto" style={{maxWidth: 720}}>
      <h2>Booking Form</h2>
      <Formik
        initialValues={{ name: '', email: '', travelers: 1, date: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <Field name="name" className="form-control" />
              <div className="text-danger"><ErrorMessage name="name" /></div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <Field name="email" type="email" className="form-control" />
              <div className="text-danger"><ErrorMessage name="email" /></div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Travelers</label>
              <Field name="travelers" type="number" className="form-control" />
              <div className="text-danger"><ErrorMessage name="travelers" /></div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Date</label>
              <Field name="date" type="date" className="form-control" />
              <div className="text-danger"><ErrorMessage name="date" /></div>
            </div>
            <div className="col-12">
              <button className="btn btn-primary" type="submit" disabled={isSubmitting || status==='loading'}>
                {status === 'loading' ? 'Submitting...' : 'Submit Booking'}
              </button>
            </div>
            {status === 'succeeded' && <div className="alert alert-success">Booking submitted!</div>}
            {status === 'failed' && <div className="alert alert-danger">{error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
}
