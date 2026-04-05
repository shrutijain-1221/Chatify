import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader'
import MessageInputs from './MessageInputs'
import MessageSkeleton from '../skeletons/MessageSkeleton'
import { useAuthStore } from '../store/useAuthStore'
import { formatMessageTime } from '../lib/utils'
import { useRef } from 'react'

const ChatContainer = () => {
    const {messages,getMessages,isMessageLoading,selectedUser,subscribeToMessages,unSubscribeToMessages}=useChatStore()
    const {authUser}=useAuthStore()
    const messageEndRef=useRef(null)
    useEffect(()=>{
if(messageEndRef.current && messages){
    messageEndRef.current.scrollIntoView({behavior:"smooth"})
}
    },[messages])
useEffect(()=>{
getMessages(selectedUser?._id)
subscribeToMessages()
return ()=>unSubscribeToMessages()
},[selectedUser._id,getMessages,subscribeToMessages,unSubscribeToMessages])

if(isMessageLoading) return (
    <div className='flex-1 flex flex-col overflow-auto'>
<ChatHeader/>
<MessageSkeleton/>
<MessageInputs/>
    </div>
)
  return (
    <> 
    <div className='flex-1 flex-col flex overflow-auto'>
<ChatHeader/>
<div className='flex-1 overflow-y-auto p-4 space-y-4'>
{messages?.map((message)=>(
    <div key={message?.id} className={`chat ${message?.senderId===authUser?._id?"chat-end":"chat-start"}`} ref={messageEndRef}>
        <div className='chat-image avatar'>
            <div className='size-10 rounded-full border'>
            <img src={message.senderId===authUser?._id ?authUser.profielPic || "/avatar.png":selectedUser?.profielPic || "/avatar.png"} alt=""/>
            </div>
            </div>
            <div className='chat-header mb-1'>
<time className='text-xs opacity-50 ml-1'>
   {formatMessageTime( message?.createdAt)}
</time>
                </div>
                <div className='chat-bubble flex flex-col'>
                    {message.image && (
                        <img src={message.image} alt="Attachment" className='sm:max-w-50 rounded-md mb-2'/>
                    )}
{message.text && <p>{message.text}</p>}
                    </div>
        </div>
))}
</div>
<MessageInputs/>
    </div>
    </>
  )
}

export default ChatContainer