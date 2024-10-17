import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const PublishNews = () => {
  const [formData, setFormData] = useState({
    hindiHeadline: '',
    hindiDetails: '',
    englishHeadline: '',
    englishDetails: '',
    file: null,
    Category: '',
  });

  const [errors, setErrors] = useState({
    hindiHeadline: '',
    hindiDetails: '',
    englishHeadline: '',
    englishDetails: '',
    file: '',
    Category: '',
  });

  const [formFeedback, setFormFeedback] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.hindiHeadline) newErrors.hindiHeadline = 'Headline is required';
    if (!formData.hindiDetails) newErrors.hindiDetails = 'Details are required';
    if (!formData.englishHeadline) newErrors.englishHeadline = 'Headline is required';
    if (!formData.englishDetails) newErrors.englishDetails = 'Details are required';
    if (!formData.Category) newErrors.Category = 'Please select a category';

    if (formData.file && formData.file.size > 10 * 1024 * 1024) {
      newErrors.file = 'File size must be less than 10 MB';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formDataToSend = new FormData();

      // Append form data
      formDataToSend.append('Image', formData.file);
      formDataToSend.append('Category', formData.Category);
      formDataToSend.append(
        'NewsHindi',
        JSON.stringify({
          NewsArticlesHindi_ID: 123, // Replace with actual ID
          Headline: formData.hindiHeadline,
          Contain: formData.hindiDetails,
        })
      );
      formDataToSend.append(
        'NewsEng',
        JSON.stringify({
          NewsArticlesEng_ID: 123, // Replace with actual ID
          Headline: formData.englishHeadline,
          Contain: formData.englishDetails,
        })
      );

      try {
       // console.log(formDataToSend.keys(formData)+"Sdfsdfsdfdsfsdfds");

       
        //previousUrl:'http://localhost:8080/fileSystem'
        //previousUrl:https://newsapp-latest.onrender.com/fileSystem
        const response = await axios.post('http://srv620732.hstgr.cloud:8080/fileSystem', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Basic ' + btoa('Hello:123'), // Basic Auth
          },
        });

        setFormFeedback('Form submitted successfully!');
        console.log('Response:', response.data);

        // Clear the form
        setFormData({
          hindiHeadline: '',
          hindiDetails: '',
          englishHeadline: '',
          englishDetails: '',
          file: null,
          Category: '',
        });
        setErrors({});
      } catch (error) {
        console.error('Error uploading file:', error);
        setFormFeedback('Failed to submit form. Please try again.');
      }
    } else {
      setFormFeedback('Please fix the errors above.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-90 bg-dark">
      <Card style={{ width: '80%', backgroundColor: '#343a40', color: '#ffffff' }}>
        <Card.Body>
          <Card.Title className="mb-4">Publish News</Card.Title>

          <h3>Hindi News</h3>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="hindiHeadline">
              <Form.Label>NEWS Headlines</Form.Label>
              <Form.Control
                type="text"
                placeholder="News headlines"
                name="hindiHeadline"
                value={formData.hindiHeadline}
                onChange={handleChange}
                isInvalid={!!errors.hindiHeadline}
              />
              <Form.Control.Feedback type="invalid">
                {errors.hindiHeadline}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="hindiDetails">
              <Form.Label>News Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="hindiDetails"
                value={formData.hindiDetails}
                onChange={handleChange}
                isInvalid={!!errors.hindiDetails}
              />
              <Form.Control.Feedback type="invalid">
                {errors.hindiDetails}
              </Form.Control.Feedback>
            </Form.Group>

            <h3>English News</h3>
            <Form.Group className="mb-3" controlId="englishHeadline">
              <Form.Label>NEWS Headlines</Form.Label>
              <Form.Control
                type="text"
                placeholder="News headlines"
                name="englishHeadline"
                value={formData.englishHeadline}
                onChange={handleChange}
                isInvalid={!!errors.englishHeadline}
              />
              <Form.Control.Feedback type="invalid">
                {errors.englishHeadline}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="englishDetails">
              <Form.Label>News Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="englishDetails"
                value={formData.englishDetails}
                onChange={handleChange}
                isInvalid={!!errors.englishDetails}
              />
              <Form.Control.Feedback type="invalid">
                {errors.englishDetails}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Simple Dropdown for Category */}
            <Form.Group className="mb-3" controlId="categorySelect">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="Category"
                value={formData.Category}
                onChange={handleChange}
                isInvalid={!!errors.Category}
              >
                <option value="">Select Category</option>
                <option value="Business">Business</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Health">Health</option>
                <option value="Sport">Sport</option>
                <option value="LocalNews">Local News</option>
                <option value="Politics">Politics</option>
                <option value="Education">Education</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.Category}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload File</Form.Label>
              <Form.Control
                type="file"
                name="file"
                onChange={handleChange}
                isInvalid={!!errors.file}
              />
              <Form.Control.Feedback type="invalid">
                {errors.file}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
            {formFeedback && <div className="mt-3 text-white">{formFeedback}</div>}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PublishNews;
