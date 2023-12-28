import React, { useEffect, useState } from 'react'
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

export function UserPage() {
    const { id } = useParams();
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [deleteQuestion, setDeleteQuestion] = useState(false)
    const [channelName, setChannelName] = useState('')
    const [channelDescription, setChannelEmail] = useState('');
    const [showUpdateChannelModal, setShowUpdateChannelModal] = useState(false)
    const [update, setUpdate] = useState(false)
    const navigate = useNavigate()

    const updateUi = () => {
        setUpdate(!update)
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

    const closeUpdateModal = () => {

        setChannelName(user[modelUser[2]])
        setChannelEmail(user[modelUser[1]])
        setShowUpdateChannelModal(false)
    }

    const sentMessage = async(e)=>{
        e.preventDefault();
    }

    useEffect(
        () => {

            const loadChannel = async () => {
                setIsLoading(true)
                try {
                    const channel = await getOneUser({
                        id: id
                    })
                    setUser(channel)
                    console.log(channel)
                    setChannelName(channel[modelUser[2]])
                    setChannelEmail(channel[modelUser[1]])
                } catch (error) {
                    console.log(error)
                    setIsError(true)
                    alert('error loading channel')
                }
                setIsLoading(false)
            }

            loadChannel()

        }, [update]
    )

    return (
        <div className=' h-screen w-screen bg-green-50 flex flex-col '>
            <div className=' w-full min-h-16 bg-green-500 py-2 px-3 flex flex-col'>
                {
                    isLoading === false &&
                    <div className=' flex gap-2 items-center'>
                        <div className=' min-h-12 max-h-12 min-w-12 max-w-12 bg-gray-300 rounded-full'></div>
                        <div className=' text-lg font-bold text-gray-50 grow overflow-hidden truncate'>{user[modelUser[2]]}</div>
                        <RoundedIconButton icon={<IconEdit />} varient={Buttonvarients.secondary} onClick={() => setShowUpdateChannelModal(true)} />
                        <RoundedIconButton icon={<IconTrash />} varient={Buttonvarients.secondary} onClick={() => setDeleteQuestion(true)} />
                    </div>

                }

            </div>
            <div className=' flex flex-col grow w-full bg-green-100 '>
                <div className=' grow'>

                </div>
                <form className=' w-full py-2 px-2 flex items-center  gap-2' onSubmit={sentMessage}>
                    <BasicInput className={'grow'} innerClass={'w-full'} placeholder={'Enter Message here'} />
                    <ButtonBasic type='submit'  icon={<IconSend/>} className={'pe-4'}/>
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
            <SimpleModal isOpen={showUpdateChannelModal} onClose={() => setShowUpdateChannelModal(false)}>
                <div className=' w-full '>
                    <div className='title  py-1 text-md font-bold border-b shadow-sm text-center bg-green-100 '>
                        Update Channel
                    </div>
                    <div className=' px-1 md:px-4 md:py-3 flex flex-col items-center '>
                        <BasicInput onChange={(e) => setChannelName(e.target.value)} value={channelName} className={'items-center'} title={'Channel name'} placeholder={'channel name'} />
                        <BasicInput onChange={(e) => setChannelEmail(e.target.value)} value={channelDescription} className={'items-center'} title={'Email'} placeholder={'channel description'} />
                    </div>
                    <div className='title  py-1 text-md font-bold border-b shadow-sm text-center bg-green-100 flex justify-end gap-2 px-2 '>
                        <ButtonBasic varients={Buttonvarients.secondary} text={'Cancel'} onClick={closeUpdateModal} />
                        <ButtonBasic text={'Update'} onClick={onUpdate} />
                    </div>
                </div>
            </SimpleModal>
            {
                isLoading && <LoadingScreenSimple />
            }
        </div>
    )
}
