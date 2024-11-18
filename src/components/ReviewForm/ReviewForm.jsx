//TO DO: move if statement to ternary oporator
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, FormGroup } from 'reactstrap';
import ReactStars from 'react-rating-stars-component';
import { useReviews } from '../../context/reviewContext';


const ReviewForm = ({ artist }) => {
    // first check if review existed previously 
    const { addReview, reviews } = useReviews();
    const existingReview = reviews.find(review => review.id === artist.id);
    if (existingReview) {
        return (
            <div className="existing-review">
                <h3>Your Review</h3>
                <ReactStars
                    value={existingReview.rating}
                    count={5}
                    size={24}
                    edit={false}
                    activeColor="#ffd700"
                />
                <p>{existingReview.comment}</p>
            </div>
        );
    }
    // else populate empty review form
    return (
      <Formik
        initialValues={{
          rating: null,
          comment: ''
        }}
        onSubmit={(values, {resetForm}) => {
            const review = {
                id: artist.id,
                artistName: artist.name,
                rating: values.rating,
                followers: artist.followers.total,
                genres: artist.genres.join(', '),
                dateReviewed: new Date().toISOString()
            };
        
            addReview(review);
            resetForm();
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