import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { currentUserState } from 'src/@core/store/details.store'
import withAuth from 'src/@core/hooks/withAuth'
import {
  Box,
  IconButton,
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Modal,
  Backdrop,
  Fade,
  Alert
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import HospitalApi from 'src/@core/apis/hospital.api'

const samplehospitals = [
  {
    hospital_id: 5,
    User_Id: 7,
    hospital_name: 'Hospital XYZ',
    address: '123 Main St',
    city: 'chennai',
    state: 'TN',
    zip_code: '12345',
    mobile_number: '1234567890',
    email: 'hospitalxyz@example.com',
    hospital_license_number: 'LIC1234567890',
    GST: 'GST12345',
    ESI: 'ESI12345',
    pan_number: 'PAN12345',
    created_at: '2024-05-16T05:05:07.000Z',
    created_by: 1,
    updated_at: '2024-05-16T05:05:07.000Z',
    updated_by: 1
  }
]

const Hospital = () => {
  const [Hospital, setHospital] = useState(samplehospitals[0])
  const [modalOpen, setModalOpen] = useState(false)
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false)
  const [editingHospital, setEditingHospital] = useState(null)
  const [showAlert, setShowAlert] = useState(false)
  const currentUser = useRecoilValue(currentUserState)
  const [alertSeverity, setAlertSeverity] = useState('success')
  const [alertMessage, setAlertMessage] = useState('')
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
  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  const [UpdateFormErrors, setUpdateFormErrors] = useState({})

  const handleUpdateCloseModal = () => {
    setModalUpdateOpen(false)
    setEditingHospital(null)
  }

  const handleChange = (field, value) => {
    setHospital({ ...Hospital, [field]: value })
    setUpdateFormErrors({ ...UpdateFormErrors, [field]: null })
  }

  const handleUpdateSubmit = async event => {
    event.preventDefault()
    const {
      created_at,
      created_by,
      updated_at,
      updated_by,
      userName,
      User_Id,
      userType,
      password,
      ...restOfHospitalData
    } = Hospital

    const formattedHospitalData = {}
    for (const key in restOfHospitalData) {
      const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
      formattedHospitalData[camelCaseKey] = restOfHospitalData[key]
    }

    const errors = validateUpdateForm(formattedHospitalData)
    console.log(Hospital)
    console.log(formattedHospitalData)
    console.log(errors)
    if (Object.keys(errors).length === 0) {
      HospitalApi.UpdateHospital({
        payload: formattedHospitalData,
        success: res => {
          console.log(res.data)
          setShowAlert(true)
          setAlertMessage('Updated Successfully')
          setAlertSeverity('success')
          window.location.reload()
        },
        error: err => {
          setShowAlert(true)
          setAlertMessage('Error Occurred in updating data')
          setAlertSeverity('error')
          console.log(err)
        }
      })
    } else {
      setUpdateFormErrors(errors)
    }
  }

  const validateUpdateForm = hospitalData => {
    const errors = {}

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
      'ESI'
    ]) {
      if (!hospitalData[field]) {
        const snakeCaseField = field.replace(/([A-Z])/g, letter => `_${letter.toLowerCase()}`)
        errors[snakeCaseField] = `${field.replace(/([A-Z])/g, ' $1').trim()} is required`
      }
    }
    if (!hospitalData.zipCode) {
      errors.zip_code = 'Zip Code is required'
    }
    if (!/^\d{6}(-\d{4})?$/.test(hospitalData.zipCode)) {
      errors.zip_code = 'Invalid zip code format (should be 6 digits only)'
    }
    return errors
  }
  // Function to validate the form data

  // Helper function for email validation (basic)
  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
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

  const hospital_id=currentUser.hospital_id
  useEffect(() => {
    
    // Fetch ambulance hospital data here
    HospitalApi.HospitalList({
      hospital_id,
      success: res => {
        console.log(res.data)
        const sortedHospitals = res.data.data.sort((a, b) => a.hospital_id - b.hospital_id)
        setHospital(sortedHospitals[0])
      },
      error: err => {
        setShowAlert(true)
        setAlertMessage('Error Occurred in fetching the hospital details')
        setAlertSeverity('error')
        console.log(err)
      }
    })
  }, [hospital_id])

  return (
    <>
    {showAlert && (
      <Alert onClose={handleCloseAlert} severity={alertSeverity}>
        {alertMessage}
      </Alert>
    )}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant='h3'>Hospital Details</Typography>
      </Box>

      {/* Ambulance hospital List Table */}
      <Box
        component='form'
        onSubmit={handleUpdateSubmit}
        sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}
      >
        {Object.entries(editingHospital ? editingHospital : Hospital).map(([field, value]) =>
          ['created_at', 'created_by', 'updated_at', 'updated_by', 'hospital_id'].includes(field) ? (
            <TextField
              key={field}
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
              value={value || ''}
              fullWidth
              error={!!UpdateFormErrors[field]}
              helperText={UpdateFormErrors[field]}
              disabled // Always disabled for these fields
            />
          ) : (
            <TextField
              key={field}
              label={field.replace(/_/g, ' ')}
              id={field}
              value={value || ''}
              onChange={e => handleChange(field, e.target.value)}
              error={!!UpdateFormErrors[field]}
              helperText={UpdateFormErrors[field]}
              disabled={field === 'User_Id'}
            />
          )
        )}

        <Grid item xs={12}>
          <Button type='submit' variant='contained'>
            Update Hospital
          </Button>
        </Grid>
      </Box>

      {/* Modal for adding/editing ambulance hospital details */}

      <Modal
        open={modalUpdateOpen}
        onClose={handleUpdateCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={modalUpdateOpen}>
          <Card
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '800px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <IconButton
              aria-label='close'
              onClick={handleUpdateCloseModal}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8
              }}
            >
              <CloseIcon />
            </IconButton>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                {'Update hospital'}
              </Typography>
              <Box
                component='form'
                onSubmit={handleUpdateSubmit}
                sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}
              >
                {Object.entries(editingHospital ? editingHospital : Hospital).map(([field, value]) =>
                  ['created_at', 'created_by', 'updated_at', 'updated_by', 'hospital_id'].includes(field) ? (
                    <TextField
                      key={field}
                      name={field}
                      label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                      value={value || ''}
                      fullWidth
                      error={!!UpdateFormErrors[field]}
                      helperText={UpdateFormErrors[field]}
                      disabled // Always disabled for these fields
                    />
                  ) : (
                    <TextField
                      key={field}
                      label={field.replace(/_/g, ' ')}
                      id={field}
                      value={value || ''}
                      onChange={e => handleChange(field, e.target.value)}
                      error={!!UpdateFormErrors[field]}
                      helperText={UpdateFormErrors[field]}
                      disabled={field === 'User_Id'}
                    />
                  )
                )}

                <Grid item xs={12}>
                  <Button type='submit' variant='contained'>
                    Update Hospital
                  </Button>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Modal>
    </>
  )
}

export default withAuth(Hospital)
