import { useEffect, useState } from "react";
import { createChannel, getAllChannel } from "../../../controlls/firebase/channel_controll";
import { auth } from "../../../config/firebase";
import { MainTopNav } from "../../components/topNav";
import { LoadingScreenSimple } from "../../../components/loadingScreen";
import { ButtonBasic, Buttonvarients, RoundedIconButton } from "../../../components/button";
import { IconPlus } from "@tabler/icons-react";
import SimpleModal from "../../../components/Modal";
import { BasicInput } from "../../../components/input";
import { Link } from "react-router-dom";
import { addOneMemberToGroup } from "../../../controlls/firebase/group_controller";

export function ChannelsPage() {

  const [showaddChannelModal, setShowAddChannelModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [channelName, setChannelName] = useState('')
  const [channelDescription, setChannelDescription] = useState('');
  const [channels, setChannels] = useState([])
  const [update, setUpdate] = useState(false)


  const updateUI = () => {
    setUpdate(!update)
  }

  const onAddChannel = async () => {
    setIsLoading(true)
    if (channelName !== '' && channelDescription !== '') {
      try {

        const channelref = await createChannel({
          channelName,
          adminUid: auth.currentUser.uid,
          description: channelDescription,
        })

        const grpMemRef = await addOneMemberToGroup({
          userId: auth.currentUser.uid,
          channelId: channelref.id,
          isAdmin: true
        })

        updateUI();
        console.log(channelref)

      } catch (error) {
        console.log(error)
        alert('error adding channel')
      }
    } else {
      alert('please fill the form')
    }
    setShowAddChannelModal(false);
    setIsLoading(false)
  }




  useEffect(
    () => {

      const loadChannel = async () => {
        setIsLoading(true)
        try {

          const channels = await getAllChannel();
          setChannels(channels)
        } catch (error) {
          console.log(error);
          alert('Error Loading channels')
        }
        setIsLoading(false)
      }

      loadChannel()


    }, [update]
  )

  return (
    <div style={{

    }} className=' grow flex flex-col'>
      {isLoading && <LoadingScreenSimple />}
      <div className=' fixed bottom-5 right-5'>
        <RoundedIconButton height={50} width={50} icon={<IconPlus />} onClick={() => setShowAddChannelModal(true)} />
      </div>

      <SimpleModal isOpen={showaddChannelModal} onClose={() => setShowAddChannelModal(false)}>
        <div className=' w-full '>
          <div className='title  py-1 text-md font-bold border-b shadow-sm text-center bg-green-100 '>
            Add Channel
          </div>
          <div className=' px-1 md:px-4 md:py-3 flex flex-col items-center '>
            <BasicInput onChange={(e) => setChannelName(e.target.value)} value={channelName} className={'items-center'} title={'Channel name'} placeholder={'channel name'} />
            <BasicInput onChange={(e) => setChannelDescription(e.target.value)} value={channelDescription} className={'items-center'} title={'Description'} placeholder={'channel description'} />
          </div>
          <div className='title  py-1 text-md font-bold border-b shadow-sm text-center bg-green-100 flex justify-end gap-2 px-2 '>
            <ButtonBasic varients={Buttonvarients.secondary} text={'Cancel'} onClick={() => setShowAddChannelModal(false)} />
            <ButtonBasic text={'Add'} onClick={onAddChannel} />
          </div>
        </div>
      </SimpleModal>

      {
        channels.length > 0
          ?
          <div className='px-2 md:px-3 lg:px-5 flex flex-col gap-2'>
            {
              channels.map(
                (list, index) => (
                  <Link to={`/user/channel/${list.id}`} key={index} className=' border px-2 py-3 flex gap-2 w-full items-center cursor-pointer hover:bg-gray-100 rounded-lg'>
                    <div className=' bg-gray-400 min-h-[40px] max-h-[40px] min-w-[40px] max-w-[40px] rounded-full'>
                    </div>
                    <div className=' flex flex-col gap-1 overflow-hidden '>
                      <div className=' font-bold leading-[14px] text-nowrap truncate'>
                        {list.channel_name}
                      </div>
                      <div className='leading-[14px] text-nowrap truncate'>{list.description}</div>
                    </div>
                    {/* delete_Button */}

                  </Link >
                )
              )
            }
          </div>
          :
          <div className=" grow flex flex-col items-center justify-center">
            <div className=" flex flex-col items-center" onClick={()=>{setShowAddChannelModal(true)}}>
              <div className=" text-4xl font-bold text-gray-400">
                No Channels Found
              </div>
              <div className="text-sm font-bold text-gray-400">click to add channel</div>
              <IconPlus size={50} className=" text-gray-400" />
            </div>
          </div>
      }

    </div>
  )
}
