import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, FormGroup } from 'reactstrap';
import ReactStars from 'react-rating-stars-component';

const ReviewForm = () => {
    return (
      <Formik
        initialValues={{
          rating: null,
          comment: ''
        }}
        onSubmit={(values) => {
          console.log('Form submitted:', values);
        }}
      >
        <Form>
          <FormGroup>
          <Field name="rating">
            {({ field, form }) => (
                <ReactStars
                count={5}
                onChange={(rating) => form.setFieldValue('rating', rating)}
                size={24}
                activeColor="#ffd700"
                />
            )}
            </Field>
          </FormGroup>
          <FormGroup>
            <Field 
              name="comment"
              as="textarea"
              rows="5"
              className="form-control"
              placeholder="Write your review here..."
            />
          </FormGroup>
          <FormGroup>
            <Button type="submit" color="primary">
              Save Review
            </Button>
          </FormGroup>
        </Form>
      </Formik>
    );
  };
  
  export default ReviewForm;