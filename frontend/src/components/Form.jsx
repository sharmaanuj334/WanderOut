import React, { useState, useEffect, useRef } from 'react';
import { Button, TextField, MenuItem, Grid, Typography, Box, CircularProgress } from '@mui/material';
import { fetchCountries, generateItinerary } from '../services/api';
import '../styles/Form.css';
import { useNavigate } from 'react-router-dom';


const Form = () => {
    const [formData, setFormData] = useState({
        destination_country: '',
        budget: '',
        include_home_travel: 'No',
        state: '',
        district: '',
        number_of_people: '',
        number_of_days: '',
        travel_companions: '',
        trip_description: '',
        travel_style: 'Pilgrimage',
        travel_mode: 'Hitchhiking',
        additional_key_points: ''
    });

    const [showStateDistrict, setShowStateDistrict] = useState(false);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('');
    const videoRef = useRef(null);
    const videoSources = [require('../assets/aurora.mp4')];
    const navigate = useNavigate();


    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    useEffect(() => {
        const videoElement = videoRef.current;
        const handleEnded = () => {
            setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
        };

        if (videoElement) {
            videoElement.src = videoSources[currentVideoIndex];
            videoElement.load();
            videoElement.play();

            videoElement.addEventListener('ended', handleEnded);

            return () => {
                videoElement.removeEventListener('ended', handleEnded);
            };
        }
    }, [currentVideoIndex]);

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const loadCountries = async () => {
            try {
                const countryList = await fetchCountries();
                setCountries(countryList);
            } catch (error) {
                console.error("Failed to fetch countries", error);
            }
        };

        loadCountries();
    }, []);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.onloadeddata = () => {
                videoElement.play();
            };
        }
    }, [currentVideoIndex]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'include_home_travel' && value === 'Yes') {
            setShowStateDistrict(true);
        } else if (name === 'include_home_travel' && value === 'No') {
            setShowStateDistrict(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await generateItinerary(formData);
            setLoading(false);

            localStorage.setItem('itinerary', JSON.stringify(response.itinerary));
            navigate('/response');
        } catch (error) {
            setLoading(false);
            console.error('Error generating itinerary:', error);
        }
    };


    return (
        <>
            <div className="video-background">
                <video ref={videoRef} muted loop />
            </div>

            <Box className="main-content">
                <Box className="form-container">
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{
                        fontFamily: 'Lobster, cursive',
                        fontWeight: '400',
                        fontSize: '2.5rem',
                        color: '#3E2723',
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    Details of the Trip
                </Typography>

                    <form onSubmit={handleSubmit} className="form-content">
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    select
                                    label="Destination"
                                    name="destination_country"
                                    value={formData.destination_country}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                >
                                    <MenuItem value="">Select a Country</MenuItem>
                                    {countries.map((country, index) => (
                                        <MenuItem key={index} value={country}>
                                            {country}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="Budget (in USD)"
                                    name="budget"
                                    type="number"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    select
                                    label="Include home to trip travel?"
                                    name="include_home_travel"
                                    value={formData.include_home_travel}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                >
                                    <MenuItem value="No">No</MenuItem>
                                    <MenuItem value="Yes">Yes</MenuItem>
                                </TextField>
                            </Grid>

                            {showStateDistrict && (
                                <>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="State"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            fullWidth
                                            required={showStateDistrict}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="District"
                                            name="district"
                                            value={formData.district}
                                            onChange={handleChange}
                                            fullWidth
                                            required={showStateDistrict}
                                        />
                                    </Grid>
                                </>
                            )}

                            <Grid item xs={4}>
                                <TextField
                                    label="Number of people"
                                    name="number_of_people"
                                    type="number"
                                    value={formData.number_of_people}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    select
                                    label="Companions"
                                    name="travel_companions"
                                    value={formData.travel_companions}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                >
                                    <MenuItem value="Colleagues">Colleagues</MenuItem>
                                    <MenuItem value="Friends">Friends</MenuItem>
                                    <MenuItem value="Family">Family</MenuItem>
                                    <MenuItem value="Solo">Solo</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    label="Number of days" // Added this section
                                    name="number_of_days"
                                    type="number"
                                    value={formData.number_of_days}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Trip Description"
                                    name="trip_description"
                                    multiline
                                    rows={1.5}
                                    value={formData.trip_description}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    placeholder="Our major target to see snowfall and play with snow"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    select
                                    label="Target"
                                    name="travel_style"
                                    value={formData.travel_style}
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    <MenuItem value="Exploration">Exploration</MenuItem>
                                    <MenuItem value="Pilgrimage">Pilgrimage</MenuItem>
                                    <MenuItem value="Scenery">Scenic</MenuItem>
                                    <MenuItem value="Adventure">Adventure</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    select
                                    label="Major Transportation"
                                    name="travel_mode"
                                    value={formData.travel_mode}
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    <MenuItem value="Hitchhiking">Hitchhiking</MenuItem>
                                    <MenuItem value="Flight">Flight</MenuItem>
                                    <MenuItem value="Bus">Bus</MenuItem>
                                    <MenuItem value="Car">Car</MenuItem>
                                    <MenuItem value="Ferry">Ferry</MenuItem>
                                    <MenuItem value="Bike">Bike</MenuItem>
                                    <MenuItem value="Train">Train</MenuItem>
                                </TextField>
                            </Grid>


                            <Grid item xs={12}>
                                <TextField
                                    label="Additional Details"
                                    name="additional_key_points"
                                    multiline
                                    rows={1}
                                    value={formData.additional_key_points}
                                    onChange={handleChange}
                                    fullWidth
                                    placeholder="Any specific requests or preferences"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={loading}
                                        sx={{ padding: '10px 30px' }}
                                    >
                                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Itinerary'}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Box>
        </>
    );
};

export default Form;
