
import axios from 'axios';




export const submitBannerOrder = async (formData) => {
 

  try {
    //previousUrl:http://localhost:8080/banner/order
    const response = await axios.post('https://newsapp-latest.onrender.com/banner/order', formData, {
      auth: {
        username: 'hello',
        password: '123'
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Response:', response.data);
    return response;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Error status: 01', error.response.status);
      console.error('Error data:', error.response.data);
      
      if (error.response.status === 404) {
        console.error('Endpoint not found.');
      }

      return "kjbfjkbsdfjkbsdfjhbsjklfbjaskdf";
    } else if (error.request) {
      // No response received from server
      console.error('No response received:', error.request);

    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    // throw error;  // Re-throw the error if you want to propagate it further
  }


};



