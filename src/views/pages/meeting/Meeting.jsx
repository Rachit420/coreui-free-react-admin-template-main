import React, { useState, useEffect } from 'react'
import axios from 'axios'
import _ from 'lodash'
import './meeting.css'

import {
  CCard,
  CCardBody,
  CTableDataCell,
  CTable,
  CTableBody,
  CCol,
  CTableHeaderCell,
  CTableHead,
  CTableRow,
} from '@coreui/react'

export default function Transaction() {
  const [meeting, setMeeting] = useState([])
  const [user, setUser] = useState([])
  const [refObj, setRefObj] = useState([])

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    const result1 = await axios.get('http://13.212.153.21:3000/meetings')
    // const result4 = await axios.get('http://13.212.153.21:3000/user')
    const result2 = await axios.get('http://13.212.153.21:3000/users')
    const result3 = await axios.get('http://13.212.153.21:3000/refobjectives ')
    console.log(result1.data)
    console.log(result2)
    console.log(result3.data)
    // console.log(result4)
    // document.getElementById('checkbox').uncheck
    setMeeting(result1.data)
    setUser(result2.data)
    setRefObj(result3.data)
  }
  user.map((a) => (
    console.log(a.username)
  ))
  function hostName(param) {
    for(var i=0 ; i< user.length ; i++){
      if(user[i].username == param) return user[i].fullName
    }
  }  

  const DateFormatter = (date) => {
    if (!date) {
      return 'no data'
    }
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    let day = date.substring(8, 10)
    let year = date.substring(0, 4)
    const d = new Date(date.substring(0, 10))
    let name = month[d.getMonth()].substring(0, 3)
    return day + ' ' + ', ' + year
  }

  return (
    <div className="table">
      <CTable align="middle" className="mb-0 border" responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="col-1 text-center" scope="col">
              #
            </CTableHeaderCell>
            <CTableHeaderCell className="text-center">Name</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Meeting Id</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Platform</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Host</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Ref Objective</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Date</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {meeting.map((user, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
              <CTableDataCell>{user.title}</CTableDataCell>
              <CTableDataCell className="text-center">{user.meeting_id}</CTableDataCell>
              <CTableDataCell className="text-center">{user.meeting_platform}</CTableDataCell>
              <CTableDataCell className="text-center">{hostName(user.userId)}</CTableDataCell>

              <CTableDataCell className="text-center"></CTableDataCell>

              <CTableDataCell className="text-center">
                {DateFormatter(user.start_time)}
              </CTableDataCell>
              <CTableDataCell className="text-end">
                <div className='container'>
                  <button>view</button>
                  <button>edit</button>
                </div>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  )
}
