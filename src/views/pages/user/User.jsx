import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import './user.css'
import { CButton, CFormInput, CInputGroup, CInputGroupText } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Register = () => {
  const history = useHistory()
  const userData = JSON.parse(sessionStorage.getItem('user-info'))
  // console.log(userData)
  // console.log(userData.username)
  const [user, setUser] = useState(userData)
  // setUser(userData)
  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setUser({ ...user, [name]: value })
  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    const result = await axios
      .post('http://13.212.153.21:3000/saveuserdetail', user)
      .then((res) => {
        console.log(res)
        history.push('/dashboard')
      })
      .catch((res) => {
        console.log(res)
      })
    // console.log(result)
    console.log(user)
  }

  return (
    <div className="form">
      <div className="form-container">
        <div className="bg-white  p-4 form-field">
          <form action="" onSubmit={handlesubmit}>
            <div className='container w-50 d-flex justify-content-center bg-light'><h1>User Profile</h1></div>
            <div className="container mt-3">
              <div className="row">
                <div className="formField">
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
                      placeholder="Username"
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
                      placeholder="Zoom Id"
                      type="text"
                      name="zoomId"
                      value={user.screenNameZoom}
                      onChange={handleChange}
                      autoComplete="zoomId"
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Teams Id"
                      type="text"
                      name="teamsId"
                      value={user.screenNameTeams}
                      onChange={handleChange}
                      autoComplete="teamsId"
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Google Id"
                      type="text"
                      name="googleId"
                      value={user.screenNameGoogle}
                      onChange={handleChange}
                      autoComplete="googleId"
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
                </div>
                <div className="formField">
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      type="email"
                      autoComplete="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Alternate Email"
                      type="email"
                      name="alternateEmail"
                      value={user.alternateEmail}
                      onChange={handleChange}
                      autoComplete="alternateEmail"
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Phone Number"
                      type="text"
                      name="phoneNo"
                      value={user.phoneNo}
                      onChange={handleChange}
                      autoComplete="PhoneNumber"
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      className='bgText'
                      placeholder="Address 1"
                      type="text"
                      name="address1"
                      value={user.address1}
                      onChange={handleChange}
                      autoComplete="address1"
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      className='bgText'
                      placeholder="Address 2"
                      type="text"
                      name="address2"
                      value={user.address2}
                      onChange={handleChange}
                      autoComplete="address2"
                      height='30px'
                      required
                    />
                  </CInputGroup>
                </div>
              </div>
            </div>
            <div className="container d-flex justify-content-center">
              <CButton color="success" type="submit" onClick={handlesubmit}>
                Save
              </CButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
