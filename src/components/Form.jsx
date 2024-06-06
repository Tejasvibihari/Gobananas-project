
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { weatherSuccess } from '../app/weatherSlice';
import { useDispatch } from 'react-redux';

const defaultTheme = createTheme();


export default function Form() {
    const dispatch = useDispatch();
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [latitude, setLatitude] = useState("28.6194865")
    const [longitude, setLongitude] = useState("77.16752534307986");

    // Get City and state From pin code 
    const handleBlur = useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
            setCity(response.data[0].PostOffice[0].District);
            setState(response.data[0].PostOffice[0].State);
        }
        fetchData();
    }, [pincode]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            const cords = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${state}&limit=1&appid=d6aba077a0d63d6c988afd1c347f6ac5`)
            setLatitude(cords.data[0].lat);
            setLongitude(cords.data[0].lon);
        } catch (error) {
            console.log(error)
        }
    };
    // Get weather report from latitudeand longitude 
    useEffect(() => {
        console.log(latitude);
        console.log(longitude);
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d6aba077a0d63d6c988afd1c347f6ac5`)
            .then(response => {
                dispatch(weatherSuccess(response.data));
            })
            .catch(error => {
                console.log(error);
            })
    }, [latitude, longitude]);


    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="pincode"
                            label="Pin Code"
                            name="pincode"
                            autoComplete="pincode"
                            onBlur={handleBlur}
                            onChange={(e) => setPincode(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="city"
                            label="City"
                            type="text"
                            id="city"
                            value={city}
                            autoComplete="current-password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="state"
                            label="State"
                            type="text"
                            id="state"
                            value={state}
                            autoComplete="state"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Get Weather
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
