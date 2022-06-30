import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
import { useHistory } from 'react-router-dom'

function Login() {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  useEffect(() => {
    if (sessionStorage.getItem('user-info')) {
      history.push('/dashboard')
    }
  })
  async function login() {
    let item = { username, password }
    let result = await axios.post('http://13.212.153.21:3000/login', item)
    const userData = result.data
    // console.log(result)
    console.log(userData)
    if (result.data == 'Login Unsuccesful') {
      alert('invalid username or password')
      const usrName = document.getElementById('username')
      const pass = document.getElementById('password')
      usrName.value = ''
      pass.value = ''
    } else {
      sessionStorage.setItem('user-info', JSON.stringify(userData))
      history.push('/dashboard')
    }
    // console.log(localStorage.getItem('user-info'))
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CCardGroup>
          <CCard className="p-4">
            <CCardBody>
              <CForm action="" onSubmit={login}>
                <h1>Login</h1>
                <p className="text-medium-emphasis">Sign In to your account</p>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Username"
                    id="username"
                    onChange={(e) => setUserName(e.target.value)}
                    autoComplete="username"
                    required
                  />
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                </CInputGroup>
                <CRow>
                  <CCol xs={6}>
                    <CButton color="primary" className="px-4" onClick={login}>
                      Login
                    </CButton>
                  </CCol>
                  <CCol xs={6} className="text-right">
                    <Link to="/forgetUser">
                      <CButton color="link" className="px-0">
                        Forgot password?
                      </CButton>
                    </Link>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
          <CCard className="text-white bg-primary py-5">
            <CCardBody className="text-center">
              <div>
                <h2>Sign up</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
                <Link to="/register">
                  <CButton color="primary" className="mt-3" active tabIndex={-1}>
                    Register Now!
                  </CButton>
                </Link>
              </div>
            </CCardBody>
          </CCard>
        </CCardGroup>
      </CContainer>
    </div>
  )
}

export default Login
