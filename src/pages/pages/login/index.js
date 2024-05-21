// ** React Imports
import { useState, useEffect } from 'react'
import withAuth from 'src/@core/hooks/withAuth'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { currentUserState } from 'src/@core/store/details.store'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components

import { TextField, IconButton, InputAdornment, Box, Button, Typography, Grid,CardContent,Alert } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import HospitalApi from 'src/@core/apis/hospital.api'
import authApi from 'src/@core/apis/auth.api'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LoginPage = () => {
  const theme = useTheme()
  const router = useRouter()
  const [formLoginData, setFormLoginData] = useState({ username: '', password: '' })
  const [formErrors, setFormErrors] = useState({})
  const [formLoginErrors, setFormLoginErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const currentUser = useRecoilValue(currentUserState)
  const setCurrentUser = useSetRecoilState(currentUserState)
  const [showAlert, setShowAlert] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState('success') // 'success', 'error', etc.
  const [alertMessage, setAlertMessage] = useState('')
  const [showRegister, setShowRegister] = useState(false);
  const [formData, setFormData] = useState({
    hospitalName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    mobileNumber: '',
    email: '',
    hospitalLicenseNumber: '',
    GST: '',
    ESI: '',
    panNumber: '',
    userName: '',
    userType: '',
    password: ''
  })

  const handleToggleForm = () => {
    setFormData({
      hospitalName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      mobileNumber: '',
      email: '',
      hospitalLicenseNumber: '',
      GST: '',
      ESI: '',
      panNumber: '',
      userName: '',
      userType: '',
      password: ''
    })
    setFormLoginData({
      username: '', password: ''
    })
    setShowRegister(!showRegister);
  };

  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  const validateLoginForm = () => {
    const errors = {}
    if (!formLoginData.username.trim()) {
      errors.username = 'Username is required'
    }
    if (formLoginData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }
    setFormLoginErrors(errors)
    return Object.keys(errors).length === 0 // No errors
  }
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const validateForm = hospitalData => {
    const errors = {}

    // Validate email format if present
    if (hospitalData.email && !validateEmail(hospitalData.email)) {
      errors.email = 'Invalid email format'
    }
    if (!/^\d{10}$/.test(hospitalData.mobileNumber)) errors.mobileNumber = 'Invalid mobile number (10 digits only)'

    for (const field of [
      'hospitalName',
      'address',
      'city',
      'state',
      'mobileNumber',
      'email',
      'panNumber',
      'hospitalLicenseNumber',
      'GST',
      'ESI',
      'zipCode'
    ]) {
      if (!formData[field]) {
        errors[field] = `${field.replace(/([A-Z])/g, ' $1').trim()} is required`
      }
    }

    if (formData.zipCode && !/^\d{6}(-\d{4})?$/.test(formData.zipCode)) {
      errors.zipCode = 'Invalid zip code format (should be 6 digits only)'
    }
    
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)) {
        errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      }
      if (!hospitalData.userName) {
        errors.userName = 'User Name is required'
      }
      if (!hospitalData.userType) {
        errors.userType = 'User Type is required'
    }

    return errors
  }
  // Helper function for email validation (basic)
  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }
  const handleLoginSubmit = async e => {
    e.preventDefault()
    console.log(formLoginData)
    if (validateLoginForm()) {
      
      authApi.handleLogin({
        payload:formLoginData,
        success:(res)=>{
          
      setCurrentUser(prevUser => ({
        ...prevUser,
        isLoggedIn: true,
        username: formLoginData.username
      }))
          setShowAlert(true)
          setAlertMessage('Successfully LoggedIn')
          setAlertSeverity('success')
        },
        err:(err)=>{
          
          setShowAlert(true)
        setAlertMessage('Invalid Username or password')
        setAlertSeverity('error')
        console.log(err);
        }
      })
    }
   
  }
  const handleSignUpClick = () => {
    router.push('/pages/register'); // Navigate to the registration page
  };
  

  const handleSubmit = async event => {
    event.preventDefault()
    const errors = validateForm(formData)
    if (Object.keys(errors).length === 0) {
      console.log(formData)
      HospitalApi.AddHospital({
        payload: formData,
        success: res => {
          console.log(res.data)
          setShowAlert(true)
          setAlertMessage('Added Ambulance Hospital')
          setAlertSeverity('success')
          window.location.reload()
        },
        error: err => {
          
           setShowAlert(true)
        setAlertMessage('Invalid Username or password')
        setAlertSeverity('error')
        console.error('Error adding ambulance hospital:', err)
        }
      })
    } else {
      setFormErrors(errors)
    }

  }

  useEffect(() => {
    let timeoutId
    if (showAlert) {
      timeoutId = setTimeout(() => {
        setShowAlert(false)
      }, 30000) // 30000 milliseconds = 30 seconds
    }

    return () => {
      clearTimeout(timeoutId) // Clear the timeout if the component unmounts early
    }
  }, [showAlert])

  
const handleInputChange = (e) => {
  const { name, value } = e.target; 

 
  setFormLoginData((prevData) => ({
    ...prevData,
    [name]: value,
  }));

  
  setFormLoginErrors((prevErrors) => ({
    ...prevErrors,
    [name]: '', 
  }));
};

const handleChange = (e) => {
  const { name, value } = e.target; 

  
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));

  
  setFormErrors((prevErrors) => ({
    ...prevErrors,
    [name]: '', 
  }));
};
  return (
    <>
    {showAlert && (
      <Alert onClose={handleCloseAlert} severity={alertSeverity}>
        {alertMessage}
      </Alert>
    )}

    <Box
      className='content-center'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh' // Ensure the container takes up the full height of the viewport
      }}
    >
     

      
           {showRegister ? <>
            <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg
              width={35}
              height={29}
              version='1.1'
              viewBox='0 0 30 23'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
            >
              <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
                  <g id='logo' transform='translate(95.000000, 50.000000)'>
                    <path
                      id='Combined-Shape'
                      fill={theme.palette.primary.main}
                      d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
                      transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
                      transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
                    />
                    <path
                      id='Rectangle'
                      fillOpacity='0.15'
                      fill={theme.palette.common.white}
                      d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
                    />
                    <path
                      id='Rectangle'
                      fillOpacity='0.35'
                      fill={theme.palette.common.white}
                      transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
                      d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
                    />
                  </g>
                </g>
              </g>
            </svg>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              GHNS
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome to GHNS! 👋🏻
            </Typography>
            <Typography variant='body2'>Expand your hospital's reach and visibility, register today.</Typography>
          </Box>      
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {Object.keys(formData)
                    .filter(field => field !== 'ambulance_hospital_id')
                    .map(field => (
                      <Grid item xs={6} sm={field === 'email' ? 6 : 6} key={field}>
                        {/* Conditional rendering for boolean fields */}
                        {['created_at', 'created_by', 'updated_at', 'updated_by', 'hospitalId', 'User_Id'].includes(
                          field
                        ) ? (
                          <TextField
                            name={field}
                            label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                            value={formData[field]}
                            fullWidth
                            error={!!formErrors[field]}
                            helperText={formErrors[field]}
                            disabled
                          ></TextField>
                        ) : (
                          <TextField
                            name={field}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            type={
                              field === 'email'
                                ? 'email'
                                : field === 'mobileNo' || field === 'alternateMobileNo'
                                ? 'tel'
                                : 'text'
                            }
                            value={formData[field]}
                            onChange={handleChange}
                            fullWidth
                            error={!!formErrors[field]}
                            helperText={formErrors[field]}
                          />
                        )}
                      </Grid>
                    ))}
                  <Button fullWidth size='large' variant='contained' type='submit' sx={{ marginBottom: 7 }}>
                    Register
            </Button>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-start' }}> {/* Align to the left */}
            <Typography variant="body2" sx={{ color: 'primary.main', cursor: 'pointer' }} onClick={handleToggleForm}>  {/* Make it look like a link */}
            {showRegister ? `Go to Login` : `Don't have an account? Sign Up`}
            </Typography>
          </Box>
                </Grid>
              </form>
              </CardContent>
      </Card>
          </>
          : <> 
          <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg
              width={35}
              height={29}
              version='1.1'
              viewBox='0 0 30 23'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
            >
              <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
                  <g id='logo' transform='translate(95.000000, 50.000000)'>
                    <path
                      id='Combined-Shape'
                      fill={theme.palette.primary.main}
                      d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
                      transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
                      transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
                    />
                    <path
                      id='Rectangle'
                      fillOpacity='0.15'
                      fill={theme.palette.common.white}
                      d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
                    />
                    <path
                      id='Rectangle'
                      fillOpacity='0.35'
                      fill={theme.palette.common.white}
                      transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
                      d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
                    />
                  </g>
                </g>
              </g>
            </svg>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              GHNS
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome to GHNS! 👋🏻
            </Typography>
            <Typography variant='body2'>Your gateway to enhanced patient engagement.</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleLoginSubmit}>
            <TextField
              autoFocus
              fullWidth
              name='username'
              label='Username'
              value={formLoginData.username}
              onChange={handleInputChange}
              sx={{ marginBottom: 10 }}
              error={!!formLoginErrors['username']}
              helperText={formLoginErrors['username']}
            />

            <TextField
              fullWidth
              label='Password'
              type={showPassword ? 'text' : 'password'}
              name='password'
              value={formLoginData.password}
              onChange={handleInputChange}
              sx={{ marginBottom: 10 }}
              error={!!formLoginErrors['password']}
              helperText={formLoginErrors['password']}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button fullWidth size='large' variant='contained' type='submit' sx={{ marginBottom: 7 }}>
              Login
            </Button>
            {formErrors['general'] && <p style={{ color: 'red' }}>{formErrors['general']}</p>}
          </form>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-start' }}> {/* Align to the left */}
            <Typography variant="body2" sx={{ color: 'primary.main', cursor: 'pointer' }} onClick={handleToggleForm}>  {/* Make it look like a link */}
            {showRegister ? `Go to Login` : `Don't have an account? Sign Up`}
            </Typography>
          </Box>
          </CardContent>
      </Card>
          </>}
          
        
      
    </Box>
    </>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default withAuth(LoginPage, false)
