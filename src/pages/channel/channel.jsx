import { IconInfoCircle, IconSend, IconTrash, IconUserPlus } from '@tabler/icons-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SimpleModal, { QuestionModal } from '../../components/Modal';
import { ButtonBasic, Buttonvarients, RoundedIconButton } from '../../components/button';
import { BasicInput, SelectBoxInputBox } from '../../components/input';
import { LoadingScreenSimple } from '../../components/loadingScreen';
import { auth } from '../../config/firebase';
import { deleteChannel, getOneChannel, updateChannel } from '../../controlls/firebase/channel_controll';
import { addOneMemberToGroup, getAllGroupMembersObj } from '../../controlls/firebase/group_controller';
import { readGroupMessageSnapshot, sentGroupMessage } from '../../controlls/firebase/group_message_controller';
import { getAllOtherUsers } from '../../controlls/firebase/user_controller';
import { modelChannel } from '../../models/channelModel';
import { modelUser } from '../../models/userModel';
import { GroupMessage, PersonalMessage } from '../Home/components/messages';
import { modelGroupMessage } from '../../models/grpMessageModel';

export function ChannelPage() {
    const { id } = useParams();
    const [channel, setChannel] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const chatRef = useRef(null);

    const [isError, setIsError] = useState(false)
    const [deleteQuestion, setDeleteQuestion] = useState(false)
    const [channelName, setChannelName] = useState('')
    const [channelDescription, setChannelDescription] = useState('');
    const [showUpdateChannelModal, setShowUpdateChannelModal] = useState(false)
    const [showAddUsersModal, setShowAddUsersModal] = useState(false)
    const [update, setUpdate] = useState(false)
    const [message, setMessage] = useState('');
    const [searchUser, setSearchUser] = useState(null)
    const [searchUserList, setSearchUserList] = useState([]);
    const [textMessages, setTextMessages] = useState([])

    const [members, setMembers] = useState({})
    const navigate = useNavigate()

    const updateUi = () => {
        setUpdate(!update)
    }

    const onDelete = async () => {
        setIsLoading(true)
        try {

            console.log('deleteing channel')
            const res = await deleteChannel({ id: id })
            navigate('../../', { replace: true })

        } catch (error) {
            console.log(error)
            setIsError(true)
            alert('error deleting channel')
        }
        setIsLoading(false)
    }
    const closeAddUserModal = () => {
        setSearchUser(null)
        setShowAddUsersModal(false)

    }
    const onUpdate = async () => {
        setIsLoading(true);
        try {
            const res = await updateChannel({
                id: id,
                data: {
                    [modelChannel[1]]: channelName,
                    [modelChannel[2]]: channelDescription
                }
            })
            updateUi()
            setShowUpdateChannelModal(false);

        } catch (error) {
            console.log(error)
            setIsError(true)
            alert('error updating channel')
        }
        setIsLoading(false);
    }

    const onAddUser = async () => {

        setIsLoading(true)
        try {
            if (searchUser) {
                const ref = await addOneMemberToGroup({
                    userId: searchUser.id,
                    channelId: id
                })
            } else {
                throw new Error('Please Select a user');
            }

            closeAddUserModal()

        } catch (error) {
            console.log(error)
            setIsError(true)
            alert(error.message ? error.message : 'Error adding user')
        }
        setIsLoading(false)

    }

    const closeUpdateModal = () => {

        setChannelName(channel[modelChannel[1]])
        setChannelDescription(channel[modelChannel[2]])
        setShowUpdateChannelModal(false)
    }



    const sentMessage = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {

            if (message !== '') {
                const grpMsgRef = await sentGroupMessage({
                    sentFrom: auth.currentUser.uid,
                    groupId: id,
                    textMessage: message
                })

            } else {
                throw new Error('please enter message first')
            }
            setMessage('')
        } catch (err) {
            console.log(err);
            alert(err.message ? err.message : 'error senting message')
        }
        setIsLoading(false)

    }

    useEffect(
        () => {

            const loadChannel = async () => {
                setIsLoading(true)
                try {
                    const channel = await getOneChannel({
                        id: id
                    })
                    const members = await getAllGroupMembersObj({
                        groupId: id
                    })
                    setMembers(members)
                    setChannel(channel)
                    setChannelName(channel[modelChannel[1]])
                    setChannelDescription(channel[modelChannel[2]])
                } catch (error) {
                    console.log(error)
                    setIsError(true)
                    navigate('/')
                    alert('error loading channel')
                }
                setIsLoading(false)
            }

            loadChannel()

            let unSubscribeTextMessages = () => { };
            if (auth.currentUser?.uid) {
                unSubscribeTextMessages = readGroupMessageSnapshot({
                    groupId: id
                }, (messages) => {
                    setTextMessages(messages)
                })
            }
            return () => unSubscribeTextMessages();

        }, [update]
    )

    //SEARCH USERS
    useEffect(
        () => {

            const loadSearchUsers = async () => {

                setIsLoading(true)

                const users = await getAllOtherUsers({
                    OwnId: auth.currentUser.uid
                })

                setSearchUserList(
                    users.map(
                        user => ({
                            id: user[modelUser[0]],
                            name: user[modelUser[2]],
                            email: user[modelUser[1]]
                        })
                    )
                )
                setIsLoading(false)

            }


            if (showAddUsersModal) {

                loadSearchUsers();

            }

        }, [showAddUsersModal]
    )

    useEffect(
        () => {
            chatRef.current.scrollTop = chatRef.current.scrollHeight
        }, [textMessages.length]
    )

    return (
        <div style={{
            position: 'fixed',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0'
        }} className=' bg-green-50 flex flex-col '>
            <div className=' w-full min-h-16 bg-green-500 py-2 px-3 flex flex-col'>
                {
                    isLoading === false &&
                    <div className=' flex gap-2 items-center'>
                        <div className=' min-h-12 max-h-12 min-w-12 max-w-12 bg-gray-300 rounded-full'></div>
                        <div className=' text-lg font-bold text-gray-50 grow overflow-hidden truncate'>{channel[modelChannel[1]]}</div>
                        <RoundedIconButton icon={<IconUserPlus />} varient={Buttonvarients.secondary} onClick={() => setShowAddUsersModal(true)} />
                        {/* <RoundedIconButton icon={<IconEdit />} varient={Buttonvarients.secondary} onClick={() => setShowUpdateChannelModal(true)} /> */}
                        <RoundedIconButton icon={<IconTrash />} varient={Buttonvarients.secondary} onClick={() => setDeleteQuestion(true)} />
                        <RoundedIconButton icon={<IconInfoCircle />} varient={Buttonvarients.secondary} onClick={() => navigate(`../channelDetails/${id}`)} />
                    </div>

                }

            </div>
            <div className=' flex flex-col grow w-full bg-green-100 overflow-hidden '>
                <div ref={chatRef} className=' grow flex flex-col  overflow-auto'>
                    <div className='w-full flex flex-col  grow justify-end  px-3 py-2 gap-2  '>
                        {
                            isLoading===false&&textMessages.map(
                                (msg, index) => {

                                    let name = 'unknown'
                                    const user = members[msg[modelGroupMessage[1]]];
                                    if(user){
                                       name =  user[[modelUser[2]]]
                                    }
                                    return (
                                        <GroupMessage key={index} messages={msg[modelGroupMessage[3]]} senterId={msg[modelGroupMessage[1]]} senterName={name} />
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
                        <ButtonBasic text={'Yes'} onClick={onDelete} />
                    </div>
                </div>
            </QuestionModal>
            <SimpleModal isOpen={showUpdateChannelModal} onClose={() => setShowUpdateChannelModal(false)}>
                <div className=' w-full '>
                    <div className='title  py-1 text-md font-bold border-b shadow-sm text-center bg-green-100 '>
                        Update Channel
                    </div>
                    <div className=' px-1 md:px-4 md:py-3 flex flex-col items-center '>
                        <BasicInput onChange={(e) => setChannelName(e.target.value)} value={channelName} className={'items-center'} title={'Channel name'} placeholder={'channel name'} />
                        <BasicInput onChange={(e) => setChannelDescription(e.target.value)} value={channelDescription} className={'items-center'} title={'Description'} placeholder={'channel description'} />
                    </div>
                    <div className='title  py-1 text-md font-bold border-b shadow-sm text-center bg-green-100 flex justify-end gap-2 px-2 '>
                        <ButtonBasic varients={Buttonvarients.secondary} text={'Cancel'} onClick={closeUpdateModal} />
                        <ButtonBasic text={'Update'} onClick={onUpdate} />
                    </div>
                </div>
            </SimpleModal>
            <SimpleModal isOpen={showAddUsersModal} onClose={closeAddUserModal}>
                <div className=' w-full '>
                    <div className='title  py-1 text-md font-bold border-b shadow-sm text-center bg-green-100 '>
                        Add User
                    </div>
                    <div className=' px-1 md:px-4 md:py-3 flex flex-col items-center '>
                        {/* <BasicInput onChange={(e) => setSearchUser(e.target.value)} value={searchUser} className={'items-center'} title={'Users'} placeholder={'Search Users'} /> */}
                        <SelectBoxInputBox option={searchUserList} value={searchUser} onChange={(value) => setSearchUser(value)} />
                    </div>
                    <div className='title  py-1 text-md font-bold border-b shadow-sm text-center bg-green-100 flex justify-end gap-2 px-2 '>
                        <ButtonBasic varients={Buttonvarients.secondary} text={'Cancel'} onClick={closeAddUserModal} />
                        <ButtonBasic text={'Add'} onClick={onAddUser} />
                    </div>
                </div>
            </SimpleModal>
            {
                isLoading && <LoadingScreenSimple />
            }
        </div>
    )
}
