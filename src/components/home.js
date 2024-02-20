import './home.css';
import axios from "axios";
import * as yup from 'yup';
import moment from 'moment';
import * as React from 'react';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Zoom from '@mui/material/Zoom';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import MuiAlert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect, useRef, forwardRef } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const validationSchema = yup.object({
    feedback: yup
        .string('Enter your Message')
        .required("Can't be empty"),
});

const Home = () => {

    const inputRef = useRef()
    const appName = 'Live Weather'
    const report = require('./files/report.webp')

    const [state, setState] = useState({ right: false })
    const [feedbackType, setFeedbackType] = useState('')
    const [drawerReport, setDrawerReport] = useState('none')
    const [drawerSuggest, setDrawerSuggest] = useState('none')
    const [snackbarContent, setSnackbarContent] = useState('')
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
    const [successSnackbar, setSuccessSnackbar] = useState(true)
    const [drawerFeedback, setDrawerFeedback] = useState('flex')

    const openSnackbar = () => {
        setIsSnackbarOpen(true)
    };

    const closeSnackbar = (reason) => {
        if (reason === 'clickAway') {
            return;
        }
        setIsSnackbarOpen(false)
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const formik = useFormik({
        initialValues: {
            type: '',
            webapp: '',
            feedback: '',
        },
        validationSchema: validationSchema,
        onSubmit: () => {
            try {
                axios.post('https://64869defbeba6297278ef763.mockapi.io/feedback', {
                    webapp: appName,
                    type: feedbackType,
                    feedback: formik.values.feedback,
                });
                setSuccessSnackbar(true)
                setSnackbarContent('Message sent successfully!!')
                openSnackbar()
                setDrawerFeedback('flex')
                setDrawerReport('none')
                setDrawerSuggest('none')
                formik.resetForm()
            }
            catch (e) {
                setSuccessSnackbar(false);
                setSnackbarContent('Message not Delivered!!')
                openSnackbar();
                setDrawerFeedback('flex')
                setDrawerReport('none')
                setDrawerSuggest('none')
            }
        },
    });

    const theme = createTheme({
        typography: {
            fontSize: 14,
            fontFamily: 'Poppins'
        },
    });

    const [temp, setTemp] = useState('');
    const [city, setCity] = useState('');
    const [search, setSearch] = useState('');
    const [sunset, setSunset] = useState('');
    const [sunrise, setSunrise] = useState('');
    const [country, setCountry] = useState('');
    const [humidity, setHumidity] = useState('');
    const [pressure, setPressure] = useState('');
    const [windSpeed, setWindSpeed] = useState('');
    const [feelsLike, setFeelsLike] = useState('');
    const [parameter, setParameter] = useState('');
    const [cloudiness, setCloudiness] = useState('');
    const [visibility, setVisibility] = useState('');

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
                        setPressure(response.data.main.pressure);
                        setHumidity(response.data.main.humidity);
                        setFeelsLike(response.data.main.feels_like);
                        setParameter(response.data.weather[0].main);
                        setVisibility(response.data.visibility / 1000);
                        setSunset(moment.unix(response.data.sys.sunset).format("hh:mm a"));
                        setSunrise(moment.unix(response.data.sys.sunrise).format("hh:mm a"));
                    }
                )
                .catch(
                    (error) => {
                        setSuccessSnackbar(false)
                        setSnackbarContent('Unable to fetch your current location')
                        openSnackbar()
                        console.log(error)
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
                        setPressure(response.data.main.pressure);
                        setHumidity(response.data.main.humidity);
                        setFeelsLike(response.data.main.feels_like);
                        setParameter(response.data.weather[0].main);
                        setVisibility(response.data.visibility / 1000);
                        setSunset(moment.unix(response.data.sys.sunset).format("hh:mm a"));
                        setSunrise(moment.unix(response.data.sys.sunrise).format("hh:mm a"));
                    }
                )
                .catch(
                    (error) => {
                        setSuccessSnackbar(false)
                        setSnackbarContent('Unable to found!!')
                        openSnackbar()
                        console.log(error)
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
                    setPressure(response.data.main.pressure);
                    setHumidity(response.data.main.humidity);
                    setFeelsLike(response.data.main.feels_like);
                    setParameter(response.data.weather[0].main);
                    setVisibility(response.data.visibility / 1000);
                    setSunset(moment.unix(response.data.sys.sunset).format("hh:mm a"));
                    setSunrise(moment.unix(response.data.sys.sunrise).format("hh:mm a"));
                }
            )
            .catch(
                (error) => {
                    setSuccessSnackbar(false)
                    setSnackbarContent('Unable to Process!!')
                    openSnackbar()
                    console.log(error)
                }
            )
    };

    useEffect(() => {
        defaultLocationWeather();
    }, []);

    if ((parameter === 'Clear')) {
        var weatherIcon = require('./files/sun.gif');
        var background = '#d4d42f, #e65f5f';
    }
    else if ((parameter === 'Dust') || (parameter === 'Sand') || (parameter === 'Ash')) {
        weatherIcon = require('./files/wind.gif');
        background = '#d4d42f, #e65f5f';
    }
    else if ((parameter === 'Rain')) {
        weatherIcon = require('./files/rain.gif');
        background = '#b3cde4, #1d3f58';
    }
    else if ((parameter === 'Drizzle')) {
        weatherIcon = require('./files/drizzle.gif');
        background = '#b3cde4, #1d3f58';
    }
    else if (parameter === 'Thunderstorm') {
        weatherIcon = require('./files/thunder.gif');
        background = 'lightblue, darkblue';
    }
    else if (parameter === 'Snow') {
        weatherIcon = require('./files/snow.gif');
        background = 'white, blue';
    }
    else {
        weatherIcon = require('./files/cloudy.gif');
        background = 'white, gray';
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    };

    return (
        <>
            <div className='body'>

                {/* Body */}

                <div className='home-1' style={{ backgroundImage: `linear-gradient(${background})` }} >
                    <div className='home-1-search'>
                        <form onSubmit={handleSubmit} className='home-1-search-bar'>
                            <IconButton
                                type="submit"
                                aria-label='Search City'
                                onClick={manualLocationWeather}
                            >
                                <ThemeProvider theme={theme}>
                                    <Tooltip TransitionComponent={Zoom} title="Search City" disableInteractive>
                                        <SearchIcon sx={{ fontSize: 28 }} />
                                    </Tooltip>
                                </ThemeProvider>
                            </IconButton>

                            <input
                                type='text'
                                value={search}
                                ref={inputRef}
                                className='home-1-search-bar-input'
                                placeholder='Enter City Name'
                                onChange={(event) => setSearch(event.target.value)}
                            />

                            <IconButton
                                onClick={currentLocationWeather}
                                aria-label='Live Location Weather'
                            >
                                <ThemeProvider theme={theme}>
                                    <Tooltip TransitionComponent={Zoom} title="Use Live Location" disableInteractive>
                                        <LocationSearchingIcon sx={{ fontSize: 28 }} />
                                    </Tooltip>
                                </ThemeProvider>
                            </IconButton>
                        </form>
                    </div>

                    <div className='home-1-body'>
                        <div className='home-1-body-1'>
                            {city}, {country}
                        </div>

                        <div className='home-1-body-2'>
                            <div className='home-1-body-2-main'>
                                <div className='home-1-body-2-main-head'>
                                    <div className='home-1-body-2-main-temp'>{Math.round(temp)}</div>
                                    <div className='home-1-body-2-main-cel'>&deg;C</div>
                                </div>

                                <div className='home-1-body-2-main-foot'>
                                    Feels like {Math.round(feelsLike)}&deg;
                                </div>
                            </div>

                            <div className='home-1-body-2-main'>
                                <div className='home-1-body-2-main-head'>
                                    <img
                                        alt=''
                                        src={weatherIcon}
                                        id='home-parameter-img'
                                    />
                                </div>

                                <div className='home-1-body-2-main-foot'>
                                    {parameter}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Current Details */}

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

                    <div className='home-2-bottom'>
                        <Link to='https://openweathermap.org/' target='_blank' className='home-2-bottom-link'>
                            openweathermap.org
                        </Link>
                    </div>
                </div>

                {/* Sunrise and Sunset */}

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

                    <div className='home-3-content-bottom'>
                        * Indian Standard Time (IST)
                    </div>
                </div>

                {/* Feedback Drawer */}

                <div>
                    <React.Fragment>
                        <div className='feedback-drawer-btn'>
                            <ThemeProvider theme={theme}>
                                <Tooltip TransitionComponent={Zoom} title="Provide Feedback" placement="left" disableInteractive>
                                    <IconButton
                                        aria-label='Provide Feedback'
                                        onClick={toggleDrawer('right', true)}
                                    >
                                        <ErrorOutlineOutlinedIcon
                                            sx={{ fontSize: 35 }}
                                            className='feedback-icons'
                                        />
                                    </IconButton>
                                </Tooltip>
                            </ThemeProvider>
                        </div>

                        {['right'].map((anchor) => (
                            <React.Fragment key={anchor}>
                                <Drawer
                                    anchor={anchor}
                                    open={state[anchor]}
                                    onClose={toggleDrawer(anchor, false)}
                                >
                                    <Box
                                        className='feedback-box'
                                        sx={{ display: `${drawerFeedback}`, flexDirection: 'column' }}
                                    >
                                        <div className='feedback-head'>
                                            <div>
                                                Send Feedback
                                            </div>

                                            <div>
                                                <ThemeProvider theme={theme}>
                                                    <Tooltip TransitionComponent={Zoom} title="Close" disableInteractive>
                                                        <IconButton onClick={toggleDrawer(anchor, false)}>
                                                            <CloseIcon className='feedback-icons' />
                                                        </IconButton>
                                                    </Tooltip>
                                                </ThemeProvider>
                                            </div>
                                        </div>

                                        <div className='feedback-body'>
                                            <div className='feedback-img'>
                                                <img src={report} alt='Report' height='180px' />
                                            </div>

                                            <div
                                                className='feedback-links'
                                                onClick={() => {
                                                    setDrawerFeedback('none')
                                                    setDrawerReport('flex')
                                                    setFeedbackType('Issue')
                                                }}>
                                                <div>
                                                    <ReportProblemOutlinedIcon
                                                        sx={{ fontSize: 25 }}
                                                        className='feedback-links-icon'
                                                    />
                                                </div>

                                                <div>
                                                    Report an Issue
                                                </div>
                                            </div>

                                            <div
                                                className='feedback-links'
                                                onClick={() => {
                                                    setDrawerFeedback('none')
                                                    setDrawerSuggest('flex')
                                                    setFeedbackType('Suggestion')
                                                }}>
                                                <div>
                                                    <LightbulbOutlinedIcon
                                                        sx={{ fontSize: 25 }}
                                                        className='feedback-links-icon'
                                                    />
                                                </div>

                                                <div>
                                                    Suggest an Idea
                                                </div>
                                            </div>
                                        </div>
                                    </Box>

                                    <Box
                                        className='feedback-box'
                                        sx={{ display: `${drawerReport}`, flexDirection: 'column' }}
                                    >
                                        <div className='feedback-head'>
                                            <div>
                                                <ThemeProvider theme={theme}>
                                                    <Tooltip TransitionComponent={Zoom} title="Back" disableInteractive>
                                                        <IconButton onClick={() => {
                                                            setDrawerFeedback('flex')
                                                            setDrawerReport('none')
                                                            setFeedbackType('')
                                                            formik.resetForm()
                                                        }}>
                                                            <ArrowBackIcon className='feedback-icons' />
                                                        </IconButton>
                                                    </Tooltip>
                                                </ThemeProvider>
                                            </div>

                                            <div>
                                                Report an issue
                                            </div>

                                            <ThemeProvider theme={theme}>
                                                <Tooltip TransitionComponent={Zoom} title="Close" disableInteractive>
                                                    <IconButton onClick={toggleDrawer(anchor, false)}>
                                                        <CloseIcon className='feedback-icons' />
                                                    </IconButton>
                                                </Tooltip>
                                            </ThemeProvider>
                                        </div>

                                        <form onSubmit={formik.handleSubmit} className='feedback-body'>
                                            <div className='feedback-body-1'>
                                                <div className='feedback-body-1-1'>
                                                    <div className='feedback-body-1-1-1'>
                                                        Describe the Issue or Bug
                                                    </div>

                                                    <div className='feedback-body-1-1-2'>
                                                        <textarea
                                                            rows={10}
                                                            name='feedback'
                                                            autoComplete='off'
                                                            onBlur={formik.handleBlur}
                                                            className='feedback-textarea'
                                                            value={formik.values.feedback}
                                                            onChange={formik.handleChange}
                                                            placeholder='Type your Message'
                                                        />
                                                        {formik.touched.feedback &&
                                                            <div className='feebdback-form-error'>{formik.errors.feedback}</div>
                                                        }
                                                    </div>

                                                    <div className='feedback-body-1-1-3'>
                                                        Please don't include any sensitive information
                                                    </div>
                                                </div>

                                                <div className='feedback-body-1-2'>
                                                    The information provided by you above will not be kept in encrypted form, so be sure that you didn't provide any personal or confidential information which others could misuse. For any help regarding any problem, you can email me at <a href='mailto:yashhkumarrrr@gmail.com' target='_blank' rel="noreferrer" className='feedback-body-1-2-link'>yashhkumarrrr@gmail.com</a>
                                                </div>
                                            </div>

                                            <div className='feedback-body-2'>
                                                <button
                                                    type='submit'
                                                    className='feedback-body-2-btn'
                                                >
                                                    Send
                                                </button>
                                            </div>
                                        </form>
                                    </Box>

                                    <Box
                                        sx={{ display: `${drawerSuggest}`, flexDirection: 'column' }}
                                        className='feedback-box'
                                    >
                                        <div className='feedback-head'>
                                            <div>
                                                <ThemeProvider theme={theme}>
                                                    <Tooltip TransitionComponent={Zoom} title="Back" disableInteractive>
                                                        <IconButton onClick={() => {
                                                            setDrawerFeedback('flex')
                                                            setDrawerSuggest('none')
                                                            setFeedbackType('')
                                                            formik.resetForm()
                                                        }}>
                                                            <ArrowBackIcon className='feedback-icons' />
                                                        </IconButton>
                                                    </Tooltip>
                                                </ThemeProvider>
                                            </div>

                                            <div>
                                                Suggest an Idea
                                            </div>

                                            <ThemeProvider theme={theme}>
                                                <Tooltip TransitionComponent={Zoom} title="Close" disableInteractive>
                                                    <IconButton onClick={toggleDrawer(anchor, false)}>
                                                        <CloseIcon className='feedback-icons' />
                                                    </IconButton>
                                                </Tooltip>
                                            </ThemeProvider>
                                        </div>

                                        <form className='feedback-body'>
                                            <div className='feedback-body-1'>
                                                <div className='feedback-body-1-1'>
                                                    <div className='feedback-body-1-1-1'>
                                                        Provide your valuable suggestion
                                                    </div>

                                                    <div className='feedback-body-1-1-2'>
                                                        <textarea
                                                            rows={10}
                                                            name='feedback'
                                                            autoComplete='off'
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.feedback}
                                                            onChange={formik.handleChange}
                                                            placeholder='Type your Message'
                                                            className='feedback-textarea'
                                                        />
                                                        {formik.touched.feedback &&
                                                            <div className='feebdback-form-error'>{formik.errors.feedback}</div>
                                                        }
                                                    </div>

                                                    <div className='feedback-body-1-1-3'>
                                                        Please don't include any sensitive information
                                                    </div>
                                                </div>

                                                <div className='feedback-body-1-2'>
                                                    The information provided by you above will not be kept in encrypted form, so be sure that you didn't provide any personal or confidential information which others could misuse. For any help regarding any problem, you can email me at <a href='mailto:yashhkumarrrr@gmail.com' target='_blank' rel="noreferrer" className='feedback-body-1-2-link'>yashhkumarrrr@gmail.com</a>
                                                </div>
                                            </div>

                                            <div className='feedback-body-2'>
                                                <button
                                                    onClick={formik.handleSubmit}
                                                    className='feedback-body-2-btn'
                                                >
                                                    Send
                                                </button>
                                            </div>
                                        </form>
                                    </Box>
                                </Drawer>
                            </React.Fragment>
                        ))}
                    </React.Fragment>
                </div>

                {/* Footer */}

                <div className='footer'>
                    Developed by&nbsp;
                    <Link
                        target='_blank'
                        id='footer-link'
                        to='https://yashhkumarrrr.netlify.app'
                    >
                        &copy; yashhkumarrrr
                    </Link>
                </div>

                <Snackbar open={isSnackbarOpen} autoHideDuration={1500} onClose={closeSnackbar}>
                    <Alert onClose={closeSnackbar} severity={(successSnackbar) ? 'success' : 'error'} sx={{ width: '100%', fontFamily: 'Poppins', fontSize: '14px', fontWeight: '300' }}>
                        {snackbarContent}
                    </Alert>
                </Snackbar>
            </div >
        </>
    );
};

export default Home;