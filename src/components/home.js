import './home.css';
import axios from "axios";
import moment from 'moment';
import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect, useRef, forwardRef } from "react";
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Home = () => {

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickAway') {
            return;
        }
        setOpen(false);
    };

    const searchInput = useRef();
    const [temp, setTemp] = useState('');
    const [city, setCity] = useState('');
    const [search, setSearch] = useState('');
    const [sunset, setSunset] = useState('');
    const [sunrise, setSunrise] = useState('');
    const [maxTemp, setMaxTemp] = useState('');
    const [minTemp, setMinTemp] = useState('');
    const [country, setCountry] = useState('');
    const [humidity, setHumidity] = useState('');
    const [pressure, setPressure] = useState('');
    const [windSpeed, setWindSpeed] = useState('');
    const [feelsLike, setFeelsLike] = useState('');
    const [parameter, setParameter] = useState('');
    const [cloudiness, setCloudiness] = useState('');
    const [visibility, setVisibility] = useState('');

    const changeSearch = (value) => {
        setSearch(value);
    }

    const currentLocationWeather = () => {
        navigator.geolocation.getCurrentPosition((position) => {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=467ecc14a2f42a9cc7322b225ea96ae0&units=metric`
            )
                .then(
                    (response) => {
                        setCity(response.data.name);
                        setTemp(response.data.main.temp);
                        setCountry(response.data.sys.country);
                        setWindSpeed(response.data.wind.speed);
                        setCloudiness(response.data.clouds.all);
                        setMaxTemp(response.data.main.temp_max);
                        setMinTemp(response.data.main.temp_min);
                        setHumidity(response.data.main.humidity);
                        setPressure(response.data.main.pressure);
                        setFeelsLike(response.data.main.feels_like);
                        setParameter(response.data.weather[0].main);
                        setVisibility(response.data.visibility / 1000);
                        setSunset(moment.unix(response.data.sys.sunset).format("hh:mm a"));
                        setSunrise(moment.unix(response.data.sys.sunrise).format("hh:mm a"));
                    }
                )
                .catch(
                    (error) => {
                        handleClick();
                    }
                )
        });
    };

    const manualLocationWeather = () => {
        if (search !== '') {
            axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=467ecc14a2f42a9cc7322b225ea96ae0&units=metric`
            )
                .then(
                    (response) => {
                        setCity(response.data.name);
                        setTemp(response.data.main.temp);
                        setCountry(response.data.sys.country);
                        setWindSpeed(response.data.wind.speed);
                        setCloudiness(response.data.clouds.all);
                        setMaxTemp(response.data.main.temp_max);
                        setMinTemp(response.data.main.temp_min);
                        setFeelsLike(response.data.main.feels_like);
                        setPressure(response.data.main.pressure);
                        setHumidity(response.data.main.humidity);
                        setParameter(response.data.weather[0].main);
                        setVisibility(response.data.visibility / 1000);
                        setSunset(moment.unix(response.data.sys.sunset).format("hh:mm a"));
                        setSunrise(moment.unix(response.data.sys.sunrise).format("hh:mm a"));
                    }
                )
                .catch(
                    (error) => {
                        handleClick();
                    }
                )
        }
    };

    const defaultLocationWeather = async () => {
        axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=467ecc14a2f42a9cc7322b225ea96ae0&units=metric`
        )
            .then(
                (response) => {
                    setCity(response.data.name);
                    setTemp(response.data.main.temp);
                    setCountry(response.data.sys.country);
                    setWindSpeed(response.data.wind.speed);
                    setCloudiness(response.data.clouds.all);
                    setMaxTemp(response.data.main.temp_max);
                    setMinTemp(response.data.main.temp_min);
                    setHumidity(response.data.main.humidity);
                    setPressure(response.data.main.pressure);
                    setFeelsLike(response.data.main.feels_like);
                    setParameter(response.data.weather[0].main);
                    setVisibility(response.data.visibility / 1000);
                    setSunset(moment.unix(response.data.sys.sunset).format("hh:mm a"));
                    setSunrise(moment.unix(response.data.sys.sunrise).format("hh:mm a"));
                }
            )
            .catch(
                (error) => {
                    handleClick();
                }
            )
    };

    useEffect(() => {
        defaultLocationWeather();
    }, []);

    if ((parameter === 'Dust') || (parameter === 'Sand') || (parameter === 'Ash') || (parameter === 'Clear')) {
        var weatherIcon = require('./images/sunny.webp');
        var background = '#d4d42f, #e65f5f';
    }
    else if ((parameter === 'Rain') || (parameter === 'Drizzle')) {
        weatherIcon = require('./images/rain.webp');
        background = '#b3cde4, #1d3f58';
    }
    else if (parameter === 'Thunderstorm') {
        weatherIcon = require('./images/thunder.webp');
        background = 'lightblue, darkblue';
    }
    else if (parameter === 'Snow') {
        weatherIcon = require('./images/snow.webp');
        background = 'white, blue';
    }
    else {
        weatherIcon = require('./images/haze.gif');
        background = 'white, gray';
    }

    return (
        <>
            <div className='home-body'>
                <div className='home-1' style={{ backgroundImage: `linear-gradient(${background})` }} >
                    <div className='home-search'>
                        <Paper
                            sx={{ p: '2px 4px', display: 'flex', width: '100%', maxWidth: 600, backgroundColor: '#e6e6e6' }}
                        >
                            <InputBase
                                value={search}
                                variant='standard'
                                inputRef={searchInput}
                                placeholder='Enter City Name'
                                sx={{ ml: 1, flex: 1, fontFamily: 'Poppins' }}
                                onChange={() => changeSearch(searchInput.current.value)}
                            />
                            <IconButton
                                type="button"
                                aria-label="Search"
                                onClick={manualLocationWeather}
                            >
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </div>

                    <div className='home-section'>
                        <div className='home-section-1'>
                            {city}, {country}
                        </div>

                        <div className='home-section-2'>
                            Day {Math.round(maxTemp)}&deg; &uarr; - Night {Math.round(minTemp)}&deg; &darr;
                        </div>

                        <div className='home-section-3'>
                            <div className='home-section-3-main'>
                                <div className='home-section-3-main-head'>
                                    <div className='home-section-3-main-temp'>{Math.round(temp)}</div>
                                    <div className='home-section-3-main-cel'>&deg;C</div>
                                </div>

                                <div className='home-section-3-main-foot'>
                                    Feels like {Math.round(feelsLike)}&deg;
                                </div>
                            </div>

                            <div className='home-section-3-main'>
                                <div className='home-section-3-main-head'>
                                    <img
                                        alt=''
                                        src={weatherIcon}
                                        id='home-parameter-img'
                                    />
                                </div>

                                <div className='home-section-3-main-foot'>
                                    {parameter}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='home-2'>
                    <div className='home-2-heading'>
                        Current Details
                    </div>

                    <div className='home-2-content'>
                        <div className='home-2-content-1'>
                            <div>Humidity</div>
                            <div>Pressure</div>
                            <div>Wind Speed</div>
                            <div>Cloudiness</div>
                            <div>visibility</div>
                        </div>

                        <div className='home-2-content-2'>
                            <div>{humidity}%</div>
                            <div>{pressure} hPa</div>
                            <div>{windSpeed} m/s</div>
                            <div>{cloudiness}%</div>
                            <div>{visibility} Km</div>
                        </div>
                    </div>
                </div>

                <div className='home-3'>
                    <div className='home-3-heading'>
                        Sunrise & Sunset
                    </div>

                    <div className='home-3-content'>
                        <div className='home-3-content-1'>
                            <div>Sunrise</div>
                            <div>Sunset</div>
                        </div>

                        <div className='home-3-content-2'>
                            <div>{sunrise}</div>
                            <div>{sunset}</div>
                        </div>
                    </div>
                </div>

                <div className='home-location-btn'>
                    <Fab
                        color="secondary"
                        aria-label="Search"
                        onClick={currentLocationWeather}
                    >
                        <LocationSearchingIcon />
                    </Fab>
                </div>

                <div className='footer-body'>
                    Developed by -&nbsp;
                    <Link
                        target='_blank'
                        id='footer-link'
                        to='https://yashhkumarrrr.netlify.app'
                    >
                        Yash
                    </Link>
                </div>

                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        Unable to Process!
                    </Alert>
                </Snackbar>
            </div >
        </>
    );
};

export default Home;