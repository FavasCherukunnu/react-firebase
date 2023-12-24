import { createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ButtonBasic } from '../components/button'
import { BasicInput } from '../components/input'
import { LoadingScreenSimple } from '../components/loadingScreen'
import { auth, db } from '../config/firebase'
import { IconBrandGoogleFilled } from '@tabler/icons-react'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'

export function Signup() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const provider = new GoogleAuthProvider();
    const onSignupWithEmailPassword = async () => {

        setIsLoading(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name,
                authProvider: "local",
                email,
            });

            if (userCredential.user) {
                navigate('/user',{replace:true});
            } else {
                throw new Error('error creating user')
            }

        } catch (error) {
            console.log(error)
            alert(error.message);
        }
        setIsLoading(false)

    }

    const onSignUpWithGmail = async () => {
        try {

            const res = await signInWithPopup(auth, provider);
            const user = res.user;
            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    name: user.displayName,
                    authProvider: "google",
                    email: user.email,
                });
            }

            if (user) {
                navigate('/user');
            } else {
                throw new Error('error creating user')
            }

        } catch (error) {
            console.log('error sign in with google')
            alert(error.message)
        }
    }


    console.log(auth?.currentUser?.email)

    return (
        <div className='h-screen w-screen bg-green-500 flex justify-center items-center '>
            {
                isLoading ?
                    <LoadingScreenSimple />
                    : null
            }
            <div className='p-5 px-9 border rounded-lg shadow-sm flex flex-col items-center bg-white'>
                <p className="text-4xl font-bold mb-4">Signup</p>
                <BasicInput title={'Name'} placeholder={'name'} value={name} onChange={(e) => setName(e.target.value)} />
                <BasicInput title={'Email'} placeholder={'email'} value={email} onChange={(e) => setEmail(e.target.value)} />
                <BasicInput title={'Password'} placeholder={'password'} type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className='w-full flex justify-end mt-4 gap-2'>
                    {/* <ButtonBasic text={'signOut'} onClick={onSignOut} /> */}
                    <ButtonBasic icon={<IconBrandGoogleFilled className='text-orange-500' />} text={'Google'} onClick={onSignUpWithGmail} />
                    <ButtonBasic text={'Signup'} onClick={onSignupWithEmailPassword} />
                </div>
                <p className='ml-auto'>Already User?</p>
                <Link to={'/'} className=' ml-auto leading-none text-sm text-blue-500 hover:font-semibold hover:underline'>Login</Link>

            </div>
        </div>
    )
}
