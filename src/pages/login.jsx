import { createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ButtonBasic } from '../components/button'
import { BasicInput } from '../components/input'
import { LoadingScreenSimple } from '../components/loadingScreen'
import { auth, db } from '../config/firebase'
import { IconBrandGoogleFilled } from '@tabler/icons-react'
import { addDoc, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'

export function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [loginReady, setLoginReady] = useState(false)
    const provider = new GoogleAuthProvider();
    const onLoginWithEmailPassword = async () => {

        setIsLoading(true)
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential)
            if (userCredential.user) {
                navigate('/user', { replace: true });
            } else {
                throw new Error('error creating user')
            }

        } catch (err) {
            console.error(err);
            alert(err.message);
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
                await setDoc(doc(db, "users",user.uid), {
                    uid: user.uid,
                    name:user.displayName,
                    authProvider: "local",
                    email:user.email,
                },{merge:false});
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

    useEffect(
        () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/auth.user
                    const uid = user.uid;

                    navigate('/user', { replace: true })

                    // ...
                } else {
                    navigate('/', { replace: true })
                    // User is signed out
                    // ...
                }
                setLoginReady(true)
            });
        }, []
    )

    console.log(auth?.currentUser?.email)

    return (
        loginReady && (
            <div className='h-screen w-screen bg-green-500 flex justify-center items-center '>
                {
                    isLoading ?
                        <LoadingScreenSimple />
                        : null
                }
                <div className='p-5 px-9 border rounded-lg shadow-sm flex flex-col items-center bg-white'>
                    <p className="text-4xl font-bold mb-4">Login</p>
                    <BasicInput title={'Email'} placeholder={'email'} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <BasicInput title={'Password'} placeholder={'password'} type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className='w-full flex justify-end mt-4 gap-2'>
                        <ButtonBasic icon={<IconBrandGoogleFilled className='text-orange-500' />} text={'Google'} onClick={onSignUpWithGmail} />
                        <ButtonBasic text={'Login'} onClick={onLoginWithEmailPassword} />
                    </div>
                    <p className='ml-auto'>New to Fireact?</p>
                    <Link to={'/signup'} className=' ml-auto leading-none text-sm text-blue-500 hover:font-semibold hover:underline'>SignUp</Link>
                </div>
            </div>
        )

    )
}
