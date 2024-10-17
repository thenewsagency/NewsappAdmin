import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';



const PublishAds = () => {
  const [formData, setFormData] = useState({
    hindiHeadline: '',
    englishHeadline: '',
    file: null,
  });

  const [errors, setErrors] = useState({
    hindiHeadline: '',
    englishHeadline: '',
    file: '',
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
   
    if (!formData.englishHeadline) newErrors.englishHeadline = 'Headline is required';
    

    if (formData.file && formData.file.size > 10 * 1024 * 1024) {
      newErrors.file = 'File size must be less than 10 MB';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(e);
    

    if (validateForm()) {
      const formDataToSend = new FormData();
      
      // Append form data
      formDataToSend.append("Image", formData.file);
      formDataToSend.append("AdsHindi", JSON.stringify({
        AdsHindiDetail_ID: 123, // Replace with actual ID
        Headline: formData.hindiHeadline,
        
      }));
      formDataToSend.append("AdsEnglish", JSON.stringify({
        AdsEnglishDetail_ID: 123, // Replace with actual ID
        Headline: formData.englishHeadline,
       
      }));
  
      
      try {
        //previousUrl:http://localhost:8080/ads/upload
        //api link https://newsapp-latest.onrender.com/ads/upload
        const response = await axios.post("http://srv620732.hstgr.cloud:8080/ads/upload", formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Basic ' + btoa('Hello:123') // Basic Auth
          }
        });
  
        setFormFeedback('Form submitted successfully!');
        console.log("Response:", response.data);
  
        // Clear the form
        setFormData({
          hindiHeadline: '',
          englishHeadline: '',
          file: null,
        });
        setErrors({});
      } catch (error) {
        console.error("Error uploading file:", error);
        setFormFeedback('Failed to submit form. Please try again.');
      }
    } else {
      setFormFeedback('Please fix the errors above.');
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">

      <Card style={{ marginTop:"auto", width: '70%', backgroundColor: '#343a40', color: '#ffffff' }}>
        <Card.Body>
          <Card.Title className="mb-4">Publish Ads </Card.Title>
          

  
          <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>To Publish an Ad:</Accordion.Header>
            <Accordion.Body>
           <ol>
              <li><b> Publish Your Ad:</b> Before you can publish your news, you first need to add your ad. Please fill in all required details about the ad. Ensure that no fields are missed.</li>
              <li><b>Receive an ID:</b> After successfully publishing your ad, you will receive a unique ID.</li>
              <li><b>Order Your Banner: </b>Go to the Banner option and enter the ID you received. Complete the order by filling in the necessary details.</li>
           </ol>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

          <h3>Hindi Deatil</h3>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="hindiHeadline">
              <Form.Label>Ads Headlines</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ads headlines" 
                name="hindiHeadline" 
                value={formData.hindiHeadline}
                onChange={handleChange}
                isInvalid={!!errors.hindiHeadline}
              />
              <Form.Control.Feedback type="invalid">
                {errors.hindiHeadline}
              </Form.Control.Feedback>
            </Form.Group>
       

            <h3>English Ads</h3>
            <Form.Group className="mb-3" controlId="englishHeadline">
              <Form.Label>Ads Headlines</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ads headlines" 
                name="englishHeadline" 
                value={formData.englishHeadline}
                onChange={handleChange}
                isInvalid={!!errors.englishHeadline}
              />
              <Form.Control.Feedback type="invalid">
                {errors.englishHeadline}
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

export default PublishAds;
