import React, { useContext, useState } from 'react'
import '../signup/signup.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { productContext } from '../contextAPI/Context'

const Login = () => {
    const navigate = useNavigate()
    const { setToken, API_URL } = useContext(productContext)
    const [email, setMail] = useState('')
    const [password, setPassword] = useState('')

    const changeMailHandler = (e) => {
        setMail(e.target.value)
    }
    const changePasswordHandler = (e) => {
        setPassword(e.target.value)
    }

    const submitHandler = () => {
        axios.post(`${API_URL}/login`, { email, password })
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    localStorage.setItem('token', res.data.token);
                    console.log(res.data);
                    setToken(res.data.token)
                    navigate('/home')
                } else {
                    console.log('Request failed with status:', res.status);
                }
            })
            .catch(err => {
                console.error('Login failed:', err.message)
                alert('Login failed. Please check your credentials.')
            })
    }


    return (
        <div className='signup'>
            <input type="text" placeholder='email' onChange={(e) => { changeMailHandler(e) }} />
            <input type="password" placeholder='password' onChange={(e) => { changePasswordHandler(e) }} />
            <button onClick={() => { submitHandler() }}>Login</button>
        </div>
    )
}

export default Login