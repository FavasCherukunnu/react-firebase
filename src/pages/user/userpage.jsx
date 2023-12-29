import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteChannel, getOneChannel, updateChannel } from '../../controlls/firebase/channel_controll';
import { LoadingScreenSimple } from '../../components/loadingScreen';
import { modelChannel } from '../../models/channelModel';
import { ButtonBasic, Buttonvarients, RoundedIconButton } from '../../components/button';
import { IconEdit, IconSend, IconTrash } from '@tabler/icons-react';
import SimpleModal, { QuestionModal } from '../../components/Modal';
import { BasicInput } from '../../components/input';
import { getOneUser } from '../../controlls/firebase/user_controller';
import { modelUser } from '../../models/userModel';
import { modelMessage } from '../../models/messageModl';
import { auth } from '../../config/firebase';
import { readPersonalMessage, readPersonalMessageSnapshot, sentPersonalMessage } from '../../controlls/firebase/message_controller';
import { PersonalMessage } from '../Home/components/messages';
import { serverTimestamp } from 'firebase/firestore';

export function UserPage() {
    const { id } = useParams();
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [deleteQuestion, setDeleteQuestion] = useState(false)
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('');
    const [message, setMessage] = useState('')
    const [textMessages, setTextMessages] = useState([])
    const [showUpdatedUserModal, setshowUpdatedUserModal] = useState(false)
    const [update, setUpdate] = useState(false)
    const chatRef = useRef(null);
    const [scroll, setScroll] = useState(false)
    const navigate = useNavigate()

    const updateUi = () => {
        setUpdate(!update)
    }

    const scrollToBottom = () => {
        setScroll(!scroll)
    }




    const closeUpdateModal = () => {

        setUserName(user[modelUser[2]])
        setUserEmail(user[modelUser[1]])
        setshowUpdatedUserModal(false)
    }

    const sentMessage = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {

            if (message === '') {
                throw new Error('Can not sent Empty message')
            }

            const msgRef = await sentPersonalMessage({
                textMessage: message,
                sentFrom: auth.currentUser.uid,
                sentTo: user.id,
                createdAt: serverTimestamp()
            })
            setMessage('')


        } catch (err) {
            console.log(err)
            alert(err.message ? err.message : 'Error senting data')
        }
        setIsLoading(false)

    }

    useEffect(
        () => {
            let unSubscribeTextMessages = () => { }
            const loadChannel = async () => {
                setIsLoading(true)
                try {
                    const userD = await getOneUser({
                        id: id
                    })
                    setUser(userD)
                    setUserName(userD[modelUser[2]])
                    setUserEmail(userD[modelUser[1]])


                } catch (error) {
                    console.log(error)
                    setIsError(true)
                    alert('error loading channel')
                }
                setIsLoading(false)
            }

            loadChannel()

            return () => {
                unSubscribeTextMessages()
            }

        }, [update]
    )

    useEffect(
        () => {
            let unSubscribeTextMessages = () => { };
            if (auth.currentUser?.uid) {
                unSubscribeTextMessages = readPersonalMessageSnapshot({
                    ofUser: id,
                    sentFrom: auth.currentUser.uid,
                }, (messages) => {
                    setTextMessages(messages)

                })
            }
            return () => unSubscribeTextMessages();
        }, [auth.currentUser?.uid]
    )

    useEffect(
        () => {
            chatRef.current.scrollTop = chatRef.current.scrollHeight
        }, [textMessages.length]
    )


    return (
        <div style={{
            position:'fixed',
            top:'0',
            bottom:'0',
            left:'0',
            right:'0'
        }} className=' bg-green-50 flex flex-col overflow-hidden '>
            <div className=' w-full min-h-16 bg-green-500 py-2 px-3 flex flex-col'>
                {
                    isLoading === false &&
                    <div className=' flex gap-2 items-center'>
                        <div className=' min-h-12 max-h-12 min-w-12 max-w-12 bg-gray-300 rounded-full'></div>
                        <div className=' text-lg font-bold text-gray-50 grow overflow-hidden truncate'>{user[modelUser[2]]}</div>
                        {/* <RoundedIconButton icon={<IconEdit />} varient={Buttonvarients.secondary} onClick={() => setshowUpdatedUserModal(true)} /> */}
                        {/* <RoundedIconButton icon={<IconTrash />} varient={Buttonvarients.secondary} onClick={() => setDeleteQuestion(true)} /> */}
                    </div>

                }

            </div>
            <div className=' flex flex-col grow w-full bg-green-100 overflow-hidden '>
                <div ref={chatRef} className=' grow flex flex-col  overflow-auto'>
                    <div className='w-full flex flex-col  grow justify-end  px-3 py-2 gap-2  '>
                        {
                            textMessages.map(
                                (msg, index) => {
                                    return (
                                        <PersonalMessage key={index} messages={msg[modelMessage[3]]} senterId={msg[modelMessage[1]]} />
                                    )
                                }
                            )
                        }
                    </div>
                </div>
                <form className=' w-full py-2 px-2 flex items-center  gap-2' onSubmit={sentMessage}>
                    <BasicInput className={'grow'} innerClass={'w-full'} placeholder={'Enter Message here'} value={message} onChange={(e) => setMessage(e.target.value)} />
                    <ButtonBasic type='submit' icon={<IconSend />} className={'pe-4'} />
                </form>
            </div>
            <QuestionModal isOpen={deleteQuestion} className='' onClose={() => setDeleteQuestion(false)}>
                <div className=' min-w-72 flex flex-col'>
                    <div className=' font-semibold'>Do you want to delete this channel?</div>
                    <div className=' flex justify-end gap-1'>
                        <ButtonBasic text={'No'} varients={Buttonvarients.secondary} onClick={() => setDeleteQuestion(false)} />
                    </div>
                </div>
            </QuestionModal>
            <SimpleModal isOpen={showUpdatedUserModal} onClose={() => setshowUpdatedUserModal(false)}>
                <div className=' w-full '>
                    <div className='title  py-1 text-md font-bold border-b shadow-sm text-center bg-green-100 '>
                        Update Channel
                    </div>
                    <div className=' px-1 md:px-4 md:py-3 flex flex-col items-center '>
                        <BasicInput onChange={(e) => setUserName(e.target.value)} value={userName} className={'items-center'} title={'Channel name'} placeholder={'channel name'} />
                        <BasicInput onChange={(e) => setUserEmail(e.target.value)} value={userEmail} className={'items-center'} title={'Email'} placeholder={'channel description'} />
                    </div>
                    {/* <div className='title  py-1 text-md font-bold border-b shadow-sm text-center bg-green-100 flex justify-end gap-2 px-2 '>
                        <ButtonBasic varients={Buttonvarients.secondary} text={'Cancel'} onClick={closeUpdateModal} />
                        <ButtonBasic text={'Update'} onClick={onUpdate} />
                    </div> */}
                </div>
            </SimpleModal>
            {
                isLoading && <LoadingScreenSimple />
            }
        </div>
    )
}
