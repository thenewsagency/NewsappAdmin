import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import axios from 'axios';

const Deletitem = () => {

  const [id, setId] = useState('');
  const [adType, setAdType] = useState('news');
  const [feedback, setFeedback] = useState('');

  const handleIdChange = (e) => setId(e.target.value);
  const handleAdTypeChange = (e) => setAdType(e.target.value);

  // const handleDelete = (e) => {
  //   e.preventDefault();
  //   if (!id || isNaN(id)) {
  //     setFeedback('Please enter a valid ID.');
  //     return;
  //   }
  //   // Replace with actual deletion logic
  //   console.log(`Deleting ${adType} ad with ID: ${id}`);
  //   setFeedback(`Successfully deleted ${adType} ad with ID: ${id}`);
  // };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!id || isNaN(id)) {
      setFeedback('Please enter a valid ID.');
      return;
    }
  
    try {
      //previousUrl:http://localhost:8080/detail/${adType}/${id}`
      const response = await axios.delete(`http://srv620732.hstgr.cloud:8080/detail/${adType}/${id}`, {
        headers: {
          'Authorization': 'Basic ' + btoa('Hello:123') // Basic Auth if needed
        }
      });
      setFeedback(`Successfully deleted ${adType} with ID: ${id}`);
      console.log("Delete response:", response.data);
    } catch (error) {
      console.error("Error deleting ad:", error);
      setFeedback('Failed to delete the ad. Please try again.');
    }
  };
  


  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-dark">
    <Card style={{ width: '50%', backgroundColor: '#343a40', color: '#ffffff' }}>
      <Card.Body>
        <Card.Title className="mb-4">Delete Ad</Card.Title>
        <Form onSubmit={handleDelete}>
          <Form.Group className="mb-3" controlId="adId">
            <Form.Label>Ad ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Ad ID"
              value={id}
              onChange={handleIdChange}
              isInvalid={!!feedback && id === ''}
            />
            <Form.Control.Feedback type="invalid">
              {feedback}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="adType">
            <Form.Label>Select Ad Type</Form.Label>
            <Form.Control
              as="select"
              value={adType}
              onChange={handleAdTypeChange}
            >
              <option value="news">News</option>
              <option value="ads">Ads</option>
            </Form.Control>
          </Form.Group>
          <Button variant="danger" type="submit">
            Delete
          </Button>
          {feedback && <div className="mt-3 text-white">{feedback}</div>}
        </Form>
      </Card.Body>
    </Card>
  </Container>
  )
}

export default Deletitem
