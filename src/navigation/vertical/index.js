// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Groups3OutlinedIcon from '@mui/icons-material/Groups3Outlined';

import { Ambulance, Hospital } from 'mdi-material-ui'
import { DriveEtaRounded } from '@mui/icons-material'

const navigation = () => {
  return [
  
    {
      title:'DashBoard',
      icon:HomeOutline,
      path:'/'
    },
    // {
    //   sectionTitle: 'Pages'
    // },
    {
      title:'Ambulance',
      icon:Ambulance,
      path:'/pages/Ambulance'
    },
    {
      title: 'Hospital',
      icon: Hospital,
      path: '/pages/Hospital'
    }, 
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
  ]
}

export default navigation
