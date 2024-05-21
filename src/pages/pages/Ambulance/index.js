import React, { useState, useEffect } from 'react'
import withAuth from 'src/@core/hooks/withAuth'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  Card,
  CardContent,
  Modal,
  Backdrop,
  Fade,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import vehicleApi from 'src/@core/apis/vehicle.api'


const sampleAmbulanceOwners = [
  {
    ambulance_owner_id: 3,
    name: 'Abirami',
    mobileNo: '9940696659',
    email: 'abi@gmail.com',
    alternateMobileNo: '9873456765',
    panNo: 'PAN65432323',
    adhaarNo: '76543234787',
    isTermsPrivacyAccepted: true,
    noOfVehicles: 1,
    isVerified: true,
    isDeleted: false,
    createdAt: '2024-05-08T07:15:16.000Z',
    createdBy: 1,
    updatedAt: '2024-05-08T07:15:16.000Z',
    updatedBy: 1,
    isActive: true
  },
  {
    ambulance_owner_id: 4,
    name: 'Rajesh',
    mobileNo: '9876543210',
    email: 'rajesh@example.com',
    alternateMobileNo: '9012345678',
    panNo: 'PAN12345678',
    adhaarNo: '123456789012',
    isTermsPrivacyAccepted: true,
    noOfVehicles: 2,
    isVerified: false,
    isDeleted: false,
    createdAt: '2024-05-09T10:30:25.000Z',
    createdBy: 1,
    updatedAt: '2024-05-10T14:15:52.000Z',
    updatedBy: 2,
    isActive: true
  }
]
 
const AmbulanceOwnerPage = () => {
  const [ambulanceOwners, setAmbulanceOwners] = useState(sampleAmbulanceOwners)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingOwner, setEditingOwner] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    mobileNo: '',
    email: '',
    alternateMobileNo: '',
    panNo: '',
    adhaarNo: '',
    isTermsPrivacyAccepted: '1',
    noOfVehicles: '',
    isVerified: '1',
    isDeleted: '0',
    isActive: '1'
  })
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    // Fetch ambulance owner data here
      vehicleApi.AmbulanceOwnerList({
        success:(res)=>{
          console.log(res.data);
          const sortedAmbulanceOwners = res.data.data.sort((a, b) => a.ambulance_owner_id - b.ambulance_owner_id);

    setVehicles(sortedAmbulanceOwners);
          setAmbulanceOwners(sortedAmbulanceOwners)
        },
        error:(err)=>{
          console.log(err);
          alert("Error Occurred in fetching the Ambulance Owners")
        }
      })
  }, [])

  const handleOpenModal = (owner = null) => {
    setEditingOwner(owner)
    setFormData(
      owner || {
        name: '',
        mobileNo: '',
        email: '',
        alternateMobileNo: '',
        panNo: '',
        adhaarNo: '',
        isTermsPrivacyAccepted: '1',
        noOfVehicles: '',
        isVerified: '1',
        isDeleted: '0',
        isActive: '1'
      }
    )
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setEditingOwner(null)
  }

  const handleBooleanChange = (field, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: value === '1' // Convert string value to boolean
    }))
  }

  const handleEditClick = patient => {
    setFormErrors({})
    const { createdAt, createdBy, updatedAt, updatedBy, ...restOfPatientData } = patient

    console.log(restOfPatientData)
    setEditingOwner(restOfPatientData)

    setFormData(restOfPatientData)
    setModalOpen(true) // Open the modal in edit mode
  }
  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setFormErrors(prevErrors => ({ ...prevErrors, [name]: '' }))
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const errors = validateForm(formData)
    if (Object.keys(errors).length === 0) {
      console.log(formData);
        vehicleApi.AddAmbulanceOwner({
          payload:formData,
          success:(res)=>{
            console.log(res.data);
            alert("Added Ambulance Owner")
            window.location.reload()
          },
          error:(err)=>{
            console.error('Error adding ambulance owner:', err)
            alert("Error adding ambulance owner")
          }
        })
      handleCloseModal()
    } else {
      setFormErrors(errors)
    }
  }



  const handleUpdateSubmit = async event => {
    event.preventDefault()
    const errors = validateForm(formData)
   
    if (Object.keys(errors).length === 0) {
      console.log(formData);
        vehicleApi.UpdateAmbulanceOwner({
          payload:formData,
          success:(res)=>{
            console.log(res.data);
            alert("Updated Successfully")
            window.location.reload();
          },error:(err)=>{
            console.log(err)
            alert("Error Occurred in updating data")
          }
        })
      handleCloseModal()
    } else {
      setFormErrors(errors)
    }
  }

  // Function to validate the form data
  const validateForm = patientData => {
    const errors = {}

    // Check for empty fields
    if (!patientData.name) errors.name = 'Name is required'

    if (!patientData.email) errors.email = 'Email is required'

    if (!patientData.panNo) errors.panNo = 'Pan Number is required'

    if (!patientData.adhaarNo) errors.adhaarNo = 'Aadhar Number is required'

    if (!patientData.noOfVehicles) errors.noOfVehicles = 'Number of Vehicles is required'

    // Validate email format if present
    if (patientData.email && !validateEmail(patientData.email)) {
      errors.email = 'Invalid email format'
    }
    if (!patientData.mobileNo) errors.mobileNo = 'Mobile No is required'
    else if (!/^\d{10}$/.test(patientData.mobileNo)) errors.mobileNo = 'Invalid mobile number (10 digits only)'

    if (patientData.alternateMobileNo && !/^\d{10}$/.test(patientData.alternateMobileNo)) {
      errors.alternateMobileNo = 'Invalid mobile number (10 digits only)'
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

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant='h3'>Ambulance Owners</Typography>
        <Button variant='contained' onClick={() => handleOpenModal()}>
          Add Ambulance Owner
        </Button>
      </Box>

      {/* Ambulance Owner List Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>Owner ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Mobile No</TableCell> <TableCell>Alternate Mobile No</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Pan Card</TableCell>
              <TableCell>Aadhar Number</TableCell>
              <TableCell>No of Vehicles</TableCell>
              <TableCell>is Active</TableCell>
              <TableCell>is Terms Privacy Accepted</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ambulanceOwners.map(Owner => (
              <React.Fragment key={Owner.ambulance_owner_id}>
                {/* Main Row for Ambulance Owner Details */}
                <TableRow >
                <TableCell>{Owner.ambulance_owner_id}</TableCell>
                  <TableCell>{Owner.name}</TableCell>
                  <TableCell>{Owner.mobileNo}</TableCell>
                  <TableCell>{Owner.alternateMobileNo}</TableCell>
                  <TableCell>{Owner.email}</TableCell>
                  <TableCell>{Owner.panNo}</TableCell>
                  <TableCell>{Owner.adhaarNo}</TableCell>
                  <TableCell>{Owner.noOfVehicles}</TableCell>
                  <TableCell>{Owner.isActive ? 'Active' : 'Not Active'}</TableCell>
                  <TableCell>{Owner.isTermsPrivacyAccepted ? 'Active' : 'Not Active'}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(Owner)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for adding/editing ambulance owner details */}
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
                {editingOwner ? 'Edit Ambulance Owner' : 'Add Ambulance Owner'}
              </Typography>
              <form onSubmit={editingOwner ? handleUpdateSubmit : handleSubmit}>
                <Grid container spacing={3}>
                  {Object.keys(formData)
                    .filter(field => field !== 'ambulance_owner_id')
                    .map(field => (
                      <Grid item xs={6} sm={field === 'email' ? 6 : 6} key={field}>
                        {/* Conditional rendering for boolean fields */}
                        {['isTermsPrivacyAccepted', 'isActive', 'isVerified', 'isDeleted'].includes(field) ? (
                          <TextField
                            name={field}
                            select
                            label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                            value={formData[field] ? '1' : '0'}
                            onChange={e => handleBooleanChange(field, e.target.value)}
                            fullWidth
                            error={!!formErrors[field]}
                            helperText={formErrors[field]}
                          >
                            <MenuItem value='1'>Yes</MenuItem>
                            <MenuItem value='0'>No</MenuItem>
                          </TextField>
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
                      {editingOwner ? 'Save Changes' : 'Add Owner'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Fade>
      </Modal>
    </>
  )
}

export default withAuth(AmbulanceOwnerPage)
