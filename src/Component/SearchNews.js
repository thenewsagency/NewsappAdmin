import React, { useState } from 'react';
import { Form, Button, Container, Card, ListGroup, Alert } from 'react-bootstrap';
import axios from 'axios';

function SearchNews() {


    const [adId, setAdId] = useState('');
    const [adType, setAdType] = useState('news');
    const [feedback, setFeedback] = useState('');
    const [adDetails, setAdDetails] = useState(null);
  
    const handleInputChange = (e) => setAdId(e.target.value);
    const handleAdTypeChange = (e) => setAdType(e.target.value);
  
    const handleSearch = async (e) => {
      e.preventDefault();
  
      if (!adId) {
        setFeedback('Please enter a valid ID.');
        return;
      }
  
      let url;
      if (adType === 'ads') {
        //url = `http://localhost:8080/ads/${adId}`;
        url = `http://srv620732.hstgr.cloud:8080/ads/${adId}`;
      } else {
        //url = `http://localhost:8080/getnews/${adId}`;
        url = `http://srv620732.hstgr.cloud:8080/getnews/${adId}`;
      }
  
      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': 'Basic ' + btoa('Hello:123'), // Basic Auth if needed
          },
        });
  
        setAdDetails(response.data);
        setFeedback(`Successfully fetched ${adType} details.`);
      } catch (error) {
        console.error('Error fetching ad details:', error);
        setAdDetails(null);
        setFeedback('Failed to fetch the details. Please check the ID or try again.');
      }
    };





  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark">
    <Card style={{ width: '80%', backgroundColor: '#343a40', color: '#ffffff', borderRadius: '15px' }}>
      <Card.Body>
        <Card.Title className="mb-4 text-center">Search Ad/News Details</Card.Title>
        <Form onSubmit={handleSearch}>
          <Form.Group className="mb-3" controlId="adType">
            <Form.Label>Select Type</Form.Label>
            <Form.Control as="select" value={adType} onChange={handleAdTypeChange}>
              <option value="news">News</option>
              <option value="ads">Ads</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="adId">
            <Form.Label>Enter {adType.charAt(0).toUpperCase() + adType.slice(1)} ID</Form.Label>
            <Form.Control
              type="text"
              placeholder={`Enter ${adType} ID`}
              value={adId}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Search
          </Button>
          {feedback && (
            <Alert className="mt-3" variant={feedback.includes('Failed') ? 'danger' : 'success'}>
              {feedback}
            </Alert>
          )}
        </Form>
      </Card.Body>
    </Card>

    {/* Output Container for Ad/News Details */}
    {adDetails && (
      <Card className="mt-4" style={{ width: '80%', backgroundColor: '#454d55', borderRadius: '15px' }}>
        <Card.Body>
          <Card.Title className="text-center text-white">{adType.charAt(0).toUpperCase() + adType.slice(1)} Details</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item style={{ backgroundColor: '#343a40', border: 'none', color: '#ffffff' }}>
              <strong>ID:</strong> {adDetails.id} <br />
              <strong>Headline:</strong> {adDetails.headline} <br />
              {adDetails.details && (
                <>
                  <strong>Details:</strong> {adDetails.details}
                </>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    )}
  </Container>
  )
}

export default SearchNews
