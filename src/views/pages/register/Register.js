import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
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
    console.log(name, value)
    setUser({ ...user, [name]: value })
  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    const resutl = await axios
      .post('http://13.212.153.21:3000/register', user)
      .then((res) => {
        console.log(res)
      })
      .catch((res) => {
        console.log(res)
      })
    history.push('/login')
    console.log(resutl)
    console.log(user)
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      {/* <div className="container bg-white p-4"> */}
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="card mb-4 mx-4">
              <div class="card-body p-4">
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
                    <CButton color="success" type="submit">
                      Create Account
                    </CButton>
                  </div>
                </form>

                {/* <div className="row justify-content-md-center">
      <CRow className='justify-content-center'>
          <CCol sm='auto' md='auto'> 
          <CCardGroup>
              <CCard>
                <CCardBody className='p-4'>
                <CForm action='' onSubmit={handlesubmit}>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput 
                    placeholder="Full Name" 
                    name='fullName'
                    onChange={handleChange}
                    autoComplete="fullname"
                    value={user.fullName}
                     required />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput 
                      placeholder="Email" 
                      type='email' 
                      name='username'
                      value={user.username}
                      onChange={handleChange}
                      autoComplete="email" 
                      required
                     />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText><CIcon icon={cilLockLocked} /></CInputGroupText>
                    <CFormInput
                     placeholder="password"
                     type='password' 
                     name='password'
                     value={user.password}
                     onChange={handleChange}
                     autoComplete='password' 
                     required />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type='text'
                      name='designation'
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
                      name='screenName'
                      value={user.screenName}
                      onChange={handleChange}
                        required
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" type='submit'>Create Account</CButton>
                  </div>
                </CForm>
                </CCardBody>
              </CCard> 
              </CCardGroup>
             </CCol>
            </CRow>
            </div>  */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
