import React from 'react'
import { useThemeStore } from '../store/useThemeStore'
import { THEMES } from '../constant'

const SettingsPage = () => {
  const previewmessage=[
    {id:1,content:"Hey ! How's it going on?",isSent:false},
    {id:2,content:"I'm doing great! Just working on some new features.",isSent:true}
  ]
  const{theme,setTheme}=useThemeStore()
  return (
   <div className='min-h-screen container mx-auto px-4 pt-20 pb-20 max-w-5xl'>
    <div className='space-y-6'>
      <div className='flex flex-col gap-1'>
<h2 className='text-lg font-semibold'>Theme</h2>
<p className='text-sm text-base-content/70'>Choose a theme for yout chat interface</p>
      </div>
<div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2'>
{THEMES?.map((item)=>(
 <>
  <button  onClick={()=>setTheme(item)} key={item} className={`group flex flex-col items-center cursor-pointer gap-1.5 p-2 rounded-lg transition-colors ${theme===item?"bg-base-200":"hover:bg-base-200/50"}`}>
    <div className='relative h-8 w-full rounded-md overflow-hidden' data-theme={item}>
      <div className='absolute inset-0 grid grid-cols-4 gap-px p-1'>
<div className='rounded bg-primary'></div>
<div className='rounded bg-secondary'></div>
<div className='rounded bg-accent'></div>
<div className='rounded bg-neutral'></div>
      </div>

    </div>
    <span className='text-[11px] font-medium truncate w-full text-center'>

      {item.charAt(0).toUpperCase()+item.slice(1)}
    </span>
    </button>
 </>


))}
</div>
<div className="mt-10">
  <h3 className="text-md font-semibold mb-3">Preview</h3>

  <div className="rounded-xl border border-base-300 p-4 bg-base-100 max-w-md">
    
    {/* Chat container */}
    <div className="space-y-3">
      {previewmessage.map((msg) => (
        <div
          key={msg.id}
          className={`chat ${msg.isSent ? "chat-end" : "chat-start"}`}
        >
          <div className="chat-bubble">
            {msg.content}
          </div>
        </div>
      ))}
    </div>

    {/* Input preview */}
    <div className="mt-4 flex gap-2">
      <input
        type="text"
        placeholder="Type a message..."
        className="input input-bordered w-full"
        disabled
      />
      <button className="btn btn-primary">Send</button>
    </div>

  </div>
</div>
    </div>
    
   </div>
  )
}

export default SettingsPage