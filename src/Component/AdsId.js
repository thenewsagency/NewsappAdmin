import React, { useState } from 'react';
import { Form, Button, Container, Card, ListGroup, Alert } from 'react-bootstrap';
import axios from 'axios';

const AdsId = () => {
  const [adType, setAdType] = useState('news');
  const [feedback, setFeedback] = useState('');
  const [adDetails, setAdDetails] = useState([]);

  const handleAdTypeChange = (e) => setAdType(e.target.value);

  const handleFetchDetails = async (e) => {
    e.preventDefault();
 
   let url;
   if (adType === "ads") {
     //url = `http://localhost:8080/ads/adsId`;
     url = `https://srv620732.hstgr.cloud:8443/ads/adsId`;
   } else {
     //url = `http://localhost:8080/getnews/NewsId`;
     url = `https://srv620732.hstgr.cloud:8443/getnews/NewsId`;
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
      console.error("Error fetching ad details:", error);
      setFeedback('Failed to fetch the ad details. Please try again.');
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark">
      <Card style={{ width: '80%', backgroundColor: '#343a40', color: '#ffffff', borderRadius: '15px' }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center">Fetch Ad Details</Card.Title>
          <Form onSubmit={handleFetchDetails}>
            <Form.Group className="mb-3" controlId="adType">
              <Form.Label>Select Ad Type</Form.Label>
              <Form.Control as="select" value={adType} onChange={handleAdTypeChange}>
                <option value="news">News</option>
                <option value="ads">Ads</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Fetch Details
            </Button>
            {feedback && <Alert className="mt-3" variant={feedback.includes('failed') ? 'danger' : 'success'}>{feedback}</Alert>}
          </Form>
        </Card.Body>
      </Card>

      {/* Output Container for Ad Details */}
      {adDetails.length > 0 && (
        <Card className="mt-4" style={{ width: '80%', backgroundColor: '#454d55', borderRadius: '15px' }}>
          <Card.Body>
            <Card.Title className="text-center text-white">Ad Details</Card.Title>
            <ListGroup variant="flush">
              {adDetails.map((ad) => (
                <ListGroup.Item key={ad.ads_Id} style={{ backgroundColor: '#343a40', border: 'none', color: '#ffffff' }}>
                  <strong>ID:</strong> {ad.ads_Id} <br />
                  <strong>Headline:</strong> {ad.adsHeadline}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default AdsId;
