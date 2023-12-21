import React, { useState } from 'react'
import { BasicInput } from '../components/input'
import { ButtonBasic } from '../components/button'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useNavigate } from 'react-router-dom'
import { LoadingScreenSimple } from '../components/loadingScreen'

export function Signup() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)

    const onSignupWithEmailPassword = async () => {

        setIsLoading(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCredential)
            if (userCredential.user) {
                navigate('/user');
            } else {
                throw new Error('error creating user')
            }

        } catch (error) {
            console.log(error)
            alert('error signup user')
        }
        setIsLoading(false)

    }

    return (
        <div className='h-screen w-screen bg-green-500 flex justify-center items-center '>
            {
                isLoading ?
                    <LoadingScreenSimple />
                    : null
            }
            <div className='p-5 px-9 border rounded-lg shadow-sm flex flex-col items-center bg-white'>
                <p className="text-4xl font-bold mb-4">Signup</p>
                <BasicInput title={'Email'} placeholder={'email'} value={email} onChange={(e) => setEmail(e.target.value)} />
                <BasicInput title={'Password'} placeholder={'password'} type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className='w-full flex justify-end mt-4'>
                    <ButtonBasic text={'Signup'} onClick={onSignupWithEmailPassword} />
                </div>
            </div>
        </div>
    )
}
