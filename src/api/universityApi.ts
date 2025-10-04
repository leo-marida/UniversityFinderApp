// src/api/universityApi.ts

import axios from 'axios';
import { University } from '../types'; // Import our new University type

const API_URL = 'http://universibilities.hipolabs.com/search';

/**
 * Fetches a list of universities from the API.
 * @param country - An optional country name to filter the results.
 * @returns A promise that resolves to an array of University objects.
 */
export const fetchUniversities = async (country: string = ''): Promise<University[]> => {
  try {
    // We use a generic here to tell Axios what kind of data to expect
    const response = await axios.get<University[]>(`${API_URL}?country=${country}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching universities:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};