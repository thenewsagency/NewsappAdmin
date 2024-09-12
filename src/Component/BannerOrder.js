import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import axios from 'axios';


const BannerOrder = () => {
  // State to manage form groups
  const [formGroups, setFormGroups] = useState([{ id: Date.now(), adsId: '', itemType: '' }]);
  const [errors, setErrors] = useState({});
  const [formFeedback, setFormFeedback] = useState('');

  // Handle adding new form groups
  const addFormGroup = () => {
    if (formGroups.length < 10) {
      setFormGroups([...formGroups, { id: Date.now(), adsId: '', itemType: '' }]);
    }
  };

  // Handle removing a form group
  const removeFormGroup = (id) => {
    setFormGroups(formGroups.filter(group => group.id !== id));
  };

  // Handle change in form inputs
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFormGroups = formGroups.map((group, i) =>
      i === index ? { ...group, [name]: value } : group
    );
    setFormGroups(updatedFormGroups);
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    formGroups.forEach((group, index) => {
      if (!group.adsId) newErrors[`adsId${index}`] = 'ID is required';
      if (!group.itemType) newErrors[`itemType${index}`] = 'Item Type is required';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  if (validateForm()) {
    // Sort form groups based on adsId (or any other criteria if needed)
    const sortedFormGroups = [...formGroups];

    const formData = sortedFormGroups.map((group, index) => ({
      Id: parseInt(group.adsId, 10),
      order: index + 1,
      Category: group.itemType === "1" ? "new" : "ads",
    }));

  //  console.log('Form Data:', JSON.stringify(formData, null, 2));

    ///////////////////////// API call ////////////////////////

    //submitBannerOrder(formData)
    try {
        await axios.post('http://localhost:8080/banner/order', formData, {
        auth: {
          username: 'hello',
          password: '123'
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });
     // console.log('Response:sssssssssss', response.data);
      setFormFeedback("Banner Order change successfully ...");
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
      //  console.error('Error status: 01', error.response.status);
      //  console.error('Error data:', error.response.data);
        
        if (error.response.status === 404) {
          console.error('Endpoint not found.');
        }
        setFormFeedback(error.response.data);
        
      } else if (error.request) {
        // No response received from server
      //  console.error('No response received:', error.request);
        setFormFeedback('No response received:', error.request);
  
      } else {
        // Something else happened
     //   console.error('Error:', error.message);
        setFormFeedback('Error:', error.message);
      }
      // throw error;  // Re-throw the error if you want to propagate it further
    }

    ///////////////////////////////////////////////////////////////////////
  } else {
    setFormFeedback('Please fix the errors above.');
  }
};


  return (
 <Container className="d-flex justify-content-center align-items-center vh-90 bg-dark text-light">
      <Card style={{ width: '80%', backgroundColor: '#343a40', color: '#ffffff' }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center">Banner Order</Card.Title>
    <Form onSubmit={handleSubmit} noValidate>
      {formGroups.map((group, index) => (
        <div key={group.id} className="mb-4">
          <Form.Group className="mb-3">
            <Form.Label>{index + 1}</Form.Label>
            <Form.Control 
              name="adsId"
              placeholder="ID of New or Ads"
              type="number"
              value={group.adsId}
              onChange={(e) => handleChange(e, index)}
              isInvalid={!!errors[`adsId${index}`]}
            />
            <Form.Control.Feedback type="invalid">
              {errors[`adsId${index}`]}
            </Form.Control.Feedback>
          </Form.Group>

          <InputGroup className="mb-3">
            <InputGroup.Text id={`basic-addon${index}`}>@Item Type</InputGroup.Text>
            <Form.Select
              name="itemType"
              value={group.itemType}
              onChange={(e) => handleChange(e, index)}
              isInvalid={!!errors[`itemType${index}`]}
            >
              <option value="">Select Item</option>
              <option value="1">News</option>
              <option value="2">Ads</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors[`itemType${index}`]}
            </Form.Control.Feedback>
          </InputGroup>
          <Button 
            variant="danger" 
            onClick={() => removeFormGroup(group.id)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button 
        variant="primary" 
        onClick={addFormGroup} 
        disabled={formGroups.length >= 100}
        className="me-2"
      >
        Add
      </Button>
      <Button variant="success" type="submit">
        Submit
      </Button>
      {formFeedback && <div className="mt-3 text-center text-light">{formFeedback}</div>}
    </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};




export default BannerOrder;
