import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteChannel, getOneChannel, updateChannel } from '../../controlls/firebase/channel_controll';
import { LoadingScreenSimple } from '../../components/loadingScreen';
import { modelChannel } from '../../models/channelModel';
import { ButtonBasic, Buttonvarients, RoundedIconButton } from '../../components/button';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import SimpleModal, { QuestionModal } from '../../components/Modal';
import { BasicInput } from '../../components/input';

export function ChannelPage() {
    const { id } = useParams();
    const [channel, setChannel] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [deleteQuestion, setDeleteQuestion] = useState(false)
    const [channelName, setChannelName] = useState('')
    const [channelDescription, setChannelDescription] = useState('');
    const [showUpdateChannelModal, setShowUpdateChannelModal] = useState(false)
    const [update,setUpdate] = useState(false)
    const navigate = useNavigate()

    const updateUi = ()=>{
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

    const onUpdate = async()=>{
        setIsLoading(true);
        try {
            const res = await updateChannel({
                id:id,
                data:{
                    [modelChannel[1]]:channelName,
                    [modelChannel[2]]:channelDescription
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

    const closeUpdateModal = ()=>{
        
        setChannelName(channel[modelChannel[1]])
        setChannelDescription(channel[modelChannel[2]])
        setShowUpdateChannelModal(false)
    }

    useEffect(
        () => {

            const loadChannel = async () => {
                setIsLoading(true)
                try {
                    const channel = await getOneChannel({
                        id: id
                    })
                    setChannel(channel)
                    setChannelName(channel[modelChannel[1]])
                    setChannelDescription(channel[modelChannel[2]])
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
                        <div className=' text-lg font-bold text-gray-50 grow overflow-hidden truncate'>{channel[modelChannel[1]]}</div>
                        <RoundedIconButton icon={<IconEdit />} varient={Buttonvarients.secondary} onClick={() => setShowUpdateChannelModal(true)} />
                        <RoundedIconButton icon={<IconTrash />} varient={Buttonvarients.secondary} onClick={() => setDeleteQuestion(true)} />
                    </div>

                }
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

            </div>
            {
                isLoading && <LoadingScreenSimple />
            }
        </div>
    )
}
