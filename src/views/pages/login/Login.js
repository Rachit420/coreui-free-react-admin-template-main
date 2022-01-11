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
    if (localStorage.getItem('user-info')) {
      history.push('/add')
    }
  })
  async function login() {
    let item = {username, password};
    let result = await axios.post('http://13.212.153.21:3000/login',item);
    console.log(result);
    console.log(item);
   if(result.data == 'Login Succesful'){
     history.push('/dashboard');
   }
   else{
     alert("invalid username or password");
   }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CCardGroup>
          <CCard className="p-4">
            <CCardBody>
              <CForm>
                <h1>Login</h1>
                <p className="text-medium-emphasis">Sign In to your account</p>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Username"
                    onChange={(e) => setUserName(e.target.value)}
                    autoComplete="username"
                  />
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                </CInputGroup>
                <CRow>
                  <CCol xs={6}>
                    <CButton color="primary" className="px-4" onClick={login}>
                      Login
                    </CButton>
                  </CCol>
                  <CCol xs={6} className="text-right">
                    <CButton color="link" className="px-0">
                      Forgot password?
                    </CButton>
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