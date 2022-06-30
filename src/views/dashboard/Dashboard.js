import React, { useState } from 'react'
import './dashboard.css'
import { CButton, CCard, CCardBody, CRow, CCol, CContainer } from '@coreui/react'


const Dashboard = () => {
const [platform, setplatform] = useState('');

  const handleClick = (event, name) => {
    console.log(name)
    setplatform(name)
    console.log(platform)
    document.getElementById('modal').style.display = 'flex'
  }

  function handleClose(){
    document.getElementById('modal').style.display = 'none'
  }

  return (
    <div className='dashboard'>
      <CRow>
        <h1>Connect to</h1>
      </CRow>
    <div className='modal' id='modal'>
      <div className='modal-content'>
        <p>Login to Your {platform} Account</p>
        <button className='close' id='close' onClick={handleClose}>&times;</button>
        <div className='mt-4 pt-2 px-4' id='form'>
          <form>
          <input placeholder='username' type='text' className='mb-2' />
          <br />
          <input placeholder='password' type='passowrd' className='mb-2' />
          <br />
          <button className='btn btn-primary mt-2' type='btn' >Login</button>
          </form>
        </div>
      </div>
    </div>
    <div>
      <div className='d-flex justify-content-between'>
          <div  className='meetingButton'  id='zoom' value='Zoom' name='Zoom' onClick={event => handleClick(event,'Zoom')} style={{ background:'blue' }} >
            ZOOM
          </div>
          <div className='mx-2 meetingButton'id='microsoftTeams' name='Microsoft Teams' onClick={event => handleClick(event,'Microsoft Teams')} style={{ background:'orange' }}  >
           Microsoft Teams
          </div>
          <div className='mx-2 meetingButton' id='googleMeet' name='Google Meets' onClick={event => handleClick(event,'Google Meets')} style={{ background:'#03adfc' }} >
           Google Meets
          </div>
          <div  className='meetingButton' id='none' name='None' onClick={event => handleClick(event,'None')} style={{ background:'red' }}></div>
      </div>
      <CCard className="mb-4 mt-4">
        <CCardBody style={{ height: '50vh' }}>
          <p>No meeting recording available</p>
        </CCardBody>
      </CCard>
    </div>
    </div>
  )
}

export default Dashboard
