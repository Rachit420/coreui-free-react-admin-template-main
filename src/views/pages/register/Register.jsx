import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './register.css'
import { CButton, CFormInput, CInputGroup, CInputGroupText } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Register = () => {
  const history = useHistory()
  const [user, setUser] = useState({
    username: '',
    fullName: '',
    password: '',
    screenName: '',
    designation: '',
    status: 'Active',
  })

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setUser({ ...user, [name]: value })
  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    const result = await axios
      .post('http://13.212.153.21:3000/register', user)
      .then((res) => {
        console.log(res)
        history.push('/login')
      })
      .catch((res) => {
        console.log(res)
      })
    // console.log(result)
    console.log(user)
  }

  return (
    <div className="form-container">
      <div className="bg-white m-2 p-4 form-field">
        <form action="" onSubmit={handlesubmit}>
          <h1>Register</h1>
          <p className="text-medium-emphasis">Create your account</p>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilUser} />
            </CInputGroupText>
            <CFormInput
              placeholder="Full Name"
              name="fullName"
              onChange={handleChange}
              autoComplete="fullname"
              value={user.fullName}
              required
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>@</CInputGroupText>
            <CFormInput
              placeholder="Email"
              type="email"
              name="username"
              value={user.username}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilLockLocked} />
            </CInputGroupText>
            <CFormInput
              placeholder="password"
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              autoComplete="password"
              required
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilLockLocked} />
            </CInputGroupText>
            <CFormInput
              type="text"
              name="designation"
              placeholder="Designation"
              autoComplete="new-password"
              required
              value={user.designation}
              onChange={handleChange}
            />
          </CInputGroup>
          <CInputGroup className="mb-4">
            <CInputGroupText>
              <CIcon icon={cilLockLocked} />
            </CInputGroupText>
            <CFormInput
              type="text"
              placeholder="Screen Name"
              autoComplete="screen name"
              name="screenName"
              value={user.screenName}
              onChange={handleChange}
              required
            />
          </CInputGroup>
          <div className="d-grid">
            <CButton color="success" type="submit" onClick={handlesubmit}>
              Create Account
            </CButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
