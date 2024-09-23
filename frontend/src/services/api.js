import axios from 'axios';

// Update this to your actual backend URL on Render
const BACKEND_URL = 'https://wanderout.onrender.com'; // Replace with your actual URL

export const generateItinerary = async (formData) => {
    console.log('Generating itinerary...');
    const response = await fetch(`${BACKEND_URL}/generate-itinerary`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });

    if (!response.ok) {
        throw new Error('Failed to generate itinerary');
    }

    return await response.json();
};

export const fetchCountries = async () => {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        return response.data.map(country => country.name.common).sort();
    } catch (error) {
        console.error("Error fetching countries: ", error);
        throw error;
    }
};
