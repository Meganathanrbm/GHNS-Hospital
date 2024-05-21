import { useState } from 'react'
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const CardNavigation = ({ tabs }) => {
  const [value, setValue] = useState(tabs[0]?.value || '')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='card navigation example'>
          {tabs.map(tab => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </TabList>
        <CardContent>
          {tabs.map(tab => (
            <TabPanel key={tab.value} value={tab.value} sx={{ p: 0 }}>
              <Typography variant='h6' sx={{ marginBottom: 2 }}>
                {tab.header}
              </Typography>
              <Typography variant='body2' sx={{ marginBottom: 4 }}>
                {tab.content}
              </Typography>
              <Button variant='contained'>{tab.buttonText}</Button>
            </TabPanel>
          ))}
        </CardContent>
      </TabContext>
    </Card>
  )
}

export default CardNavigation
