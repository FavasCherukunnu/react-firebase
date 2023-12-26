import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteChannel, getOneChannel } from '../../controlls/firebase/channel_controll';
import { LoadingScreenSimple } from '../../components/loadingScreen';
import { modelChannel } from '../../models/channelModel';
import { ButtonBasic, Buttonvarients, RoundedIconButton } from '../../components/button';
import { IconTrash } from '@tabler/icons-react';
import { QuestionModal } from '../../components/Modal';

export function ChannelPage() {
    const { id } = useParams();
    const [channel, setChannel] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [deleteQuestion, setDeleteQuestion] = useState(false)
    const navigate = useNavigate()

    const onDelete = async ()=>{
        setIsLoading(true)
        try {
    
        console.log('deleteing channel')
          const res = await deleteChannel({id:id})
          navigate('../../',{replace:true})
          
        } catch (error) {
          console.log(error)
          setIsError(true)
          alert('error deleting channel')
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
                    setChannel(channel)
                } catch (error) {
                    console.log(error)
                    setIsError(true)
                    alert('error loading channel')
                }
                setIsLoading(false)
            }

            loadChannel()

        }, []
    )

    return (
        <div className=' h-screen w-screen bg-green-50 flex flex-col '>
            <div className=' w-full min-h-16 bg-green-500 py-2 px-3 flex flex-col'>
                {
                    isLoading === false &&
                    <div className=' flex gap-2 items-center'>
                        <div className=' min-h-12 max-h-12 min-w-12 max-w-12 bg-gray-300 rounded-full'></div>
                        <div className=' text-lg font-bold text-gray-50 grow overflow-hidden truncate'>{channel[modelChannel[1]]}</div>
                        <RoundedIconButton icon={<IconTrash />} varient={Buttonvarients.secondary} onClick={() => setDeleteQuestion(true)} />
                    </div>

                }
                <QuestionModal isOpen={deleteQuestion} className='' onClose={() => setDeleteQuestion(false)}>
                    <div className=' min-w-72 flex flex-col'>
                        <div className=' font-semibold'>Do you want to delete this channel?</div>
                        <div className=' flex justify-end gap-1'>
                            <ButtonBasic text={'No'} varients={Buttonvarients.secondary} onClick={()=>setDeleteQuestion(false)}/>
                            <ButtonBasic text={'Yes'} onClick={onDelete}/>
                        </div>
                    </div>
                </QuestionModal>

            </div>
            {
                isLoading && <LoadingScreenSimple />
            }
        </div>
    )
}
