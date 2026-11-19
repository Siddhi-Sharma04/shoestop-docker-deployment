import React, { useContext, useState } from 'react'
import './signup.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { productContext } from '../contextAPI/Context'

const Signup = () => {

    const navigate = useNavigate()
    const { API_URL } = useContext(productContext)

    const [name, setName] = useState('')
    const [email, setMail] = useState('')
    const [password, setPassword] = useState('')

    const changeNameHandler = (e) => {
        setName(e.target.value)
    }
    const changeMailHandler = (e) => {
        setMail(e.target.value)
    }
    const changePasswordHandler = (e) => {
        setPassword(e.target.value)
    }

    const submitHandler = () => {
        axios.post(`${API_URL}/signup`, { name, email, password })
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    localStorage.setItem('token', JSON.stringify(res.data.token));
                    console.log(res.data);
                    navigate('/')
                } else {
                    console.log('Request failed with status:', res.status);
                }
            })
            .catch(err => {
                console.error('Signup failed:', err.message)
                alert('Signup failed. Please try again.')
            })
    }


    return (
        <div className='signup'>
            <input type="text" placeholder='username' onChange={(e) => { changeNameHandler(e) }} />
            <input type="text" placeholder='email' onChange={(e) => { changeMailHandler(e) }} />
            <input type="password" placeholder='password' onChange={(e) => { changePasswordHandler(e) }} />
            <button onClick={() => { submitHandler() }}>SignUp</button>
        </div>
    )
}

export default Signup