import Map from 'mapmyindia-react/dist/Map'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
// import 'mapmyindia-react/dist/index.css'
import React, { useEffect, useState } from 'react'
import vehicleApi from 'src/@core/apis/vehicle.api'
import withAuth from 'src/@core/hooks/withAuth'

const Home = () => {
  const [map, setMap] = useState(null)
  const [vehicleList, setVehicleList] = useState([
    // {
    //   vehicle_id: 2,
    //   ambulance_owner_id: 3,
    //   driver_id: 9012,
    //   vehicle_type: 'Ambulance',
    //   vehicle_no: 'ABC123',
    //   vehicle_rc_no: 'RC123456',
    //   vehicle_rc_url: null,
    //   vehicle_fc_url: null,
    //   last_fc_date: null,
    //   front_image_url: null,
    //   back_image_url: null,
    //   side1_image_url: null,
    //   side2_image_url: null,
    //   is_verified: '1',
    //   is_active: '1',
    //   is_deleted: '1',
    //   ownership_type: 'Owned',
    //   driver_cabin_image: null,
    //   image: null,
    //   created_by: 1,
    //   created_at: '2024-05-09T00:09:03.000Z',
    //   updated_at: '2024-05-09T00:09:59.000Z',
    //   updated_by: 1
    // }
  ])
  const mapCenter = [17.385, 78.4867]
  useEffect(() => {
    // vehicleApi.VehicleList({
    //   success: res => {
    //     console.log(res.data)
    //   },
    //   error: err => {
    //     console.log(err)
    //     alert('Error Occurred in fetching the Vehicle Details')
    //   }
    // })
  }, [])
  return (
    <section className='flex md:flex-row flex-col'>
      {/* map */}
      <div className='map flex-1'></div>
      {/* ambulance list */}
      <div className='flex-1'>
        <h2 className='text-2xl mb-4'>Ambulance List</h2>
        {/*Vehicle List Table */}
    
      </div>
    </section>
  )
}

export default withAuth(Home)
