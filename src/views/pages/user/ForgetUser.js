import React from 'react'
import { useState } from 'react'
import '../register/register.css'
import { CFormInput } from '@coreui/react'

function ForgetUser () {

    const[userName, setUserName] = useState('')

    function handleClick() {
        // if(userName == ''){
            
        // }
        alert("An email is sent")
    }

    return(
        <div className='form'>
            <div className='form-container w-75'>
            <div className="bg-white m-2 p-4 form-field">
                <form action='' onSubmit={handleClick}>
                    <h1>Forget Password</h1>
                    <p>Enter your username to recieve a password reset link</p>
                    <CFormInput 
                    placeholder='user name'
                    name='userName'
                    type='email'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    />
                    <small className='text-danger'>*If registered you will recieve an email</small>
                    <br />
                    <button className='btn btn-primary' type='submit'>Send</button>
                </form>
                </div>
            </div>
        </div>
    )
}

export default ForgetUser