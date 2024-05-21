import React, { useState, useEffect } from 'react'
import withAuth from 'src/@core/hooks/withAuth'
import {
  Box,
  IconButton,
  Grid,
  TextField,
  Table,
  Paper,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  MenuItem,
  Button,
  Typography,
  Card,
  CardContent,
  Modal,
  Backdrop,
  Fade
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
  const [Hospital, setHospital] = useState(samplehospitals)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false)
  const [editingHospital, setEditingHospital] = useState(null)
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
  const [formErrors, setFormErrors] = useState({})
  const [UpdateFormErrors, setUpdateFormErrors] = useState({})
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default items per page

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };
  const handleOpenModal = (hospital = null) => {
    setEditingHospital(hospital)
    setFormData(
      hospital || {
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
      }
    )
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setEditingHospital(null)
  }

  const handleUpdateCloseModal = () => {
    setModalUpdateOpen(false)
    setEditingHospital(null)
  }

  const handleEditClick = hospital => {
    console.log(hospital);
    setEditingHospital(hospital)
    setModalUpdateOpen(true) 
  }
  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setFormErrors(prevErrors => ({ ...prevErrors, [name]: '' }))
  }

  const handleChange = (field, value) => {
    setEditingHospital({ ...editingHospital, [field]: value })
    setUpdateFormErrors({ ...UpdateFormErrors, [field]: null })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const errors = validateForm(formData)
    if (Object.keys(errors).length === 0) {
      console.log(formData)
      HospitalApi.AddHospital({
        payload: formData,
        success: res => {
          console.log(res.data)
          alert('Added Ambulance Hospital')
          window.location.reload()
        },
        error: err => {
          console.error('Error adding ambulance hospital:', err)
          alert('Error adding ambulance hospital')
        }
      })
      handleCloseModal()
    } else {
      setFormErrors(errors)
    }
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
    } = editingHospital

    const formattedHospitalData = {}
    for (const key in restOfHospitalData) {
      const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
      formattedHospitalData[camelCaseKey] = restOfHospitalData[key]
    }

    const errors = validateUpdateForm(formattedHospitalData)
    console.log(editingHospital)
    console.log(formattedHospitalData)
    console.log(errors)
    if (Object.keys(errors).length === 0) {
      HospitalApi.UpdateHospital({
        payload: formattedHospitalData,
        success: res => {
          console.log(res.data)
          alert('Updated Successfully')
          window.location.reload()
        },
        error: err => {
          console.log(err)
          alert('Error Occurred in updating data')
        }
      })
     handleUpdateCloseModal();
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
    if (!editingHospital) {
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)) {
        errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      }
      if (!hospitalData.userName) {
        errors.userName = 'User Name is required'
      }
      if (!hospitalData.userType) {
        errors.userType = 'User Type is required'
      }
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

  useEffect(() => {
    // Fetch ambulance hospital data here
    HospitalApi.HospitalList({
      success: res => {
        console.log(res.data)
        const sortedHospitals = res.data.data.sort((a, b) => a.hospital_id - b.hospital_id)
        setHospital(sortedHospitals)
      },
      error: err => {
        console.log(err)
        alert('Error Occurred in fetching the Ambulance hospitals')
      }
    })
  }, [])

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant='h3'>Hospital Details</Typography>
        <Button variant='contained' onClick={() => handleOpenModal()}>
          Add Hospital
        </Button>
      </Box>

      <TableContainer component={Paper}>
        {' '}
        <Table>
          {' '}
          <TableHead>
            {' '}
            <TableRow>
              <TableCell>Hospital ID</TableCell>
              <TableCell>User ID</TableCell> <TableCell>Hospital Name</TableCell>
              <TableCell>Mobile No</TableCell> <TableCell>Email</TableCell>
              <TableCell>hospital License Number</TableCell> <TableCell>ESI</TableCell>
              <TableCell>Pan Number</TableCell> <TableCell>GST</TableCell>
              <TableCell>Address</TableCell> <TableCell>City</TableCell>
              <TableCell>State</TableCell> <TableCell>ZIP Code</TableCell>{' '}
            </TableRow>{' '}
          </TableHead>{' '}
          <TableBody>
            {' '}
            {Hospital.map(hospital => (
              <React.Fragment key={hospital.ambulance_hospital_id}>
                {/* Main Row for Ambulance hospital Details */}{' '}
                <TableRow>
                  <TableCell>{hospital.hospital_id}</TableCell> <TableCell>{hospital.User_Id}</TableCell>{' '}
                  <TableCell>{hospital.hospital_name}</TableCell> <TableCell>{hospital.mobile_number}</TableCell>{' '}
                  <TableCell>{hospital.email}</TableCell> <TableCell>{hospital.hospital_license_number}</TableCell>{' '}
                  <TableCell>{hospital.ESI}</TableCell>
                  <TableCell>{hospital.pan_number}</TableCell>
                  <TableCell>{hospital.GST}</TableCell> <TableCell>{hospital.address}</TableCell>
                  <TableCell>{hospital.city}</TableCell>
                  <TableCell>{hospital.state}</TableCell>
                  <TableCell>{hospital.zip_code}</TableCell>{' '}
                  <TableCell>
                    {' '}
                    <IconButton onClick={() => handleEditClick(hospital)}>
                     <EditIcon/>
                    {' '}
                    </IconButton>{' '}
                  </TableCell>{' '}
                </TableRow>{' '}
              </React.Fragment>
            ))}{' '}
          </TableBody>{' '}
        </Table>{' '}
      </TableContainer>
      {/* Ambulance hospital List Table */}
      {/* <Box component="form" onSubmit={handleUpdateSubmit} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
      {Object.entries(Hospital).map(([field, value]) => 
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
            onChange={(e) => handleChange(field, e.target.value)}
            error={!!UpdateFormErrors[field]}
            helperText={UpdateFormErrors[field]}
            disabled={field === 'User_Id'}
          />
        )
      )}

      <Grid item xs={12}>
        <Button type="submit" variant="contained">
          Update Hospital
        </Button>
      </Grid>
    </Box> */}

      {/* Modal for adding/editing ambulance hospital details */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={modalOpen}>
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
              onClick={handleCloseModal}
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
                {'Add hospital'}
              </Typography>
              <form onSubmit={editingHospital?handleUpdateSubmit:handleSubmit}>
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
                            onChange={handleInputChange}
                            fullWidth
                            error={!!formErrors[field]}
                            helperText={formErrors[field]}
                          />
                        )}
                      </Grid>
                    ))}
                  <Grid item xs={6} sm={6} alignSelf='flex-end'>
                    <Button variant='contained' type='submit'>
                      {editingHospital?'Save Changes':'Add hospital'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Fade>
      </Modal>


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
              <Box component="form" onSubmit={handleUpdateSubmit} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
      {Object.entries(editingHospital?editingHospital:Hospital).map(([field, value]) => 
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
            onChange={(e) => handleChange(field, e.target.value)}
            error={!!UpdateFormErrors[field]}
            helperText={UpdateFormErrors[field]}
            disabled={field === 'User_Id'}
          />
        )
      )}

      <Grid item xs={12}>
        <Button type="submit" variant="contained">
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
