import axios from 'axios';
import base64 from 'base-64';

/**
 * Makes a GET request with Basic Authentication.
 * @param {string} url - The URL of the API endpoint.
 * @param {string} username - The username for Basic Authentication.
 * @param {string} password - The password for Basic Authentication.
 * @returns {Promise<object>} - A promise that resolves with the response data or rejects with an error.
 */
export async function getWithBasicAuth(url, username, password) {
  try {
    const encodedCredentials = base64.encode(`${username}:${password}`);
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Basic ${encodedCredentials}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error making the request:', error.message);
    throw error;
  }
}
